import React from "react";
import logo from '../../images/1.png'
import { Link } from "react-router-dom";
import './menu.css'
const Menu = () => {
    return (
        <div className="container menu" >
            <div className="row mb-5">
                <img src={logo} alt="" />
            </div>
            <div className="row">
                <div className="col col-sm-3">
                    <Link to="/game/NBack">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-100">
                            N-Back
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/game/CPT">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-100">
                            CPT
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/game/GNG">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-100">
                            Go no Go
                        </button>
                    </Link>
                </div>
                <div className="col col-3">
                    <Link to="/game/Strop">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-100">
                            Strop
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Menu;