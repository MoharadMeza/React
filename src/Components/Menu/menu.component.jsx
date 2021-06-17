import React from "react";

import { Link } from "react-router-dom";
const Menu = () => {
    return (
        < div className="container mt-5" >
            <div className="row">
                <div className="col col-sm-3">
                    <Link to="/InitNBack">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            N-Back
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/InitCPT">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            CPT
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/GNG">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            Go no Go
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/Strop">
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