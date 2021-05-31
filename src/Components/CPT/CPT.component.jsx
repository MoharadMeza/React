import React, { useEffect, useState } from "react";
import Scores from '../Scores/Scores.component'
import eStar from '../../Images/empty-star.png'
import hStar from '../../Images/half-tiny-star.png'
import fStar from '../../Images/star.png'
const CPT = () => {

    let pressKey, responseTime, answerTime, intervalT, intervalISI, blockStartTimer, gameStartTimer, sum, normalISI, abnormalISI;
    let arrOfImg = [eStar, hStar, fStar, fStar, hStar], response = [];
    let target = fStar;
    let t = 3000;
    let isi = 1000;
    let cnt = 0;
    let pressInfoObject = []
    let status = true;

    let scoreObj = {
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        responseAvg: 0
    };
    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (status)
                if (event.keyCode === 32) {
                    pressKey = Date.now();
                    status = false;
                    pressInfoObject.pressTime = pressKey;
                    checkAnswer();
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
            if (arrOfImg[i] === target) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        setScore(scoreObj);
    }
    const start = () => {
        gameStartTimer = Date.now();
        setScoreObjectInfo();
        showTime();
        setShowInfo(1);
        console.log("start");
        intervalT = setInterval(() => {
            status = true;
            showTime()
        }, t + isi);
    }
    const showTime = () => {
        status = true;
        setFeedBack(null)
        setImg(arrOfImg[cnt])
        blockStartTimer = Date.now();
        if (cnt === arrOfImg.length) {
            clearInterval(intervalT);
            console.log("fin");
            setShowInfo(2);
            setScore(scoreObj)
            return;
        }
        normalISI = setTimeout(() => { setImg(null) }, t);
        cnt++;
    }

    const checkAnswer = () => {
        let sw;
        let indexNum;
        pressInfoObject.press = 1;
        console.log(cnt - 1);
        if (pressKey) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            pressInfoObject[indexNum] = answerTime;
            //indexNum = Math.floor(answerTime / (isi + t));
            //responseTime = (((t + isi) * indexNum) - answerTime);
            if (arrOfImg[indexNum] === target) {
                pressInfoObject.mustBePressed = 1;
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                response.push(answerTime);
                sum += answerTime;
                scoreObj.responseAvg = averaging();
                setFeedBack("احسنت")
            }
            else {
                console.log("false");
                scoreObj.commission++;
                setFeedBack("متاسفم برات")
            }
            if (answerTime <= t) {
                clearTimeout(normalISI);
                clearInterval(intervalT);
                setImg(null)
                setTimeout(() => {
                    showTime()
                    intervalT = setInterval(() => {
                        status = true;
                        showTime()
                    }, t + isi);
                }, isi)
            }
        }
        // console.log(response);
        // console.log(scoreObj.responseAvg);
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
                <div className="row justify-content-center">
                    <button className="btn btn-dark start-btn col col-md-2 col-sm-5 btn-center" onClick={start}>Start</button>
                </div>
            </div>
        )
    if (showInfo === 1)
        return (
            <div className="container">
                <div className="row justify-content-center numbers">
                    <img src={Img} style={{ width: "20%" }} />
                </div>
                <div className="row justify-content-center numbers">
                    {feedBack}
                </div>
            </div>
        )
    if (showInfo === 2)
        return (
            <div className="container">
                <div className="row justify-content-center numbers">
                    <Scores score={score} />
                </div>
            </div>
        )
}
export default CPT;