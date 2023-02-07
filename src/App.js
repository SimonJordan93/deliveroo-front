import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import logo from "./assets/img/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliveroo-back--6h6hqnm2zbqs.code.run/"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <header>
            <div className="logo-section container">
              <img className="logo" src={logo} alt="deliveroo logo" />
            </div>
            <div className="restaurant-info container">
              <div className="restaurant-info-text">
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img
                src={data.restaurant.picture}
                alt="table of well presented food"
                className="restaurant-info-header"
              />
            </div>
          </header>
          <div className="content container">
            <div className="menu">
              {data.categories.map((elem) => {
                if (elem.meals.length !== 0) {
                  return (
                    <div className="category">
                      <h2>{elem.name}</h2>
                      <div className="category-items">
                        {elem.meals.map((item) => {
                          return (
                            <button className="category-item">
                              <div className="item-description">
                                <h3>{item.title}</h3>
                                {item.description && (
                                  <div className="about-food">
                                    <p>{item.description}</p>
                                  </div>
                                )}
                                <span className="price">{item.price} €</span>{" "}
                                <span className="popular">
                                  {item.popular ? "⭐️ Populaire" : ""}
                                </span>
                              </div>
                              {item.picture && (
                                <div className="item-img">
                                  <img src={item.picture} alt="" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="cart"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
