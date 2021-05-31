import React, { useEffect, useState } from "react";
import Scores from '../Scores/Scores.component'

const NBack = () => {
    let startTimer;
    let spacedown;
    let response = [];
    let n = 2;
    let sum = 0;
    let sw = -1;
    let t = 1000;
    let isi = 500;
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
     const setArrayeInfo = ()=>{
        scoreObj.totalNumber = arr.length;
        for(let i = 0;i<scoreObj.totalNumber-1 ; i++){
            if(arr[i] === arr[i+n]){
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        setScore(scoreObj);
     }

    //const [startTimer, setStartTimer] = useState(null);
    const [number, setNumber] = useState(null);
    const [showInfo, setShowInfo] = useState(0);
    //const [response, setResponse] = useState([]);
    const [score, setScore] = useState({});




    const start = () => {
        setArrayeInfo();
        startTimer = Date.now();
        //setStartTimer(Date.now());  ////////////////////////////////////////// in meghdar jadid nemigire
        showNum();
        setShowInfo(1);
        console.log("start");
        if (interval)
            clearInterval(interval);
        //console.log(startTimer);
        interval = setInterval(() => {
            showNum()
        }, t + isi);
    }
    const checkKey = () => {
        let indexNum;
        console.log(startTimer);

        if (spacedown) {
            pressTime = spacedown - startTimer;
            indexNum = Math.floor(pressTime / (isi + t));
            let responseAvg = -(((t + isi) * indexNum) + startTimer - spacedown);
            if (arr[indexNum] === arr[indexNum - n]) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                if (sw !== indexNum) {
                    sw = indexNum;
                    sum += responseAvg;
                    response.push(responseAvg);
                    scoreObj.responseAvg = averaging();
                }
            }
            else {
                console.log("false");
                scoreObj.commission++;
            }
        }
        setScore(scoreObj);
        //console.log(scoreObj);
    }
    const showNum = () => {
        setNumber(arr[cnt])
        if (cnt === 10) {
            clearInterval(interval);
            console.log("fin");
            setShowInfo(2);
            return;
        }
        setTimeout(() => { setNumber(" ") }, t);
        cnt++;
    }

    const averaging = () => {
        console.log(response.length);
        let avg = sum / response.length;
        console.log(response);
        //scoreObj.responseAvg = avg/response.length();
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
                <div className="row justify-content-center numbers" style={{fontSize:100}}>
                    {number}
                </div>
            </div>
        )
    if (showInfo === 2)
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <Scores score={score} />
                    {/* <button className="btn btn-dark start-btn col col-md-2 col-sm-5 btn-center" onClick={start}>Start</button> */}
                </div>
            </div>
        )
}
export default NBack;