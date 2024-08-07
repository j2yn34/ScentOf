import { useParams } from "react-router-dom";
import DetailView from "../../components/details/DetailView";
import CommentList from "../../components/details/CommentList";
import CommentInput from "../../components/details/CommentInput";

const ReviewDetail = () => {
  const { postId } = useParams<{ postId?: string }>();

  if (!postId) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="pt-14 xl:px-32 lg:px-20 md:px-12 sm:px-6 px-4">
      <h2 className="text-2xl lg:text-2xl text-left font-bold mb-4 lg:mb-6">
        향기 리뷰
      </h2>
      <DetailView postId={postId} postType="reviews" />
      <>
        <CommentList postId={postId} />
        <CommentInput postId={postId} />
      </>
    </div>
  );
};

export default ReviewDetail;
