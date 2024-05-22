import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { hasUserReviewState } from "../../state/userState";
import { PostData } from "../../types";
import ReviewCard from "./ReviewCard";

const UserReviewList = ({
  limit,
  currentPage,
  userId,
}: {
  limit: number;
  currentPage: number;
  userId: string;
}) => {
  const [userPostDatas, setUserPostDatas] = useState<PostData[]>([]);
  const hasUserReview = useSetRecoilState(hasUserReviewState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserPosts = async (currentPage: number) => {
    try {
      setIsLoading(true);

      let dbPosts = collection(db, "reviews");

      const queryRef = query(dbPosts, orderBy("postedDate", "desc"));
      const result = await getDocs(queryRef);
      let dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostData[];
      dataArr = dataArr.filter((post) => post.userId === userId);
      hasUserReview(dataArr.length > 0);

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
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {userPostDatas.slice(0, limit).map((post) => (
            <ReviewCard data={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserReviewList;
