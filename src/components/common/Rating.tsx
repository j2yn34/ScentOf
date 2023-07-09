type Rating = {
  rating: number;
} & typeof defaultProps;

const defaultProps = {
  rating: 0,
};

const Rating = ({ rating }: Rating): JSX.Element => {
  const checked = Math.floor(rating * 2);
  const stars = Array.from(Array(10));

  return (
    <div className="flex items-center">
      <div className="rating rating-half">
        {stars.map((_, index) => {
          return (
            <input
              type="radio"
              name="rating-10"
              key={`rating${index}`}
              className={`bg-yellow-400 cursor-default mask mask-star-2
              ${index % 2 == 0 ? "mask-half-1" : "mask-half-2"}`}
              disabled
              checked={checked == index + 1 ? true : false}
            />
          );
        })}
      </div>
      <div className="ml-2">{rating}</div>
    </div>
  );
};

Rating.defaultProps = defaultProps;

export default Rating;
