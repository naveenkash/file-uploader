import React from "react";

function ButtonLoader() {
  return (
    <div className="center">
      <div className="lds-ring button_loader_parent center">
        <div className="button_loader"></div>
        <div className="button_loader"></div>
        <div className="button_loader"></div>
        <div className="button_loader"></div>
        <div className="button_loader"></div>
      </div>
    </div>
  );
}

export default ButtonLoader;
