import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { deleteDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../database/initialize";
import { useNavigate } from "react-router-dom";
import LineButton from "../common/buttons/LineButton";
import CustomDateTime from "../common/timeFormat/DateWithTime";
import Rating from "../common/Rating";

type PostType = "recommend" | "reviews";

type PostData = {
  id: string;
  userId: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
  content: string;
  brandName: string;
  productName: string;
  imageUrl: string;
  rating: number;
};

type DetailViewProps = {
  postId: string;
  postType: PostType;
};

const DetailView = ({ postId, postType }: DetailViewProps) => {
  const [post, setPost] = useState<PostData | null>(null);
  const navigate = useNavigate();

  const collectionName =
    postType === "recommend" ? "recommendations" : "reviews";

  const getPostData = async () => {
    try {
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

  const currentUser = auth.currentUser;
  const safeContent = DOMPurify.sanitize(post.content);
  const defaultImage = "/src/assets/defaultImage.jpg";

  const onDeleteClick = (post: PostData) => async () => {
    const ok = confirm("게시글을 삭제할까요?");
    if (ok) {
      await deleteDoc(doc(db, collectionName, post.id));
      navigate(-1);
    }
  };

  const onEditClick = () => {
    const editPagePath =
      postType === "reviews" ? "/review/edit" : "/recommend/edit";
    navigate(`${editPagePath}/${postId}`);
  };

  return (
    <div className="mb-4">
      {currentUser && currentUser.uid === post.userId && (
        <div className="flex justify-end">
          <button onClick={onDeleteClick(post)} className="text-sm text-red">
            삭제하기
          </button>
          <button onClick={onEditClick} className="text-sm ml-4">
            수정하기
          </button>
        </div>
      )}
      {postType === "reviews" && (
        <div className="pb-3 p-2">
          <div className="flex flex-auto">
            <figure className="rounded md:shrink-0 mr-4">
              <img
                className="rounded w-[120px] h-[140px]"
                src={post.imageUrl || defaultImage}
                alt={post.imageUrl ? "이미지" : "기본 이미지"}
              />
            </figure>
            <div className="card-body p-0 gap-0">
              <span className="text-sm text-brown-300">{post.brandName}</span>
              <h2 className="card-title py-1 text-brown-900">
                {post.productName}
              </h2>
              <Rating
                rating={post.rating}
                readOnly={true}
                ratingTextVisible={true}
                setRating={() => void {}}
              />
            </div>
          </div>
        </div>
      )}
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
