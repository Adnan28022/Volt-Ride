import { useState } from "react";
import heroImg from "./assets/hero.png";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./component/layout/ScrollToTop";



function App() {
  return (
    <div className=" ">
      <ScrollToTop />
      <AppRoutes />
    </div>
  );
}

export default App;
