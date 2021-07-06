import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import CPT from '../CPT/CPT.component'
import NBack from '../NBack/NBack.component'
import './game.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import eStar from '../../images/empty-star.png'
import hStar from '../../images/half-tiny-star.png'
import fStar from '../../images/star.png'

const Game = () => {
    let CPT_obj = {
        time: 3000,
        isi: 1000,
        target: 100,
        arr: [],
        mode: 0
    }
    let NBack_obj = {
        time: 3000,
        isi: 1000,
        target: 1,
        NumberOfStimuli: 0,
        arr: [],
        mode: 0
    };
    const [showModal, setShowModal] = useState(false);
    const [CPTStartBtn, setCPTStartBtn] = useState(0);
    const [NBackStartBtn, setNBackStartBtn] = useState(0);
    const [checked, setChecked] = useState(0);
    const [mode, setMode] = useState(0);
    const [CPTObj, setCPTObj] = useState({
        time: 3000,
        isi: 1000,
        target: 100,
        arr: [],
        mode: 0
    });
    const [NBackObj, setNBackObj] = useState({
        time: 3000,
        isi: 1000,
        target: 1,
        NumberOfStimuli: 0,
        arr: [],
        mode: 0
    })
    useEffect(() => {
    }, []);

    const { currentRoute } = useParams();
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const CPTHandler = () => setCPTStartBtn(1);
    const NBackHandler = () => setNBackStartBtn(1);
    const handleCheck = (event) => {
        if (event.target.id === 'fStar')
            setChecked(0)
        else if (event.target.id === 'hStar')
            setChecked(1)
        else if (event.target.id === 'eStar')
            setChecked(2)
    }
    const handleMode = (event) => {
        if (event.target.id === "demo")
            setMode(0);
        else
            setMode(1);
    }

    const updateCPT = (event) => {
        event.preventDefault();
        if (parseInt(event.target[0].value) > 0)
            CPT_obj.time = parseInt(event.target[0].value);
        if (parseInt(event.target[1].value) >= 0)
            CPT_obj.isi = parseInt(event.target[1].value);
        if (event.target[2].checked)
            CPT_obj.target = 100;
        if (event.target[3].checked)
            CPT_obj.target = 1
        if (event.target[4].checked)
            CPT_obj.target = 2
        if (event.target[7].value)
            CPT_obj.arr = event.target[7].value.split(',').map(function (item) {
                return parseInt(item, 10);
            })
        CPT_obj.mode = mode;
        setCPTObj(CPT_obj);
        setShowModal(false);
    }
    const updateNBack = (event) => {
        event.preventDefault();
        if (parseInt(event.target[0].value) > 0)
            NBack_obj.time = parseInt(event.target[0].value);
        if (parseInt(event.target[1].value) >= 0)
            NBack_obj.isi = parseInt(event.target[1].value);
        if (parseInt(event.target[2].value) > 0)
            NBack_obj.target = parseInt(event.target[2].value);
        if (parseInt(event.target[3].value) > 0)
            NBack_obj.NumberOfStimuli = parseInt(event.target[3].value);
        if (event.target[6].value)
            NBack_obj.arr = event.target[6].value.split(',').map(function (item) {
                return parseInt(item, 10);
            })
        if (NBack_obj.isi === 0)
            NBack_obj.mode = 1
        else
            NBack_obj.mode = mode;
        setNBackObj(NBack_obj)
        setShowModal(false);
    }
    if (currentRoute === 'CPT') {
        if (!CPTStartBtn)
            return (
                <div className="bg-light">
                    <div className="container">
                        <div className="row mt-5 justify-content-center p-5">
                            <div className="col col-12 col-md-6">
                                <div className="col col-12 text-center mb-md-0 mb-3">
                                    <button onClick={CPTHandler} className="btn btn-secondary w-100 fs-1 mb-3">
                                        شروع
                                    </button>
                                </div>
                                <div className="col col-12 text-center">
                                    <button onClick={handleShow} className="btn btn-primary w-100 fs-1">
                                        تنظیمات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header className="bg-light">
                            <Modal.Title className="w-100 text-end">
                                تنظیمات
                            </Modal.Title>
                        </Modal.Header>
                        <form onSubmit={updateCPT}>
                            <Modal.Body className="bg-light">
                                <div className="container">
                                    <div className="row form-group mb-2">
                                        <div className="col-md-6 ps-0">
                                            <input type="number" className="form-control" id="input1" placeholder="پیشفرض : 3000" min="20"/>
                                        </div>
                                        <label htmlFor="input1" className="col-md-6 col-form-label">:(ms) مدت زمان نمایش</label>
                                    </div>
                                    <div className="row form-group mb-2">
                                        <div className="col-md-8 ps-0">
                                            <input type="number" className="form-control" id="input2" min="20" placeholder="1000 : پیشفرض" />
                                        </div>
                                        <label htmlFor="input2" className="col-md-4 col-form-label"> :(ms) ISI</label>
                                    </div>
                                    <div className="row form-group mb-2">
                                        <div className="col-md-8 ps-0">
                                            <div className="row justify-content-around mt-1">
                                                <div className="form-check form-check-inline col-2">
                                                    <label htmlFor="fStar">
                                                        <img src={fStar} className="w-100 mt-1" />
                                                    </label>
                                                    <input className="form-check-input mt-2" type="radio" name="RadioOptions1" id="fStar" value="fStar" defaultChecked={(checked === 0) ? true : false} onClick={handleCheck} />
                                                </div>
                                                <div className="form-check form-check-inline col-2">
                                                    <label htmlFor="hStar">
                                                        <img src={hStar} className="w-100 mt-1" />
                                                    </label>
                                                    <input className="form-check-input mt-2" type="radio" name="RadioOptions1" id="hStar" value="hStar" defaultChecked={(checked === 1) ? true : false} onClick={handleCheck} />
                                                </div>
                                                <div className="form-check form-check-inline col-2">
                                                    <label htmlFor="eStar">
                                                        <img src={eStar} className="w-100 mt-1" />
                                                    </label>
                                                    <input className="form-check-input mt-2" type="radio" name="RadioOptions1" id="eStar" value="eStar" defaultChecked={(checked === 2) ? true : false} onClick={handleCheck} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="col-md-4 col-form-label"> : هدف</label>
                                        </div>

                                    </div>

                                    <div className="row form-group mb-2">
                                        <div className="col form-check-inline">
                                            <input className="form-check-input mt-1 me-1" type="radio" name="radioOptions2" id="demo" defaultChecked={(mode === 0) ? true : false} onClick={handleMode} />
                                            <label htmlFor="demo">  دمو</label>
                                        </div>
                                        <div className="col form-check-inline">
                                            <input className="form-check-input mt-1 me-1" type="radio" name="radioOptions2" id="test" defaultChecked={(mode === 1) ? true : false} onClick={handleMode} />
                                            <label htmlFor="test">  تست</label>
                                        </div>
                                        <div className="col">
                                            <label> : حالت</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="mb-2" htmlFor="array"> : آرایه اعداد</label>
                                        <textarea className="form-control" id="array" name="array" rows="7" cols="10" />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="bg-light">
                                <input className="btn btn-success" type="submit" value="ذخیره" />
                            </Modal.Footer>
                        </form>
                    </Modal>
                    </div>
            )
        else
            return (
                <CPT CPT_obj={CPTObj} />
            )
    }
    if (currentRoute === 'NBack') {
        if (!NBackStartBtn)
            return (
                <div className="bg-light">
                    <div className="container">
                        <div className="row mt-5 justify-content-center p-5">
                            <div className="col col-md-6">
                                <div className="col col-12 text-center mb-md-0 mb-3">
                                    <button onClick={NBackHandler} className="btn btn-secondary w-100 fs-1 mb-3">
                                        شروع
                                    </button>
                                </div>
                                <div className="col col-12 text-center">
                                    <button onClick={handleShow} className="btn btn-primary w-100 fs-1">
                                        تنظیمات
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Modal show={showModal} onHide={handleClose}>
                            <form onSubmit={updateNBack}>
                                <Modal.Header className="bg-light">
                                    <Modal.Title className="w-100 text-end">
                                        تنظیمات
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="bg-light">
                                    <div className="container">
                                        <div className="row form-group mb-2">
                                            <div className="col-md-6 ps-0">
                                                <input type="number" className="form-control" min="20" id="input1" placeholder="پیشفرض : 3000" />
                                            </div>
                                            <label htmlFor="input1" className="col-md-6 col-form-label">:(ms) مدت زمان نمایش</label>
                                        </div>
                                        <div className="row form-group mb-2">
                                            <div className="col-md-8 ps-0">
                                                <input type="number" className="form-control" min="20" id="input2" placeholder="1000 : پیشفرض" />
                                            </div>
                                            <label htmlFor="input2" className="col-md-4 col-form-label"> :(ms) ISI</label>
                                        </div>
                                        <div className="row form-group mb-2">
                                            <div className="col-md-9 ps-0">
                                                <input type="number" className="form-control" id="target" min="1" placeholder="پیشفرض : 1" />
                                            </div>
                                            <label htmlFor="input3" className="col-md-3 col-form-label"> : n </label>
                                        </div>
                                        <div className="row form-group mb-2">
                                            <div className="col-md-7 ps-0">
                                                <input type="number" className="form-control" id="NumberOfStimuli" min="1" placeholder="پیشفرض : طول آرایه" />
                                            </div>
                                            <label htmlFor="input4" className="col-md-5 col-form-label">: طول آرایه</label>
                                        </div>
                                        <div className="row form-group mb-2">

                                            <div className="col form-check-inline">
                                                <input className="form-check-input mt-1 me-1" type="radio" name="inlineRadioOptions" id="demo" value="eStar" defaultChecked={(mode === 0) ? true : false} onClick={handleMode} />
                                                <label htmlFor="demo">دمو </label>
                                            </div>
                                            <div className="col form-check-inline">
                                                <input className="form-check-input mt-1 me-1" type="radio" name="inlineRadioOptions" id="test" value="eStar" defaultChecked={(mode === 1) ? true : false} onClick={handleMode} />
                                                <label htmlFor="test">تست </label>
                                            </div>
                                            <div className="col">
                                                <label> : حالت</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="mb-2" htmlFor="array"> : آرایه اعداد</label>
                                            <textarea className="form-control" id="array" name="array" rows="7" cols="10" />
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="bg-light">
                                    <input className="btn btn-success" type="submit" value="ذخیره" />
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                </div>
            )
        else
            return (
                <NBack NBack_obj={NBackObj} />
            )
    }
}
export default Game;