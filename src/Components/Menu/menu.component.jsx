import React from "react";

import { Link } from "react-router-dom";
const Menu = () => {
    return (
        < div className="container mt-5" >
            <div className="row">
                <div className="col col-sm-3">
                    <Link to="/game/NBack">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            N-Back
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/game/CPT">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            CPT
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/game/GNG">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            Go no Go
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/game/Strop">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            Strop
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Menu;