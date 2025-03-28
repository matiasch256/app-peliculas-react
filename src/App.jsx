import "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { OverView } from "./components/overview/OverView";
export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<OverView />} />
        </Routes>
      </Router>
    </>
  );
};
