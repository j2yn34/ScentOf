import DetailView from "../../components/details/DetailView";
import Comment from "../../components/details/Comment";

const RecommendDetail = () => {
  return (
    <div className="pt-14 xl:px-32 lg:px-20 md:px-12 sm:px-6 px-4">
      <h2 className="text-2xl lg:text-2xl text-left font-bold mb-4 lg:mb-6">
        추천 문의
      </h2>
      <DetailView />
      <Comment />
    </div>
  );
};

export default RecommendDetail;
