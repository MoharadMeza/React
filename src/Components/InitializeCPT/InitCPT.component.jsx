import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import eStar from '../../images/empty-star.png'
import hStar from '../../images/half-tiny-star.png'
import fStar from '../../images/star.png'

const InitGame = () => {
    const [settingInfo, setInfo] = useState({
        time: 3000,
        isi: 1000,
        target: 'fStar'
    })
    const [showModal, setShowModal] = useState(false);

    let obj = settingInfo;
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const updateVariables = (event) => {
        switch (event.target.id) {
            case 'input1':
                obj.time = parseInt(event.target.value);
                setInfo(obj);
                break;
            case 'input2':
                obj.isi = parseInt(event.target.value);
                setInfo(obj);
                break;
            case 'fStar':
                obj.target = 'fStar'
                setInfo(obj);
                break;
            case 'hStar':
                obj.target = 'hStar'
                setInfo(obj);
                break;
            case 'eStar':
                obj.target = 'eStar'
                setInfo(obj);
                break;
        }
    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5 text-center">
                <div className="col col-12 col-md-6 mb-3">
                    <Link to={{
                        pathname:'/CPT',
                        state:{
                            setting : obj
                        }
                    }}>
                        <button className="btn btn-dark start-btn col col-md-2 col-sm-5 btn-center">Start</button>
                    </Link>
                </div>
                <div className="col col-12 col-md-6">
                    <Button variant="primary" onClick={handleShow}>
                        Setting
                    </Button>

                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Setting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onChange={updateVariables}>
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
                                            <div className="row justify-content-around">
                                                <div className="form-check form-check-inline col-2">
                                                    <img src={fStar} className="w-100" id="fStar" />
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="fStar" value="fStar" />
                                                </div>
                                                <div className="form-check form-check-inline col-2">
                                                    <img src={hStar} className="w-100" id="hStar" />
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="hStar" value="hStar" />
                                                </div>
                                                <div className="form-check form-check-inline col-2">
                                                    <img src={eStar} className="w-100" id="eStar" />
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="eStar" value="eStar" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleClose}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </div>
    )
}
export default InitGame;