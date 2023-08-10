import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Description.css";

const Description = () => {
  const [data, setData] = useState({});
  const [showVegetables, setShowVegetables] = useState(true);
  const [showSpices, setShowSpices] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/1"
    )
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  return (
    <div className="description-holder">
      <div className="desc-header d-flex">
        <button onClick={() => navigate("/")}>
          <i className="fa fa-angle-left angle-arrow p-3 fs-1"></i>
        </button>
      </div>

      <div className="dish-header card d-flex flex-row p-4">
        <div className="m-4">
          <h3 className="font-weight-bold">
            {data.name}{" "}
            <span className="rating p-1 text-white rounded">
              4.2 <i className="fa fa-star"></i>
            </span>
          </h3>
          <div className="">
            <p className="w-50 m-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              aliquet felis eget mi imperdiet, ac dapibus metus tristique. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <br />
          <p>
            <i className="fa fa-clock-o"></i>
            {data.timeToPrepare}
          </p>
        </div>
        <img src={require("../../assets/Mask17n2x.png")} alt="banner"></img>
      </div>
      <div className="desc-other card mt-2">
        <h3 className="m-4">Ingredients</h3>
        <p>
          <small>For 2 people</small>
        </p>
        <hr className="w-50 mx-auto" />
        {/* vegetables */}
        <div className="desc-ingr w-50 m-auto">
          <div
            onClick={() => {
              setShowVegetables(!showVegetables);
            }}
          >
            <h5 className="w-50 m-auto">
              Vegetables ({data?.ingredients?.vegetables?.length}){" "}
              <i
                className={
                  showVegetables ? "fa fa-caret-down" : "fa fa-caret-right"
                }
              ></i>
            </h5>
            {showVegetables && (
              <ul className="w-50 m-auto">
                {data?.ingredients?.vegetables?.map((item) => {
                  return (
                    <li key={item.name}>
                      {item.name}
                      <span className="quant">{item.quantity}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* spices */}
          <div
            className="m-3"
            onClick={() => {
              setShowSpices(!showSpices);
            }}
          >
            <h5 className="w-50 m-auto">
              Spices ({data?.ingredients?.spices?.length}){" "}
              <i
                className={
                  showSpices ? "fa fa-caret-down" : "fa fa-caret-right"
                }
              ></i>
            </h5>
            {showSpices && (
              <ul className="w-50 m-auto">
                {data?.ingredients?.spices?.map((item) => {
                  return (
                    <li key={item.name}>
                      {item.name}
                      <span className="quant">{item.quantity}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <h3 className="m-4">Appliances</h3>
        <div className="gridder">
          {data?.ingredients?.appliances?.map((item) => {
            return (
              <div className="m-4 p-2 appliance" key={item.name}>
                <img
                  src={require("../../assets/Mask20n2x.png")}
                  alt="appliance"
                ></img>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Description;
