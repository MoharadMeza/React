import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { GamePage } from "./pages/GamePage";
import { DashboardPage } from "./pages/DashboardPage";
import { Layout } from "../_metronic/layout";


const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage(props) {
  console.log(props.CPTModalSetting);
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }

        <ContentRoute path="/dashboard" exact component={DashboardPage} />
        <ContentRoute path="/CPT">
          <GamePage setStartGame={props.setStartGame} startGame={props.startGame}
           setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting}
           setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} gameName={"CPT"}
           setScoreTable={props.setScoreTable} scoreTable={props.scoreTable} setScoreAvailable={props.setScoreAvailable} scoreAvailable={props.scoreAvailable}
           CPT_defaultArr = {props.CPT_defaultArr}/>
        </ContentRoute>
        <ContentRoute path="/NBack">
          <GamePage setStartGame={props.setStartGame} startGame={props.startGame}
           setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting}
           setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} gameName={"NBack"}
           setScoreTable={props.setScoreTable} scoreTable={props.scoreTable} setScoreAvailable={props.setScoreAvailable} scoreAvailable={props.scoreAvailable}
           CPT_defaultArr = {props.CPT_defaultArr}/>
        </ContentRoute>
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilepage} />
        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
