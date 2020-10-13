import React from "react";

function Loader() {
  return (
    <div className="center">
      <div className="lds-ring page_loader_parent center">
        <div className="page_loader"></div>
        <div className="page_loader"></div>
        <div className="page_loader"></div>
        <div className="page_loader"></div>
      </div>
    </div>
  );
}

export default Loader;
