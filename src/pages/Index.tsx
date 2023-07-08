import { Link } from "react-router-dom";
import ReviewPost from "../components/posts/ReviewPost";
import RecommendPost from "../components/posts/RecommendPost";

const Index = () => {
  return (
    <div>
      <div className="pt-14 px-4">
        <h2 className="mb-5 lg:mb-8 text-2xl lg:text-2xl text-left font-bold">
          향기 리뷰
        </h2>
        <ReviewPost />
        <div className="mt-8 text-center">
          <Link to="/review">
            <span className="underline underline-offset-4">더보기</span>
          </Link>
        </div>
      </div>
      <div className="pt-14 px-4">
        <h2 className="mb-5 lg:mb-8 text-2xl lg:text-2xl text-left font-bold">
          제품 추천
        </h2>
        <RecommendPost />
        <div className="mt-8 text-center">
          <Link to="/recommend">
            <span className="underline underline-offset-4">더보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
