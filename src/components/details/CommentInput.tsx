const CommentInput = () => {
  return (
    <div className="mt-12 p-4 pb-2 min-h-[130px] bg-beige rounded-lg">
      <div className="text-brown-500">닉네임</div>
      <form className="flex flex-col">
        <textarea
          className="my-2 p-2 w-full bg-beige placeholder:text-brown-300 placeholder:italic"
          placeholder="댓글을 남겨보세요."
        />
        <div className="flex justify-end">
          <button className="btn btn-sm submit-btn">등록</button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
