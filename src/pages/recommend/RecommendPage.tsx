import { useState } from "react";
import RecommendPost from "../../components/posts/RecommendPost";
import Pagination from "../../components/common/Pagination";
import LineButton from "../../components/common/buttons/LineButton";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../state/userState";

const RecommendPage = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageButtonClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <div className="pt-14 px-4">
      <div className="flex items-center justify-between mb-5 lg:mb-8 ">
        <div className="flex items-center">
          <h2 className="text-2xl lg:text-2xl text-left font-bold">
            추천 문의
          </h2>
          <span className="ml-3.5 text-brown-400">추천해 주세요~</span>
        </div>
        <LineButton path={`${isLoggedIn ? "/recommend/write" : "/login"}`}>
          글쓰기
        </LineButton>
      </div>
      <RecommendPost limit={6} currentPage={currentPage} />
      <Pagination
        maxPage={5}
        currentPage={currentPage}
        onClickPageButton={handlePageButtonClick}
      />
    </div>
  );
};

export default RecommendPage;
