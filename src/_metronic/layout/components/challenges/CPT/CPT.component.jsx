import React, { useEffect, useState, useRef } from "react";
import Scores from '../Scores/Scores.component'
import './cpt.css'

import eStar from '../../../../../images/CPT/empty-star.png'
import hStar from '../../../../../images/CPT/half-tiny-star.png'
import fStar from '../../../../../images/CPT/star.png'
const CPT = (props) => {

    const begin = useRef(0);
    const status = useRef(1);

    let pressKey, answerTime, intervalT, blockStartTimer, sum = 0, normalISI, time, isi, target;
    let arrOfImg = [2, 2, 100, 1, 2, 2, 1, 1, 100, 2, 2, 100, 2, 2, 2], response = [];
    let cnt = 0;

    let scoreObj = {
        time: 3000,
        isi : 1000,
        target : 1,
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        totalResponseTime: 0,
        responseAvg: 0,
    };
    const eventHandler = (event) => {
        if (event.keyCode === 32 && !begin.current) {
            begin.current = 1;
            start();
            return
        }
        if (status.current && begin.current) {
            if (event.keyCode === 32) {
                pressKey = Date.now();
                status.current = 0;
                checkAnswer();
            }
        }
    }
    useEffect(() => {
        console.log(props.CPT_obj);
        scoreObj.time = time = props.CPT_obj.time
        scoreObj.isi = isi = props.CPT_obj.isi
        scoreObj.target = target = props.CPT_obj.target
        if (props.CPT_obj.arr.length)
            arrOfImg = props.CPT_obj.arr;
        window.addEventListener('keydown', eventHandler);
        return () => {
            window.removeEventListener('keydown', eventHandler)
        }
    }, []);

    const [Img, setImg] = useState(null);
    const [showInfo, setShowInfo] = useState(0);
    const [score, setScore] = useState({});
    const [feedBack, setFeedBack] = useState(null);


    const setScoreObjectInfo = () => {
        scoreObj.totalNumber = arrOfImg.length;
        for (let i = 0; i < scoreObj.totalNumber; i++) {
            if (arrOfImg[i] === target) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        setScore(scoreObj);
    }
    const start = () => {
        setScoreObjectInfo();
        showTime();
        console.log("start");
        intervalT = setInterval(() => {
            status.current = 1;
            showTime()
        }, time + isi);
    }
    const showTime = () => {
        setFeedBack(null)
        if (arrOfImg[cnt] === 100)
            setImg(fStar)
        else if (arrOfImg[cnt] === 1)
            setImg(hStar)
        else if (arrOfImg[cnt] === 2)
            setImg(eStar)
        blockStartTimer = Date.now();
        if (cnt === arrOfImg.length) {
            clearInterval(intervalT);
            console.log("fin");
            setShowInfo(1);
            setScore(scoreObj)
            return;
        }
        normalISI = setTimeout(() => { setImg(null) }, time);
        cnt++;
    }

    const checkAnswer = () => {
        let indexNum;
        if (pressKey) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arrOfImg[indexNum] === target) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                response.push(answerTime);
                sum += answerTime;
                scoreObj.totalResponseTime = sum;
                scoreObj.responseAvg = averaging();
                setFeedBack("درست")
            }
            if (arrOfImg[indexNum] !== target) {
                console.log("false");
                scoreObj.commission++;
                setFeedBack("غلط")
            }
            if (answerTime <= time) {
                clearTimeout(normalISI);
                clearInterval(intervalT);
                setImg(null)
                setTimeout(() => {
                    status.current = 1;
                    showTime()
                    intervalT = setInterval(() => {
                        status.current = 1;
                        showTime()
                    }, time + isi);
                }, isi)
            }
        }
        setScore(scoreObj);
        console.log(response)
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
            <div className="container CPT">
                <div className="row justify-content-center d-flex">
                    <img src={Img} className="stars" />
                </div>
                {!props.CPT_obj.mode ?
                    <h1 className="row justify-content-center feedBacks">
                        {feedBack}
                    </h1> : null
                }
            </div>
        )
    if (showInfo === 1)
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <Scores score={score} name={"CPT"} />
                </div>
            </div>
        )
}
export default CPT;