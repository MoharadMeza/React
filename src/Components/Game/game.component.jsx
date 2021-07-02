import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CPT from '../CPT/CPT.component'
import NBack from '../NBack/NBack.component'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import eStar from '../../images/empty-star.png'
import hStar from '../../images/half-tiny-star.png'
import fStar from '../../images/star.png'

const Game = () => {
    let CPT_obj = {
        time: 3000,
        isi: 1000,
        target: 'f'
    }
    let NBack_obj = {
        time: 3000,
        isi: 1000,
        target: 2,
        NumberOfStimuli: 9
    };
    const [showModal, setShowModal] = useState(false);
    const [CPTStartBtn, setCPTStartBtn] = useState(0);
    const [NBackStartBtn, setNBackStartBtn] = useState(0);
    const [CPTObj, setCPTObj] = useState({
        time: 3000,
        isi: 1000,
        target: 'f'
    });
    const [NBackObj, setNBackObj] = useState({
        time: 3000,
        isi: 1000,
        target: 2,
        NumberOfStimuli: 9
    })
    useEffect(() => {
    }, []);

    const { currentRoute } = useParams();
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const CPTHandler = () => setCPTStartBtn(1);
    const NBackHandler = () => setNBackStartBtn(1);

    const updateCPT = (event) => {
        event.preventDefault();
        if (parseInt(event.target[0].value) > 0)
            CPT_obj.time = parseInt(event.target[0].value);
        if (parseInt(event.target[1].value) > 0)
            CPT_obj.isi = parseInt(event.target[1].value);
        if (event.target[2].checked)
            CPT_obj.target = 'f';
        if (event.target[3].checked)
            CPT_obj.target = 'h'
        if (event.target[4].checked)
            CPT_obj.target = 'e'

        setCPTObj(CPT_obj);
        setShowModal(false);
    }
    const updateNBack = (event) => {
        event.preventDefault();
        if (parseInt(event.target[0].value) > 0)
            NBack_obj.time = parseInt(event.target[0].value);
        if (parseInt(event.target[1].value) > 0)
            NBack_obj.isi = parseInt(event.target[1].value);
        if (parseInt(event.target[2].value) > 0)
            NBack_obj.target = parseInt(event.target[2].value);
        if (parseInt(event.target[3].value) > 0)
            NBack_obj.NumberOfStimuli = parseInt(event.target[3].value);

        console.log(NBack_obj);
        setNBackObj(NBack_obj)
        setShowModal(false);
    }
    if (currentRoute === 'CPT') {
        if (!CPTStartBtn)
            return (
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col col-md-5 col-12 text-center mb-md-0 mb-3">
                            <Button variant="secondary" onClick={CPTHandler}>
                                Start
                            </Button>
                        </div>
                        <div className="col col-md-5 col-12 text-center">
                            <Button variant="primary" onClick={handleShow}>
                                Setting
                            </Button>
                        </div>
                    </div>

                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Setting</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={updateCPT}>
                            <Modal.Body>
                                <div className="container">
                                    <div className="row form-group mb-1">
                                        <label for="input1" className="col-md-6 col-form-label">Variables Display Time(ms) :</label>
                                        <div className="col-md-6 ps-0">
                                            <input type="text" className="form-control" id="input1" placeholder="default: 3000" />
                                        </div>
                                    </div>
                                    <div className="row form-group mb-2">
                                        <label for="input2" className="col-md-4 col-form-label">Rest Time(ms): </label>
                                        <div className="col-md-8 ps-0">
                                            <input type="text" className="form-control" id="input2" placeholder="default: 1000" />
                                        </div>
                                    </div>
                                    <div className="row form-group mb-1">
                                        <label for="input3" className="col-md-4 col-form-label">Choose target:</label>
                                        <div className="col-md-8 ps-0">
                                            <div className="row justify-content-around mt-1">
                                                <div className="form-check form-check-inline col-2">
                                                    <img src={fStar} className="w-100" id="fStar"/>
                                                    <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="fStar" value="fStar" checked/>
                                                </div>
                                                <div className="form-check form-check-inline col-2">
                                                    <img src={hStar} className="w-100" id="hStar" />
                                                    <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="hStar" value="hStar" />
                                                </div>
                                                <div className="form-check form-check-inline col-2">
                                                    <img src={eStar} className="w-100" id="eStar" />
                                                    <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="eStar" value="eStar" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <input className="btn btn-success" type="submit" />
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
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col col-md-5 col-12 text-center mb-md-0 mb-3">
                            <Button variant="secondary" onClick={NBackHandler}>
                                Start
                            </Button>
                        </div>
                        <div className="col col-md-5 col-12 text-center">
                            <Button variant="primary" onClick={handleShow}>
                                Setting
                            </Button>
                        </div>
                    </div>
                    <Modal show={showModal} onHide={handleClose}>
                        <form onSubmit={updateNBack}>
                            <Modal.Header>
                                <Modal.Title>Setting</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="container">
                                    <div className="row form-group mb-1">
                                        <label htmlFor="time" className="col-md-6 col-form-label">Variables Display Time(ms) :</label>
                                        <div className="col-md-6 ps-0">
                                            <input type="text" className="form-control" id="time" placeholder="default: 3000" />
                                        </div>
                                    </div>
                                    <div className="row form-group mb-2">
                                        <label htmlFor="input2" className="col-md-4 col-form-label">Rest Time(ms): </label>
                                        <div className="col-md-8 ps-0">
                                            <input type="text" className="form-control" id="isi" placeholder="default: 1000" />
                                        </div>
                                    </div>
                                    <div className="row form-group mb-2">
                                        <label htmlFor="input3" className="col-md-3 col-form-label">Target: </label>
                                        <div className="col-md-9 ps-0">
                                            <input type="text" className="form-control" id="target" placeholder="default: 2" />
                                        </div>
                                    </div>
                                    <div className="row form-group mb-2">
                                        <label htmlFor="input4" className="col-md-5 col-form-label">Number of stimuli: </label>
                                        <div className="col-md-7 ps-0">
                                            <input type="text" className="form-control" id="NumberOfStimuli" placeholder="default: 9" />
                                        </div>
                                    </div>

                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <input className="btn btn-success" type="submit" />
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
            )
        else
            return (
                <NBack NBack_obj={NBackObj} />
            )
    }
}
export default Game;