import React from 'react'
import { Link } from "react-router-dom";
import score from '../../../../../images/CPT/scores.png'
import './score.css'
const Scores = (props) => {
    return (
        <>
            <div className="justify-content-center">
                <div className="row">
                    <div className="col col-md-6 col-12">
                        <table className="table table-light ">
                            <tbody>
                                <tr>
                                    <td>{props.score.time}</td>
                                    <td>زمان نمایش</td>
                                </tr>
                                <tr>
                                    <td>{props.score.isi}</td>
                                    <td>ISI</td>
                                </tr>
                                <tr>
                                    {props.score.n ? <td>{props.score.n}</td> : null}
                                    {(props.score.target === 100) ? <td>ستاره توپر</td> : null }
                                    {(props.score.target === 1) ? <td>ستاره نیمه پر</td> : null }
                                    {(props.score.target === 2) ? <td>ستاره تو خالی</td> : null }
                                    {props.score.n ? <td>n</td> : <td>هدف</td>}
                                </tr>
                                <tr>
                                    <td>{props.score.totalNumber}</td>
                                    <td>کل اعداد</td>
                                </tr>
                                <tr>
                                    {(props.name === "CPT") ? <td>{props.score.totalNumber - props.score.allCorrects - props.score.commission}</td>
                                        : null}
                                    {(props.name === "CPT") ? <td>بازداری صحیح</td> : null}
                                </tr>
                                <tr>
                                    <td>{props.score.allCorrects}</td>
                                    <td>مجموع صحیح ها</td>
                                </tr>
                                <tr>
                                    <td>{props.score.userCorrects}</td>
                                    <td>تعداد پاسخ صحیح</td>
                                </tr>
                                <tr>
                                    <td>{props.score.commission}</td>
                                    <td> خطای ارتکاب (Commission)</td>
                                </tr>
                                <tr>
                                    <td>{props.score.ommission}</td>
                                    <td>خطای حذف (Ommission)</td>
                                </tr>
                                <tr>
                                    <td>{props.score.totalResponseTime}</td>
                                    <td>زمان پاسخ صحیح</td>
                                </tr>
                                <tr>
                                    <td>{props.score.responseAvg}</td>
                                    <td>میانگین زمان پاسخ</td>
                                </tr>
                            </tbody>
                        </table >
                    </div>
                    <div className="col col-md-6 col-12 text-center">
                        <img src={score} className="scoreImg" />
                    </div>
                </div>
            </div>
            <Link to="/" className="text-center">
                <button className="btn btn-secondary mt-5">بازگشت به صفحه اصلی</button>
            </Link>
        </>
    )
}
export default Scores;