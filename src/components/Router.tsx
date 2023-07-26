import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/member/Login";
import Signup from "../pages/member/Signup";
import ReviewPage from "../pages/review/ReviewPage";
import RecommendPage from "../pages/recommend/RecommendPage";
import ReviewDetail from "../pages/review/ReviewDetail";
import RecommendDetail from "../pages/recommend/RecommendDetail";
import ReviewWrite from "../pages/review/ReviewWrite";
import RecommendWrite from "../pages/recommend/RecommendWrite";
import Mypage from "../pages/member/Mypage";
import SearchPage from "../pages/SearchPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/review/:postId" element={<ReviewDetail />} />
      <Route path="/review/write" element={<ReviewWrite />} />
      <Route path="/review/edit/:postId" element={<ReviewWrite />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/recommend/:postId" element={<RecommendDetail />} />
      <Route path="/recommend/write" element={<RecommendWrite />} />
      <Route path="/recommend/edit/:postId" element={<RecommendWrite />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default Router;
