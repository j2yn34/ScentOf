import { Link } from "react-router-dom";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import Rating from "../common/Rating";
import { useSetRecoilState } from "recoil";
import { hasUserReviewState } from "../../state/userState";
import { PostData, ReviewProps } from "../../types";

const ReviewCard = ({
  limit,
  currentPage,
  userId,
  searchTerm,
}: ReviewProps): JSX.Element => {
  const [reviewDatas, setReviewDatas] = useState<PostData[]>([]);
  const hasUserReview = useSetRecoilState(hasUserReviewState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getreviews = async (currentPage: number, search?: string) => {
    try {
      setIsLoading(true);

      const dbreviews = collection(db, "reviews");
      let dataArr: PostData[] = [];

      if (search) {
        const brandQuery = query(
          dbreviews,
          where("brandName", ">=", searchTerm),
          where("brandName", "<=", searchTerm + "\uf8ff")
        );
        const productQuery = query(
          dbreviews,
          where("productName", ">=", searchTerm),
          where("productName", "<=", searchTerm + "\uf8ff")
        );
        const [brandQuerySnapshot, productQuerySnapshot] = await Promise.all([
          getDocs(brandQuery),
          getDocs(productQuery),
        ]);

        const docsToReviewData = (snapshot: QuerySnapshot): PostData[] =>
          snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            ...doc.data(),
            id: doc.id,
          })) as PostData[];

        const brandResults = docsToReviewData(brandQuerySnapshot);
        const productResults = docsToReviewData(productQuerySnapshot);

        dataArr = [...brandResults, ...productResults];
      } else {
        const queryRef = query(dbreviews, orderBy("postedDate", "desc"));
        const result = await getDocs(queryRef);
        dataArr = result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as PostData[];
      }

      if (userId) {
        dataArr = dataArr.filter((post) => post.userId === userId);
        hasUserReview(dataArr.length > 0);
      }

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
    getreviews(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getreviews(1, searchTerm);
  }, [searchTerm]);

  const defaultImage = "/defaultImage.jpg";

  return (
    <>
      {isLoading ? (
        <div className="min-h-[204px] flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-brown-200"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviewDatas.slice(0, limit).map((review, index) => (
            <Link
              to={`/review/${review.id}`}
              key={index}
              className="min-h-[204px] card bg-beige p-4 hover:drop-shadow-md transition-all outline-none"
            >
              <div className="flex flex-auto">
                <figure className="rounded md:shrink-0 mb-2 mr-3.5">
                  <img
                    className="rounded w-[120px] h-[140px]"
                    src={review.imageUrl || defaultImage}
                    alt={review.imageUrl ? "이미지" : "기본 이미지"}
                  />
                </figure>
                <div className="card-body p-0 gap-0">
                  <span className="text-sm text-brown-300">
                    {review.brandName}
                  </span>
                  <h2 className="card-title py-1 text-brown-900">
                    {review.productName}
                  </h2>
                  <p className="text-sm text-brown-500 mt-1 pb-2">
                    {review.title}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <Rating
                  rating={review.rating}
                  readOnly={true}
                  ratingTextVisible={false}
                  setRating={() => void {}}
                />
                <span className="text-right text-sm text-brown-400">
                  {review.nickname}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ReviewCard;
