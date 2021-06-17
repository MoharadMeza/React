import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const InitGame = () => {
    const [settingInfo, setInfo] = useState({
        time: 3000,
        isi: 1000,
        target: 2
    })
    const [showModal, setShowModal] = useState(false);

    let obj = settingInfo;
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const updateVariables = (event) => {
        switch (event.target.id) {
            case 'time':
                obj.time = parseInt(event.target.value);
                setInfo(obj);
                break;
            case 'isi':
                obj.isi = parseInt(event.target.value);
                setInfo(obj);
                break;
            case 'target':
                obj.target = parseInt(event.target.value);
                setInfo(obj);
                break;
        }
    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5 text-center">
                <div className="col col-12 col-md-6 mb-3">
                    <Link to={{
                        pathname:'/nBack',
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
                                        <label htmlFor="input3" className="col-md-4 col-form-label">n to previous: </label>
                                        <div className="col-md-8 ps-0">
                                            <input type="text" className="form-control" id="target" placeholder="default: 2" />
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