import React from "react";
import ListStock from '../ListStock/ListStock';
import Builder from '../builder/Builder';
import './area.css'

const Area = () => {
  return(
    <div className="containerArea">
          <Builder/>
          <ListStock/>
    </div>
  );
};

export default Area;
