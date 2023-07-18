import { useState } from "react";
import ReviewPost from "../../components/posts/ReviewPost";
import Pagination from "../../components/common/Pagination";
import LineButton from "../../components/common/buttons/LineButton";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../state/authState";

const Review = () => {
  const [page, setPage] = useState(1);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <div className="pt-14 px-4">
      <div className="flex items-center justify-between mb-5 lg:mb-8 ">
        <div className="flex items-center">
          <h2 className="text-2xl lg:text-2xl text-left font-bold">
            향기 리뷰
          </h2>
          <span className="ml-3.5 text-brown-400">
            다양한 리뷰를 확인해 보세요
          </span>
        </div>
        <LineButton path={`${isLoggedIn ? "/review/write" : "/login"}`}>
          글쓰기
        </LineButton>
      </div>
      <ReviewPost limit={6} />
      <Pagination
        maxPage={5}
        currentPage={page}
        onClickPageButton={(pageNumber) => setPage(pageNumber)}
      />
    </div>
  );
};

export default Review;
