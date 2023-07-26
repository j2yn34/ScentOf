import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import TimeDiff from "../common/timeFormat/TimeDiff";

type RecommendData = {
  id: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
};

type RecommendPostProps = {
  limit: number;
  currentPage: number;
};

const RecommendPost = ({
  limit,
  currentPage,
}: RecommendPostProps): JSX.Element => {
  const [recommendDatas, setRecommendDatas] = useState<RecommendData[]>([]);

  const getRecommendations = async (currentPage: number) => {
    try {
      const dbRecommendations = collection(db, "recommendations");
      const result = await getDocs(
        query(dbRecommendations, orderBy("postedDate", "desc"))
      );
      const dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as RecommendData[];

      const startIndex = (currentPage - 1) * limit;
      const endIndex = currentPage * limit;

      setRecommendDatas(dataArr.slice(startIndex, endIndex));
    } catch (error) {
      console.error("리스트를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getRecommendations(currentPage);
  }, [currentPage]);

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
            <div className="md:w-[80px] w-[64px] text-center">
              <TimeDiff timestamp={data.postedDate} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendPost;
