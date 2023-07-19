import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";

type RecommendData = {
  id: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
};

const RecommendPost = ({ limit }: { limit: number }): JSX.Element => {
  const [recommendDatas, setRecommendDatas] = useState<RecommendData[]>([]);

  const getRecommendations = async () => {
    const dbRecommendations = await getDocs(collection(db, "recommendations"));
    const dataArr = dbRecommendations.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as RecommendData[];
    setRecommendDatas(dataArr);
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div className="flex flex-col">
      {recommendDatas.slice(0, limit).map((data) => (
        <Link
          to={`/recommend/${data.id}`}
          key={data.id}
          className="flex items-center justify-between bg-beige w-full min-h-[64px] p-4 border-t border-brown-200 hover:bg-brown-200/[0.4] transition-all"
        >
          <p className="text-brown-900 md:text-base text-sm">{data.title}</p>
          <div className="flex items-center text-brown-400 md:text-sm text-xs">
            <span className="px-4">{data.nickname}</span>
            <span>{data.postedDate.toDate().toLocaleString()}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendPost;
