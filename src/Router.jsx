import React from "react";
import Menu from './Components/Menu/menu.component'
import Game from './Components/Game/game.component'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
const AppRouter = () => {
    return (
        <Router>
                <Switch>
                    <Route path="/game/:currentRoute" component={Game}/>
                    <Route exact path="/" component={Menu}/>
                </Switch>
        </Router >
    )
}
export default AppRouter;