import { Link } from "react-router-dom";
import TimeDiff from "../common/timeFormat/TimeDiff";
import { PostData } from "../../types";

const RecommendCard = ({ data }: { data: PostData }): JSX.Element => {
  return (
    <Link
      to={`/recommend/${data.id}`}
      key={data.id}
      className="flex items-center justify-between bg-beige w-full min-h-[64px] p-4 border-t border-brown-200 hover:bg-brown-200/[0.4] transition-all"
    >
      <p className="text-brown-900 md:text-base text-sm truncate">
        {data.title}
      </p>
      <div className="flex items-center text-brown-400 md:text-sm text-xs">
        <span className="md:mx-4 mx-2.5 text-center md:w-[90px] w-[60px]">
          {data.nickname}
        </span>
        <div className="md:w-[80px] w-[64px] text-center">
          <TimeDiff timestamp={data.postedDate} />
        </div>
      </div>
    </Link>
  );
};

export default RecommendCard;
