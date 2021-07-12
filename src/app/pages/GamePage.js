import React from "react";
import { useParams } from "react-router-dom"
import { useSubheader } from "../../_metronic/layout";
import Game from '../../_metronic/layout/components/challenges/Game/game.component'

export const GamePage = () => {
  const { currentRoute } = useParams();
  const suhbeader = useSubheader();
  suhbeader.setTitle(currentRoute);
  return (<>
    {/* begin::Dashboard */}
    KTOffcanvas.
    <Game />
    {/* end::Dashboard */}
  </>);
};
