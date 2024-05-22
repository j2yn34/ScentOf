import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import { PostData } from "../../types";
import ReviewCard from "./ReviewCard";

const ReviewCardList = ({
  limit,
  currentPage,
}: {
  limit: number;
  currentPage: number;
}) => {
  const [reviewDatas, setReviewDatas] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getReviews = async (currentPage: number) => {
    try {
      setIsLoading(true);

      const dbReviews = collection(db, "reviews");
      const queryRef = query(dbReviews, orderBy("postedDate", "desc"));
      const result = await getDocs(queryRef);
      let dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PostData[];

      const startIndex = (currentPage - 1) * limit;
      const endIndex = currentPage * limit;

      setReviewDatas(dataArr.slice(startIndex, endIndex));
    } catch (error) {
      console.error("리스트를 불러오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReviews(currentPage);
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-[204px] flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-brown-200"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviewDatas.slice(0, limit).map((post) => (
            <ReviewCard data={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ReviewCardList;
