import React from "react";
import { Link } from 'react-router-dom'

export function Demo3Dashboard() {
  return (
    <>
      {/* begin::Dashboard */}

      {/* begin::Row */}
      <div className="row h-50 align-items-center">
        <div className="col col-6 p-10 text-center h-75">
          <Link to="/game/NBack" className="active">
            <button className="btn btn-outline-secondary btn-lg p-10 w-75 h-100">
              NBack
            </button>
          </Link>
        </div>
        <div className="col col-6 p-10 text-center h-75">
          <Link to="/game/CPT" className="active">
            <button className="btn btn-outline-secondary bt-lg p-10 w-75 h-100">
              CPT
            </button>
          </Link>
        </div>
      </div>
      <div className="row h-50 align-items-center">
        <div className="col col-6 p-10 text-center h-75">
          <Link to="/game/NBack" className="active">
            <button className="btn btn-outline-secondary btn-lg p-10 w-75 h-100">
              Go no Go
            </button>
          </Link>
        </div>
        <div className="col col-6 p-10 text-center h-75">
          <Link to="/game/NBack" className="active">
            <button className="btn btn-outline-secondary btn-lg p-10 w-75 h-100">
              Strop
            </button>
          </Link>
        </div>
      </div>
      {/* end::Row */}



      {/* end::Dashboard */}
    </>
  );
}
