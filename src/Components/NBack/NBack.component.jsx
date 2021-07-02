import React, { useEffect, useState, useRef } from "react";
import Scores from '../Scores/Scores.component'
import './NBack.css'

const NBack = (props) => {
    const begin = useRef(0);
    const status = useRef(0);
    let response = [];
    let sum = 0;
    let cnt = 0;
    let arr = [9, 9, 2, 8, 8, 9, 1, 3, 3]
    let interval, target, t, isi,numberOfStimuli , blockStartTimer , pressKey , answerTime;
    let scoreObj = {
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        responseAvg: 0
    }


    useEffect(() => {
        console.log(props.NBack_obj);
        if (!begin.current) {
            t = props.NBack_obj.time;
            isi = props.NBack_obj.isi;
            target = props.NBack_obj.target;
            numberOfStimuli = props.NBack_obj.NumberOfStimuli;
            begin.current = 1;
            start();
        }
        window.addEventListener('keydown', eventHandler);
        return () => {
            window.removeEventListener('keydown', eventHandler)
        }
    }, []);



    const [number, setNumber] = useState(null);
    const [showInfo, setShowInfo] = useState(0);
    const [score, setScore] = useState({});
    const [feedBack, setFeedBack] = useState(null);


    const eventHandler = (event) => {
        console.log("123");
        if (event.keyCode === 32) {
            pressKey = Date.now();
            console.log(event);
            checkKey();
        }
    }

    const setArrayeInfo = () => {
        scoreObj.totalNumber = arr.length;
        for (let i = 0; i < scoreObj.totalNumber - 1; i++) {
            if (arr[i] === arr[i + target]) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        setScore(scoreObj);
    }

    const start = () => {
        begin.current = 1;
        setArrayeInfo();
        showNum();
        console.log("start");
        if (interval)
            clearInterval(interval);
        interval = setInterval(() => {
            setFeedBack(null)
            status.current = 0;
            showNum()
        }, t + isi);
    }
    const showNum = () => {
        setNumber(arr[cnt])
        blockStartTimer = Date.now();
        if (cnt === numberOfStimuli) {
            clearInterval(interval);
            console.log("fin");
            setShowInfo(1);
            return;
        }
        setTimeout(() => { setNumber(" ") }, t);
        cnt++;
    }
    const checkKey = () => {
        let indexNum;
        if (!status.current) {
            status.current = 1;
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arr[indexNum] === arr[indexNum - target]) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                sum += answerTime;
                console.log(sum);
                console.log(answerTime);
                response.push(answerTime);
                scoreObj.responseAvg = averaging();
                setFeedBack("احسنت")
            }
            else {
                console.log("false");
                scoreObj.commission++;
                setFeedBack("متاسفم برات")
            }
        }
        setScore(scoreObj);
    }

    const averaging = () => {
        let avg = sum / response.length;
        setScore(scoreObj);
        return avg;
    }
    if (showInfo === 0)
        return (
            <div className="container mt-5">
                <div className="row justify-content-center numbers">
                    {number}
                </div>
                {feedBack ?
                    <h1 className="row justify-content-center feedBacks">
                        {feedBack}
                    </h1>
                    : null}
            </div>
        )
    if (showInfo === 1)
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <Scores score={score} />
                </div>
            </div>
        )
}
export default NBack;