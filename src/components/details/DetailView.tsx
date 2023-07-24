import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../database/initialize";
import LineButton from "../common/buttons/LineButton";
import CustomDateTime from "../common/timeFormat/DateWithTime";

type PostType = "recommend" | "review";

type PostData = {
  id: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
  content: string;
};

type DetailViewProps = {
  postId: string;
  postType: PostType;
};

const DetailView = ({ postId, postType }: DetailViewProps) => {
  const [post, setPost] = useState<PostData | null>(null);

  const getPostData = async () => {
    try {
      const collectionName =
        postType === "recommend" ? "recommendations" : "reviews";
      const docRef = doc(db, collectionName, postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({ ...docSnap.data(), id: docSnap.id } as PostData);
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("문서를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, [postId, postType]);

  if (!post) {
    return <div>로딩중...</div>;
  }

  const safeContent = DOMPurify.sanitize(post.content);

  return (
    <div className="mb-4">
      <div className="flex justify-end">
        <button className="text-sm text-red">삭제하기</button>
        <button className="text-sm ml-4">수정하기</button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between mt-3 mb-2">
          <h3 className="text-xl px-2">{post.title}</h3>
          <div className="flex text-brown-300">
            <span className="mx-4">{post.nickname}</span>
            <CustomDateTime timestamp={post.postedDate.toDate()} />
          </div>
        </div>
        <div className="border-y border-brown-400 min-h-[250px] px-4 py-6 mb-3">
          {parse(safeContent)}
        </div>
        <LineButton path="/recommend" className="flex text-sm justify-end">
          목록으로
        </LineButton>
      </div>
    </div>
  );
};

export default DetailView;
