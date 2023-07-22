const Comment = () => {
  return (
    <div>
      <h4 className="mb-4">댓글</h4>
      <div className="p-4 min-h-[100px] bg-beige border-t border-brown-200">
        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="mr-4 text-brown-500">닉네임</span>
            <span className="text-brown-500 text-sm">날짜</span>
          </div>
          <div className="flex">
            <button className="text-sm text-red">삭제하기</button>
            <button className="text-sm ml-4">수정하기</button>
          </div>
        </div>
        <div className="py-4 text-brown-600">댓글 내용</div>
      </div>
    </div>
  );
};

export default Comment;
