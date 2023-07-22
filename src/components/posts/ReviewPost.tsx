import { Link } from "react-router-dom";
import Rating from "../common/Rating";
import { reviewData } from "../../database/sampleData";

const ReviewPost = ({ limit }: { limit: number }): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {reviewData.slice(0, limit).map((review, index) => (
        <Link
          to={`/review/${review.id}`}
          key={index}
          className="card card-side bg-beige p-4 hover:drop-shadow-md transition-all outline-none"
        >
          <div>
            <figure className="rounded md:shrink-0 mb-2">
              <img
                className="rounded w-[120px] h-[140px]"
                src={review.imageUrl}
                alt="이미지"
              />
            </figure>
            <Rating
              rating={review.rating}
              readOnly={true}
              ratingTextVisible={false}
              setRating={() => void {}}
            />
          </div>
          <div className="card-body p-0 pl-3.5 gap-0">
            <span className="text-sm text-brown-300">{review.brandName}</span>
            <h2 className="card-title py-1 text-brown-900">
              {review.productName}
            </h2>
            <p className="text-sm text-brown-500">{review.title}</p>
            <div className="flex flex-col items-end mt-2">
              <span className="text-right text-sm text-brown-400 my-1">
                {review.nickname}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ReviewPost;
