import { Link } from "react-router-dom";
import ReviewPost from "../components/posts/ReviewCard";
import RecommendPost from "../components/posts/RecommendCard";

const Index = () => {
  return (
    <div>
      <div className="pt-14 px-4">
        <div className="flex items-end mb-5 lg:mb-8 ">
          <h2 className="text-2xl text-left font-bold">향기 리뷰</h2>
          <span className="ml-3.5 text-brown-400">업데이트 된 리뷰</span>
        </div>
        <ReviewPost limit={3} currentPage={1} />
        <Link to="/review" className="block w-[70px] h-[26px] mx-auto">
          <div className="mt-10 flex justify-center items-center border-b border-brown-500">
            <span className="text-brown-500">더보기</span>
            <span className="arrow-right-sm border-brown-500 aria-hidden ml-1" />
          </div>
        </Link>
      </div>
      <div className="pt-16 px-4">
        <div className="flex items-end mb-5 lg:mb-8 ">
          <h2 className="text-2xl text-left font-bold">추천 문의</h2>
          <span className="ml-3.5 text-brown-400">추천해 주세요~</span>
        </div>
        <RecommendPost limit={4} currentPage={1} />
        <Link to="/recommend" className="block w-[70px] h-[26px] mx-auto">
          <div className="mt-10 flex justify-center items-center border-b border-brown-500">
            <span className="text-brown-500">더보기</span>
            <span className="arrow-right-sm border-brown-500 aria-hidden ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;
