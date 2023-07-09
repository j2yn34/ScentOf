import { Link } from "react-router-dom";
import { recommendData } from "../../database/sampleData";

const RecommendPost = (): JSX.Element => {
  const limit = 4;

  return (
    <div>
      <div className="flex flex-col">
        {recommendData.slice(0, limit).map((recommend, index) => (
          <Link to={`/recommend/${recommend.id}`} key={index}>
            <div className="flex items-center justify-between bg-beige w-full min-h-[80px] p-4 border-t border-brown-200 ">
              <p className="text-brown-900 text-md">{recommend.title}</p>
              <div className="text-brown-400 md:text-sm sm:text-xs">
                <span className="px-4">{recommend.nickname}</span>
                <span>2023-7-9</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendPost;
