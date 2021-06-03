import React from "react";
import NBack from "./Components/NBack/NBack.component"
import Menu from './Components/Menu/menu.component'
import CPT from './Components/CPT/CPT.component'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
const AppRouter = () => {
    return (
        <Router>
                <Switch>
                    <Route path="/nBack" component={NBack}/>
                    <Route path="/CPT" component={CPT}/>
                    <Route exact path="/" component={Menu}/>
                </Switch>
        </Router >
    )
}
export default AppRouter;