import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";

type RecommendData = {
  id: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
};

const RecommendPost = ({ limit }: { limit: number }): JSX.Element => {
  const [recommendDatas, setRecommendDatas] = useState<RecommendData[]>([]);

  const getRecommendations = async () => {
    const dbRecommendations = collection(db, "recommendations");
    const result = await getDocs(
      query(dbRecommendations, orderBy("postedDate", "desc"))
    );
    const dataArr = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as RecommendData[];
    setRecommendDatas(dataArr);
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  const getTimeDiff = (timestamp: Timestamp) => {
    const currentTime = moment();
    const postedTime = moment(timestamp.toDate());
    const diffInMinutes = currentTime.diff(postedTime, "minutes");
    const diffInHours = currentTime.diff(postedTime, "hours");

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return postedTime.format("YYYY-MM-DD");
    }
  };

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
            <span className="md:mx-4 mx-2.5 text-center md:w-[90px] w-[60px]">
              {data.nickname}
            </span>
            <span className="md:w-[80px] w-[64px] text-center">
              {getTimeDiff(data.postedDate)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendPost;
