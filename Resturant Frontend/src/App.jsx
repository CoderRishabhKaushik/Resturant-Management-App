// Start server use this command : json-server --watch db.json


import "./App.css";
// import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
import RestaurantSearch from "./components/RestaurantSearch";
import RestaurantCreate from "./components/RestaurantCreate";
import Navbar from "./components/Navbar";
import RestaurantHome from "./components/RestaurantHome";
import RestaurantUpdate from "./components/RestaurantUpdate";
import PropTypes from "prop-types";
// import Alert from "./components/Alert";

function App() {
  App.propTypes = {
    match: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Alert alert={alert} /> */}
        <Routes>
          <Route path="/List" element={<RestaurantList />} />
          <Route path="/Create" element={<RestaurantCreate />} />
          <Route path="/Search" element={<RestaurantSearch />} />
          <Route
            path="/Update/:id"
            render={(props) => (
              <RestaurantUpdate {...props} id={props.match.params.id} />
            )}
          />
          <Route exact path="/" element={<RestaurantHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
