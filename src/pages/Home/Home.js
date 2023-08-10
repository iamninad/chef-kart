import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [dishes, setDishes] = useState({});
  const [showRecommended, setShowRecommended] = useState(true);

  useEffect(() => {
    fetch(
      "https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/"
    )
      .then((res) => res.json())
      .then((json) => setDishes(json));
  }, []);

  const navigate = useNavigate();

  let cuisines = ["Indian", "Italian", "Spanish", "Chinese"];
  const date = new Date();
  let temp = date.toString().split(" ");
  let dateString = temp[2] + " " + temp[1] + " " + temp[3];

  const addToCart = (item) => {
    setCart((current) => [...current, item]);
  };

  return (
    <div className="home-wrapper">
      <header className="bg-white m-4">
        <h2>Select Dishes</h2>
      </header>

      {/* Stats header */}
      <div className="stat-holder">
        <div className="stat-bg bg-dark"></div>
        <div className="card d-flex flex-row w-50 rounded justify-content-around stat-main-overlay m-auto">
          <div className="stat-date m-2 d-flex pt-3">
            <i className="fa fa-calendar m-1"></i>
            <p style={{ fontWeight: "bold" }}>{dateString}</p>
          </div>
          <div className="stat-time m-2 d-flex pt-3">
            <i className="fa fa-clock-o m-1"></i>
            <p style={{ fontWeight: "bold" }}>{"10:30Pm-12:30Pm"}</p>
          </div>
        </div>
      </div>

      {/* Cuisines */}
      <div className="cuisines d-flex m-4 justify-content-center">
        {cuisines?.map((item) => {
          return (
            <div className="cuisine m-4" key={item}>
              {item}
            </div>
          );
        })}
      </div>

      {/* Popular dishes */}
      <div className="popular-dishes">
        <h3>Popular Dishes</h3>
        <div className="pop-dishes d-flex justify-content-center">
          {dishes?.popularDishes?.map((item) => (
            <div className="pop-dish m-4" key={item.id}>
              <div className="dish-container">
                <img src={item.image} alt={item.name} />
                <p className="pop-dish-title">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended dishes */}
      <div className="recommended-dishes">
        <div
          className="rdishes-heading d-flex"
          onClick={() => setShowRecommended(!showRecommended)}
        >
          <h3>
            Recommended{" "}
            <i
              className={
                showRecommended ? "fa fa-caret-down" : "fa fa-caret-right"
              }
            ></i>
          </h3>
          <button className="btn btn-dark rdishes-menu-btn">Menu</button>
        </div>
        {showRecommended && (
          <div className="rec-dishes">
            {dishes?.dishes?.map((item) => {
              return (
                <div
                  className="rec-dish d-flex w-50 m-auto p-4 mt-4"
                  key={item.id}
                >
                  <div className="rec-dish-data">
                    <h5 className="rec-dish-name">
                      {item.name}
                      <span className="rating p-1 text-white rounded">
                        4.2 <i className="fa fa-star"></i>
                      </span>
                    </h5>
                    <div className="comb-holder d-flex">
                      <div className="equipments d-flex">
                        {item?.equipments?.map((i) => {
                          return (
                            <div className="equipment m-3" key={i}>
                              <img
                                src={require("../../assets/Mask20n2x.png")}
                                alt="equipment"
                              ></img>
                              <p>{i}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className="ingreds p-4"
                        onClick={() => navigate("/description")}
                      >
                        <p className="ingreds-title">Ingredients</p>
                        <span className="ingreds-view-list">
                          View list <i className="fa fa-caret-right"></i>
                        </span>
                      </div>
                    </div>
                    <p className="rec-dish-desc">{item.description}</p>
                  </div>
                  <div className="rec-dish-img">
                    <img
                      src={item.image}
                      className="rec-dish-image"
                      alt={item.name}
                    ></img>
                    <button
                      className="rec-dish-add-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer cart */}
      <div className="footer-cart p-2">
        <span>
          <i className="fa fa-cutlery"></i> {cart?.length} food items selected{" "}
          &nbsp;&nbsp;&nbsp;
          <i className="fa fa-long-arrow-right"></i>
        </span>
      </div>
    </div>
  );
};

export default Home;
