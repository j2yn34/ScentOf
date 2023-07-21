import LineButton from "../common/buttons/LineButton";

const DetailView = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <button className="flex-end text-sm text-red">삭제하기</button>
        <button className="flex-end text-sm ml-4">수정하기</button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between mt-3 mb-2">
          <h3 className="text-xl px-2">제목</h3>
          <div className="text-brown-300">
            <span className="mx-2">닉네임</span>
            <span>날짜</span>
          </div>
        </div>
        <div className="border-y border-brown-400 min-h-[250px] p-4">
          <div>내용</div>
        </div>
        <LineButton path="/recommend" className="flex text-sm justify-end">
          목록으로
        </LineButton>
      </div>
    </div>
  );
};

export default DetailView;
