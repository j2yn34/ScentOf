import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import TimeDiff from "../common/timeFormat/TimeDiff";
import { useSetRecoilState } from "recoil";
import { hasUserRecommendState } from "../../state/userState";
import { PostData, RecommendProps } from "../../types";

const RecommendPost = ({
  limit,
  currentPage,
  userId,
  searchTerm,
}: RecommendProps): JSX.Element => {
  const [recommendDatas, setRecommendDatas] = useState<PostData[]>([]);
  const hasUserRecommend = useSetRecoilState(hasUserRecommendState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRecommendations = async (currentPage: number, search?: string) => {
    try {
      setIsLoading(true);

      const dbRecommendations = collection(db, "recommendations");
      let queryRef;

      if (search) {
        queryRef = query(
          dbRecommendations,
          where("title", ">=", searchTerm),
          where("title", "<=", searchTerm + "\uf8ff")
        );
      } else {
        queryRef = query(dbRecommendations, orderBy("postedDate", "desc"));
      }

      const result = await getDocs(queryRef);
      const dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostData[];

      if (userId) {
        queryRef = dataArr.filter((post) => post.userId === userId);
        hasUserRecommend(dataArr.length > 0);
      }

      const startIndex = (currentPage - 1) * limit;
      const endIndex = currentPage * limit;

      setRecommendDatas(dataArr.slice(startIndex, endIndex));
    } catch (error) {
      console.error("리스트를 불러오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecommendations(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getRecommendations(1, searchTerm);
  }, [searchTerm]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-[204px] flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-brown-200"></span>
        </div>
      ) : (
        <div className="flex flex-col">
          {recommendDatas.slice(0, limit).map((data) => (
            <Link
              to={`/recommend/${data.id}`}
              key={data.id}
              className="flex items-center justify-between bg-beige w-full min-h-[64px] p-4 border-t border-brown-200 hover:bg-brown-200/[0.4] transition-all"
            >
              <p className="text-brown-900 md:text-base text-sm">
                {data.title}
              </p>
              <div className="flex items-center text-brown-400 md:text-sm text-xs">
                <span className="md:mx-4 mx-2.5 text-center md:w-[90px] w-[60px]">
                  {data.nickname}
                </span>
                <div className="md:w-[80px] w-[64px] text-center">
                  <TimeDiff timestamp={data.postedDate} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default RecommendPost;
