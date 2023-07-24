import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import Rating from "../common/Rating";

type reviewData = {
  id: string;
  nickname: string;
  brandName: string;
  productName: string;
  rating: number;
  title: string;
  content: string;
  imageUrl?: string;
};

const ReviewPost = ({ limit }: { limit: number }): JSX.Element => {
  const [reviewDatas, setReviewDatas] = useState<reviewData[]>([]);

  const getreviews = async () => {
    try {
      const dbreviews = collection(db, "reviews");
      const result = await getDocs(
        query(dbreviews, orderBy("postedDate", "desc"))
      );
      const dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as reviewData[];
      setReviewDatas(dataArr);
    } catch (error) {
      console.error("리스트를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getreviews();
  }, []);

  const defaultImage = "src/assets/defaultImage.jpg";

  return (
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
              <span className="text-sm text-brown-300">{review.brandName}</span>
              <h2 className="card-title py-1 text-brown-900">
                {review.productName}
              </h2>
              <p className="text-sm text-brown-500 mt-1">{review.title}</p>
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
  );
};

export default ReviewPost;
