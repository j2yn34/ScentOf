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
import { useSetRecoilState } from "recoil";
import { hasUserRecommendState } from "../../state/userState";

type RecommendData = {
  id: string;
  userId: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
};

const UserRecommendPost = ({
  limit,
  userId,
}: {
  limit: number;
  userId: string;
}): JSX.Element => {
  const [userRecommendDatas, setUserRecommendDatas] = useState<RecommendData[]>(
    []
  );
  const hasUserRecommend = useSetRecoilState(hasUserRecommendState);

  const getRecommendations = async () => {
    try {
      const dbRecommendations = collection(db, "recommendations");
      const result = await getDocs(
        query(dbRecommendations, orderBy("postedDate", "desc"))
      );
      const dataArr = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as RecommendData[];
      const userRecommendPosts = dataArr.filter(
        (post) => post.userId === userId
      );
      hasUserRecommend(userRecommendPosts.length > 0);
      setUserRecommendDatas(userRecommendPosts);
    } catch (error) {
      console.error("리스트를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div className="flex flex-col">
      {userRecommendDatas.slice(0, limit).map((data) => (
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

export default UserRecommendPost;
