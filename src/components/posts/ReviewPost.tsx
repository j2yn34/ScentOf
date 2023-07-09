import { Link } from "react-router-dom";
import Rating from "../common/Rating";
import { reviewData } from "../../database/sampleData";

const ReviewPost = (): JSX.Element => {
  const limit = 3;

  return (
    <div className="lg:flex lg:flex-row sm:flex sm:flex-col gap-6">
      {reviewData.slice(0, limit).map((review, index) => (
        <Link
          to={`/review/${review.id}`}
          key={index}
          className="card card-side bg-beige p-4 flex-1"
        >
          <div>
            <figure className="rounded md:shrink-0 mb-2">
              <img
                className="rounded w-[128px] h-[146px]"
                src={review.imageUrl}
                alt="이미지"
              />
            </figure>
            <Rating rating={review.rating} />
          </div>
          <div className="card-body p-0 pl-4 gap-0">
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
