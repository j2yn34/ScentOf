import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/member/Login";
import Signup from "../pages/member/Signup";
import Review from "../pages/Review";
import Recommend from "../pages/Recommend";
import ReviewDetail from "../pages/ReviewDetail";
import RecommendDetail from "../pages/RecommendDetail";
import Mypage from "../pages/member/Mypage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/review" element={<Review />} />
      <Route path="/review/:id" element={<ReviewDetail />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/recommend/:id" element={<RecommendDetail />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default Router;
