import { useState } from "react";

type RatingProps = {
  rating: number;
  setRating: (selectedRating: number) => void;
  readOnly?: boolean;
  ratingTextVisible?: boolean;
};

const Rating = ({
  rating,
  setRating,
  readOnly = false,
  ratingTextVisible = true,
}: RatingProps): JSX.Element => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingHover = (index: number) => {
    setHoveredRating((index + 1) / 2);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleRatingClick = (index: number) => {
    setRating((index + 1) / 2);
  };

  const stars = Array.from(Array(10));

  return (
    <div className="flex items-center">
      <div className="rating rating-md rating-half">
        {stars.map((_, index) => {
          const starValue = (index + 1) / 2;
          return (
            <input
              type="radio"
              name="rating-10"
              key={`rating${index}`}
              className={`bg-yellow-400 cursor-pointer mask mask-star-2
                ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"}
                ${
                  starValue <= (hoveredRating || rating)
                    ? "bg-yellow-400"
                    : "bg-yellow-400/[0.2]"
                }`}
              onMouseEnter={() => handleRatingHover(index)}
              onMouseLeave={() => handleRatingLeave()}
              onClick={() => handleRatingClick(index)}
              disabled={readOnly}
            />
          );
        })}
      </div>
      {ratingTextVisible && rating > 0 && <div className="ml-2">{rating}</div>}
    </div>
  );
};

export default Rating;
