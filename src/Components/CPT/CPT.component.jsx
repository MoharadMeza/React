import React, { useEffect, useState, useRef } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Scores from '../Scores/Scores.component'
import eStar from '../../images/empty-star.png'
import hStar from '../../images/half-tiny-star.png'
import fStar from '../../images/star.png'
const CPT = (props) => {

    const begin = useRef(0);
    const status = useRef(1);

    let pressKey, answerTime, intervalT, blockStartTimer, sum = 0, normalISI , time , isi ,target;
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
    const eventHandler  = (event) => {
        if (status.current) {
            if (event.keyCode === 32) {
                pressKey = Date.now();
                status.current = 0;
                checkAnswer();
            }
        }
    }
    useEffect(() => {
        console.log(props.CPT_obj);
        if (!begin.current) {
            time = props.CPT_obj.time
            isi = props.CPT_obj.isi
            if (props.CPT_obj.target === 'f')
                target = fStar
            else if (props.CPT_obj.target === 'h')
                target = hStar
            else if (props.CPT_obj.target === 'e')
                target = eStar
            begin.current = 1;
            start();
        }
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
        begin.current = 1;
        console.log(time);
        console.log(isi);
        console.log(target);
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
        setImg(arrOfImg[cnt])
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
                scoreObj.responseAvg = averaging();
                setFeedBack("احسنت")
            }
            if(arrOfImg[indexNum] !== target) {
                console.log("false");
                scoreObj.commission++;
                setFeedBack("متاسفم برات")
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
                <h1 className="row justify-content-center">
                    {feedBack}
                </h1>
            </div>
        )
    if (showInfo === 1)
        return (
            <div className="container mt-5">
                <Scores score={score} />
            </div>
        )
}
export default CPT;