import { Link } from "react-router-dom";
import Rating from "../common/Rating";
import { PostData } from "../../types";

const ReviewCard = ({ data }: { data: PostData }): JSX.Element => {
  const defaultImage = "/defaultImage.jpg";

  return (
    <Link
      to={`/review/${data.id}`}
      className="min-h-[204px] card bg-beige p-4 hover:drop-shadow-md transition-all outline-none"
    >
      <div className="flex flex-auto">
        <figure className="rounded md:shrink-0 mb-2 mr-3.5">
          <img
            className="rounded w-[120px] h-[140px]"
            src={data.imageUrl || defaultImage}
            alt={data.imageUrl ? "이미지" : "기본 이미지"}
          />
        </figure>
        <div className="card-body p-0 gap-0">
          <span className="text-sm text-brown-300">{data.brandName}</span>
          <h2 className="card-title py-1 text-brown-900">{data.productName}</h2>
          <p className="text-sm text-brown-500 mt-1 pb-2">{data.title}</p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <Rating
          rating={data.rating}
          readOnly={true}
          ratingTextVisible={false}
          setRating={() => void {}}
        />
        <span className="text-right text-sm text-brown-400">
          {data.nickname}
        </span>
      </div>
    </Link>
  );
};

export default ReviewCard;
