import { Routes, Route } from "react-router-dom";
import Index from "../pages/views/Index";
import Login from "../pages/member/Login";
import Signup from "../pages/member/Signup";
import Review from "../pages/review/Review";
import Recommend from "../pages/recommend/Recommend";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/review" element={<Review />} />
      <Route path="/recommend" element={<Recommend />} />
    </Routes>
  );
};

export default Router;
