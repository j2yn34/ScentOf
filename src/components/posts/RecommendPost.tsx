import { Link } from "react-router-dom";
import { recommendData } from "../../database/sampleData";

const RecommendPost = ({ limit }: { limit: number }): JSX.Element => {
  return (
    <div className="flex flex-col">
      {recommendData.slice(0, limit).map((recommend, index) => (
        <Link
          to={`/recommend/${recommend.id}`}
          key={index}
          className="flex items-center justify-between bg-beige w-full min-h-[64px] p-4 border-t border-brown-200 hover:bg-brown-200/[0.4] transition-all"
        >
          <p className="text-brown-900 text-md">{recommend.title}</p>
          <div className="text-brown-400 md:text-sm sm:text-xs">
            <span className="px-4">{recommend.nickname}</span>
            <span>2023-07-09</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendPost;
