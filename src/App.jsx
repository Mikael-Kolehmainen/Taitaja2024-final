import React from "react";
import { Route, Routes } from "react-router-dom";
import "./root-variables.css";
import Home from "./routes/home/home.component";
import Game from "./routes/game/game.component";
import PrivateRoute from "./routes/privateRoute.component";
import Error from "./routes/error/error.component";
import Login from "./routes/login/login.component";
import Intra from "./routes/intra/intra.component";
import Snake from "./routes/snake/snake.component";

/*
  This is the main file of the application, in here I have created a routing system.
  The routing system will determine based on the url which page should be shown.
  The pages are stored in separate files under the ./routes folder.
*/

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/peli" element={<Game />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pelit/matopeli" element={<Snake />} />

      {/* Admin page goes through private route where session is valdiated with backend */}
      <Route path="/admin" element={<PrivateRoute component={() => <Intra />} />} />
      <Route
        path="*"
        element={<Error title="404 Not Found" message="The page you're looking for doesn't exist." url="/" />}
      />
    </Routes>
  );
};

export default App;
