import RecommendPost from "../components/posts/RecommendPost";
import Pagination from "../components/common/Pagination";
import { useState } from "react";

const Recommend = (): JSX.Element => {
  const [page, setPage] = useState(1);

  return (
    <div className="pt-14 px-4">
      <div className="flex items-end mb-5 lg:mb-8 ">
        <h2 className="text-2xl lg:text-2xl text-left font-bold">추천 질문</h2>
        <span className="ml-3.5 text-brown-400">추천해 주세요!</span>
      </div>
      <RecommendPost />
      <Pagination
        maxPage={5}
        currentPage={page}
        onClickPageButton={(pageNumber) => setPage(pageNumber)}
      />
    </div>
  );
};

export default Recommend;
