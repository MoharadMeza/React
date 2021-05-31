import React from "react";
import NBack from "./Components/NBack/NBack.component"
import CPT from './Components/CPT/CPT.component'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
const RouteChallenge = () => {
    return (
        <Router>
            < div className="container" >
                <div className="row">
                    <div className="col col-sm-3">
                        <Link to="/nBack">
                            <button className="btn btn-success nBack-btn">
                                N-Back
                            </button>
                        </Link>
                    </div>
                    <div className="col col-sm-3">
                        <Link to="/CPT">
                            <button className="btn btn-success nBack-btn">
                                CPT
                            </button>
                        </Link>
                    </div>
                    <div className="col col-sm-3">

                    </div>
                </div>
                <hr />
                <Switch>
                    <Route path="/nBack" component={NBack}/>
                    <Route path="/CPT" component={CPT}/>
                </Switch>
            </div >
        </Router >
    )
}
export default RouteChallenge;