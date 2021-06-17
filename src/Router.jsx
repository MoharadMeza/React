import React from "react";
import NBack from "./Components/NBack/NBack.component"
import Menu from './Components/Menu/menu.component'
import CPT from './Components/CPT/CPT.component'
import SetDataStrop from './Components/SetDataStrop/SetDataStrop.component'
import GNG from './Components/gonogo-test/starttest.component'
import InitCPT from './Components/InitializeCPT/InitCPT.component'
import InitNBack from './Components/InitializeNBack/InitNBack.component'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
const AppRouter = () => {
    return (
        <Router>
                <Switch>
                    <Route path="/nBack" component={NBack}/>
                    <Route path="/InitCPT" component={InitCPT}/>
                    <Route path="/InitNBack" component={InitNBack}/>
                    <Route path="/CPT" component={CPT}/>
                    <Route path="/Strop" component={SetDataStrop}/>
                    <Route path="/GNG" component={GNG}/>
                    <Route exact path="/" component={Menu}/>
                </Switch>
        </Router >
    )
}
export default AppRouter;