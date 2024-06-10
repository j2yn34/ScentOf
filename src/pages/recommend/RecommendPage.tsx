import { useEffect, useState } from "react";
import RecommendCardList from "../../components/posts/RecommendCardList";
import Pagination from "../../components/common/Pagination";
import LineButton from "../../components/common/buttons/LineButton";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../state/userState";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../database/initialize";

const RecommendPage = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const limit = 6;
  const maxPage = Math.ceil(totalDataCount / limit);

  useEffect(() => {
    const fetchTotalDataCount = async () => {
      try {
        const dbRecommendations = collection(db, "recommendations");
        const result = await getDocs(dbRecommendations);
        setTotalDataCount(result.docs.length);
      } catch (error) {
        console.error("데이터 개수를 가져오는 중 오류 발생:", error);
      }
    };

    fetchTotalDataCount();
  }, []);

  return (
    <div className="pt-14 px-4">
      <div className="flex items-end justify-between mb-5 lg:mb-8 ">
        <div className="flex flex-col items-start md:flex-row md:items-center">
          <h2 className="text-2xl lg:text-2xl text-left font-bold mr-3.5 mb-2">
            추천 문의
          </h2>
          <span className="text-brown-400 text-sm md:text-base">
            추천해 주세요~
          </span>
        </div>
        <LineButton path={`${isLoggedIn ? "/recommend/write" : "/login"}`}>
          글쓰기
        </LineButton>
      </div>
      <RecommendCardList limit={limit} currentPage={currentPage} />
      <Pagination
        maxPage={maxPage}
        currentPage={currentPage}
        onClickPageButton={setCurrentPage}
      />
    </div>
  );
};

export default RecommendPage;
