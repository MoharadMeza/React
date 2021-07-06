import React, { useEffect, useState, useRef } from "react";
import Scores from '../Scores/Scores.component'
import './NBack.css'

const NBack = (props) => {
    const begin = useRef(0);
    const status = useRef(0);
    let response = [];
    let sum = 0;
    let cnt = 0;
    let arr = [1, 7, 7, 9, 8, 6, 3, 8, 3, 4, 6, 4, 1, 1, 9, 1, 9, 1, 1, 1, 5, 1, 9, 6, 5, 2, 5, 9, 1, 1, 1, 4, 6, 8, 6, 6, 8, 4, 5, 3, 5, 5, 5, 5, 2, 1, 8, 2, 8, 8, 8, 6, 3, 3, 4, 2, 1, 7, 7, 7, 7, 2, 8, 1, 8, 1, 7, 5, 6, 4, 8, 4, 8, 3, 5]
    let interval, target, t, isi, numberOfStimuli, blockStartTimer, pressKey, answerTime, normalISI;
    let scoreObj = {
        time: 3000,
        isi : 1000,
        n : 2,
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        totalResponseTime: 0,
        responseAvg: 0
    }


    useEffect(() => {
        scoreObj.t = t = props.NBack_obj.time;
        scoreObj.isi = isi = props.NBack_obj.isi;
        scoreObj.n = target = props.NBack_obj.target;
        if (props.NBack_obj.arr.length)
            arr = props.NBack_obj.arr;
        if (props.NBack_obj.NumberOfStimuli === 0)
            numberOfStimuli = arr.length;
        else
            numberOfStimuli = props.NBack_obj.NumberOfStimuli;
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
        if (event.keyCode === 32 && !begin.current) {
            begin.current = 1;
            start();
            return
        }
        if (status.current)
            if (event.keyCode === 32) {
                pressKey = Date.now();
                status.current = 0;
                checkKey();
            }
    }

    const setArrayeInfo = () => {
        scoreObj.totalNumber = numberOfStimuli;
        for (let i = 0; i < scoreObj.totalNumber - 1; i++) {
            if (arr[i] === arr[i + target]) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        setScore(scoreObj);
    }

    const start = () => {
        setArrayeInfo();
        console.log("start");
        showNum();
        if (interval)
            clearInterval(interval);
        interval = setInterval(() => {
            setFeedBack(null)
            status.current = 1;
            showNum()
        }, t + isi);
    }
    const showNum = () => {
        setFeedBack(null)
        setNumber(arr[cnt])
        console.log("show");
        blockStartTimer = Date.now();
        if (cnt === numberOfStimuli) {
            clearInterval(interval);
            console.log("fin");
            setShowInfo(1);
            return;
        }
        normalISI = setTimeout(() => {
            setNumber(null);
            console.log("hide");
        }, t)
        cnt++;
    }
    const checkKey = () => {
        let indexNum;
        if (pressKey && cnt > target) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arr[indexNum] === arr[indexNum - target]) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                sum += answerTime;
                scoreObj.totalResponseTime = sum;
                console.log(sum);
                console.log(answerTime);
                response.push(answerTime);
                scoreObj.responseAvg = averaging();
                setFeedBack("درست")
            }
            else {
                console.log("false");
                scoreObj.commission++;
                setFeedBack("غلط")
            }
            if (answerTime <= t) {
                clearTimeout(normalISI);
                clearInterval(interval);
                setNumber(null)
                setTimeout(() => {
                    status.current = 1;
                    showNum()
                    interval = setInterval(() => {
                        status.current = 1;
                        showNum()
                    }, t + isi);
                }, isi)
            }
        }
        setScore(scoreObj);
    }

    const averaging = () => {
        let avg = sum / response.length;
        setScore(scoreObj);
        return avg;
    }
    if (!begin.current)
        return (
            <div className="container">
                <div className="start">
                    <h1>
                        را بزنید space برای شروع
                    </h1>
                </div>
            </div>
        )
    if (showInfo === 0)
        return (
            <div className="container mt-5">
                <div className="row justify-content-center d-flex numbers">
                    {number}
                </div>
                {!props.NBack_obj.mode ?
                    <h1 className="row justify-content-center feedBacks">
                        {feedBack}
                    </h1>
                    : null
                }
            </div>
        )
    if (showInfo === 1)
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <Scores score={score} name={"NBack"} />
                </div>
            </div>
        )
}
export default NBack;