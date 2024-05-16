import { useEffect, useState } from "react";
import ReviewPost from "../../components/posts/ReviewCard";
import Pagination from "../../components/common/Pagination";
import LineButton from "../../components/common/buttons/LineButton";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../state/userState";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../database/initialize";

const ReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const limit = 6;
  const maxPage = Math.ceil(totalDataCount / limit);

  useEffect(() => {
    const fetchTotalDataCount = async () => {
      try {
        const dbreviews = collection(db, "reviews");
        const result = await getDocs(dbreviews);
        setTotalDataCount(result.docs.length);
      } catch (error) {
        console.error("데이터 개수를 가져오는 중 오류 발생:", error);
      }
    };

    fetchTotalDataCount();
  }, []);

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
      <ReviewPost limit={limit} currentPage={currentPage} />
      <Pagination
        maxPage={maxPage}
        currentPage={currentPage}
        onClickPageButton={setCurrentPage}
      />
    </div>
  );
};

export default ReviewPage;
