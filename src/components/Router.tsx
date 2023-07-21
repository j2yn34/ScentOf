import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/member/Login";
import Signup from "../pages/member/Signup";
import Review from "../pages/review/Review";
import Recommend from "../pages/recommend/Recommend";
import ReviewDetail from "../pages/review/ReviewDetail";
import RecommendDetail from "../pages/recommend/RecommendDetail";
import ReviewWrite from "../pages/review/ReviewWrite";
import RecommendWrite from "../pages/recommend/RecommendWrite";
import Mypage from "../pages/member/Mypage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/review" element={<Review />} />
      <Route path="/review/:postId" element={<ReviewDetail />} />
      <Route path="/review/write" element={<ReviewWrite />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/recommend/:postId" element={<RecommendDetail />} />
      <Route path="/recommend/write" element={<RecommendWrite />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default Router;
