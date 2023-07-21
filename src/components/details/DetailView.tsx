import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../database/initialize";
import LineButton from "../common/buttons/LineButton";
import TimeDiff from "../../components/common/TimeDiff";

type RecommendData = {
  id: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
  content: string;
};

const DetailView = ({ postId }: { postId: string }) => {
  const [post, setPost] = useState<RecommendData | null>(null);

  const getRecommendData = async () => {
    try {
      const docRef = doc(db, "recommendations", postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({ ...docSnap.data(), id: docSnap.id } as RecommendData);
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("문서를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getRecommendData();
  }, [postId]);

  if (!post) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <button className="flex-end text-sm text-red">삭제하기</button>
        <button className="flex-end text-sm ml-4">수정하기</button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between mt-3 mb-2">
          <h3 className="text-xl px-2">{post.title}</h3>
          <div className="flex text-brown-300">
            <span className="mx-4">{post.nickname}</span>
            <div>
              <TimeDiff timestamp={post.postedDate} />
            </div>
          </div>
        </div>
        <div className="border-y border-brown-400 min-h-[250px] p-4">
          <div>{post.content}</div>
        </div>
        <LineButton path="/recommend" className="flex text-sm justify-end">
          목록으로
        </LineButton>
      </div>
    </div>
  );
};

export default DetailView;