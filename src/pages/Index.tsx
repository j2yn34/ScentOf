import { Link } from "react-router-dom";
import ReviewPost from "../components/posts/ReviewPost";
import RecommendPost from "../components/posts/RecommendPost";

const Index = () => {
  return (
    <div>
      <div className="pt-14 px-4">
        <div className="flex items-end mb-5 lg:mb-8 ">
          <h2 className="text-2xl lg:text-2xl text-left font-bold">
            향기 리뷰
          </h2>
          <span className="ml-3.5 text-brown-400">업데이트 된 리뷰</span>
        </div>
        <ReviewPost />
        <Link to="/review" className="block w-[70px] h-[26px] mx-auto">
          <div className="mt-8 flex justify-center items-center hover:border-b hover:border-brown-500 transition-all">
            <span className="text-brown-500">더보기</span>
            <span className="ml-1 block aria-hidden w-[8px] h-[8px] border-t border-r border-brown-500 origin-center rotate-45"></span>
          </div>
        </Link>
      </div>
      <div className="pt-14 px-4">
        <div className="flex items-end mb-5 lg:mb-8 ">
          <h2 className="text-2xl lg:text-2xl text-left font-bold">
            추천 질문
          </h2>
          <span className="ml-3.5 text-brown-400">추천해 주세요!</span>
        </div>
        <RecommendPost />
        <Link to="/recommend" className="block w-[70px] h-[26px] mx-auto">
          <div className="mt-8 flex justify-center items-center hover:border-b hover:border-brown-500 transition-all">
            <span className="text-brown-500">더보기</span>
            <span className="ml-1 block aria-hidden w-[8px] h-[8px] border-t border-r border-brown-500 origin-center rotate-45"></span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;
