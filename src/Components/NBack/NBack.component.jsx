import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import Scores from '../Scores/Scores.component'

const NBack = () => {
    const location = useLocation();
    const { setting } = location.state;
    const n = useRef();
    const t = useRef();
    const isi = useRef();
    const begin = useRef(0);
    const status = useRef(0);
    let startTimer;
    let spacedown;
    let response = [];
    let sum = 0;
    let cnt = 0;
    let arr = [1, 9, 2, 9, 8, 9, 1, 3, 3]
    let interval, pressTime;
    let scoreObj = {
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        responseAvg: 0
    }


    useEffect(() => {
        if (!begin.current) {
            t.current = setting.time;
            isi.current = setting.isi;
            n.current = setting.target;
            begin.current = 1;
            start();
        }
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 32) {
                spacedown = Date.now();
                checkKey();
            }
        });
        return (
            window.removeEventListener('keydown', (event) => {
                if (event.keyCode === 32) {
                    console.log(event);
                }
            })
        )
    }, []);

    const [number, setNumber] = useState(null);
    const [showInfo, setShowInfo] = useState(0);
    const [score, setScore] = useState({});
    const [feedBack, setFeedBack] = useState(null);


    const setArrayeInfo = () => {
        scoreObj.totalNumber = arr.length;
        for (let i = 0; i < scoreObj.totalNumber - 1; i++) {
            if (arr[i] === arr[i + n.current]) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        setScore(scoreObj);
    }

    const start = () => {
        console.log(t.current);
        console.log(isi.current);
        console.log(n.current);
        begin.current = 1;
        setArrayeInfo();
        startTimer = Date.now();
        showNum();
        console.log("start");
        if (interval)
            clearInterval(interval);
        interval = setInterval(() => {
            setFeedBack(null)
            status.current = 0;
            showNum()
        }, t.current + isi.current);
    }
    const checkKey = () => {
        let indexNum;
        if (!status.current) {
            status.current = 1;
            pressTime = spacedown - startTimer;
            indexNum = Math.floor(pressTime / (isi.current + t.current));
            let responseAvg = pressTime - ((t.current + isi.current) * indexNum);
            if (arr[indexNum] === arr[indexNum - n.current]) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                sum += responseAvg;
                console.log(sum);
                console.log(responseAvg);
                response.push(responseAvg);
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
    const showNum = () => {
        setNumber(arr[cnt])
        if (cnt === 10) {
            clearInterval(interval);
            console.log("fin");
            setShowInfo(1);
            return;
        }
        setTimeout(() => { setNumber(" ") }, t.current);
        cnt++;
    }

    const averaging = () => {
        let avg = sum / response.length;
        setScore(scoreObj);
        return avg;
    }
    if (showInfo === 0)
        return (
            <div className="container mt-5">
                <div className="row justify-content-center numbers" style={{ fontSize: 100 }}>
                    {number}
                </div>
                {feedBack ?
                    <div className="row justify-content-center numbers" style={{ fontSize: 20 }}>
                        {feedBack}
                    </div> 
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