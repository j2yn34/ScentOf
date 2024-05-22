import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { hasUserRecommendState } from "../../state/userState";
import { PostData } from "../../types";
import RecommendCard from "./RecommendCard";

const UserRecommendList = ({
  limit,
  currentPage,
  userId,
}: {
  limit: number;
  currentPage: number;
  userId: string;
}) => {
  const [userPostDatas, setUserPostDatas] = useState<PostData[]>([]);
  const hasUserRecommend = useSetRecoilState(hasUserRecommendState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserPosts = async (currentPage: number) => {
    try {
      setIsLoading(true);

      let dbPosts = collection(db, "recommendations");

      const queryRef = query(dbPosts, orderBy("postedDate", "desc"));
      const result = await getDocs(queryRef);
      let dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostData[];
      dataArr = dataArr.filter((post) => post.userId === userId);
      hasUserRecommend(dataArr.length > 0);

      const startIndex = (currentPage - 1) * limit;
      const endIndex = currentPage * limit;

      setUserPostDatas(dataArr.slice(startIndex, endIndex));
    } catch (error) {
      console.log("리스트를 불러오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserPosts(currentPage);
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-[204px] flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-brown-200"></span>
        </div>
      ) : (
        <div className="flex flex-col">
          {userPostDatas.slice(0, limit).map((post) => (
            <RecommendCard data={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserRecommendList;
