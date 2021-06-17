import React, { useEffect, useState, useRef } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Scores from '../Scores/Scores.component'
import eStar from '../../images/empty-star.png'
import hStar from '../../images/half-tiny-star.png'
import fStar from '../../images/star.png'
import { useLocation } from "react-router";
const CPT = () => {
    const location = useLocation();
    const { setting } = location.state;
    const begin = useRef(0);
    const status = useRef(1);
    const time = useRef(3000);
    const isi = useRef(1000);
    const target = useRef(fStar);

    let pressKey, answerTime, intervalT, blockStartTimer, sum = 0, normalISI;
    let arrOfImg = [eStar, hStar, fStar, fStar, hStar], response = [];
    let cnt = 0;

    let scoreObj = {
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        responseAvg: 0
    };
    useEffect(() => {
        if (!begin.current) {
            time.current = setting.time
            isi.current = setting.isi
            if (setting.target === 'fStar')
                target.current = fStar
            else if (setting.target === 'hStar')
                target.current = hStar
            else if (setting.target === 'eStar')
                target.current = eStar
            begin.current = 1;
            start();
        }
        window.addEventListener('keydown', (event) => {
            if (status.current) {
                if (event.keyCode === 32) {
                    pressKey = Date.now();
                    status.current = 0;
                    checkAnswer();
                }
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

    const [Img, setImg] = useState(null);
    const [showInfo, setShowInfo] = useState(0);
    const [score, setScore] = useState({});
    const [feedBack, setFeedBack] = useState(null);


    const setScoreObjectInfo = () => {
        scoreObj.totalNumber = arrOfImg.length;
        for (let i = 0; i < scoreObj.totalNumber; i++) {
            if (arrOfImg[i] === target.current) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        setScore(scoreObj);
    }
    const start = () => {
        begin.current = 1;
        console.log(target.current);
        setScoreObjectInfo();
        showTime();
        console.log("start");
        intervalT = setInterval(() => {
            status.current = 1;
            showTime()
        }, time.current + isi.current);
    }
    const showTime = () => {
        setFeedBack(null)
        setImg(arrOfImg[cnt])
        blockStartTimer = Date.now();
        if (cnt === arrOfImg.length) {
            clearInterval(intervalT);
            console.log("fin");
            setShowInfo(1);
            setScore(scoreObj)
            return;
        }
        normalISI = setTimeout(() => { setImg(null) }, time.current);
        cnt++;
    }

    const checkAnswer = () => {
        let indexNum;
        if (pressKey) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arrOfImg[indexNum] === target.current) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                response.push(answerTime);
                sum += answerTime;
                scoreObj.responseAvg = averaging();
                setFeedBack("احسنت")
            }
            if(arrOfImg[indexNum] !== target.current) {
                console.log("false");
                scoreObj.commission++;
                setFeedBack("متاسفم برات")
            }
            if (answerTime <= time.current) {
                clearTimeout(normalISI);
                clearInterval(intervalT);
                setImg(null)
                setTimeout(() => {
                    status.current = 1;
                    showTime()
                    intervalT = setInterval(() => {
                        status.current = 1;
                        showTime()
                    }, time.current + isi.current);
                }, isi.current)
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
            <div className="container">
                <div className="row justify-content-center numbers mt-5">
                    <img src={Img} style={{ width: "20%" }} alt="" />
                </div>
                <div className="row justify-content-center numbers">
                    {feedBack}
                </div>
            </div>
        )
    if (showInfo === 1)
        return (
            <div className="container">
                <div className="row justify-content-center numbers mt-5">
                    <Scores score={score} />
                </div>
            </div>
        )
}
export default CPT;