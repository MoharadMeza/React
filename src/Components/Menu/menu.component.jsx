import React from "react";

import { Link } from "react-router-dom";
const Menu = () => {
    return (
        < div className="container mt-5" >
            <div className="row">
                <div className="col col-sm-3">
                    <Link to="/nBack">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            N-Back
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3">
                    <Link to="/CPT">
                        <button className="btn btn-outline-secondary nBack-btn challenges w-50">
                            CPT
                        </button>
                    </Link>
                </div>
                <div className="col col-sm-3"></div>
            </div>
        </div>
    )
}
export default Menu;