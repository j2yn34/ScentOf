import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import { PostData } from "../../types";
import RecommendCard from "./RecommendCard";

const RecommendCardList = ({
  limit,
  currentPage,
}: {
  limit: number;
  currentPage: number;
}) => {
  const [recommendDatas, setRecommendDatas] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRecommendations = async (currentPage: number) => {
    try {
      setIsLoading(true);

      const dbRecommendations = collection(db, "recommendations");
      const queryRef = query(dbRecommendations, orderBy("postedDate", "desc"));
      const result = await getDocs(queryRef);
      let dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostData[];

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

  return (
    <>
      {isLoading ? (
        <div className="min-h-[204px] flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-brown-200"></span>
        </div>
      ) : (
        <div className="flex flex-col">
          {recommendDatas.slice(0, limit).map((post) => (
            <RecommendCard data={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default RecommendCardList;
