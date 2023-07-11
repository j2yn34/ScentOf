const Signup = () => {
  return (
    <div
      className="flex items-center justify-center mx-auto text-center"
      style={{ minHeight: `calc(100vh - 64px - 4rem - 81px)` }}
    >
      <div className="flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl text-brown-900">회원가입</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-[16px]">이메일</span>
          </label>
          <input
            type="email"
            placeholder="이메일을 입력해 주세요."
            className="input w-full placeholder:text-sm"
          />
          <label className="label pb-0">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <label className="label">
            <span className="label-text text-[16px]">비밀번호</span>
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className="input w-full placeholder:text-sm"
          />
          <label className="label pb-0">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <label className="label">
            <span className="label-text text-[16px]">비밀번호 확인</span>
          </label>
          <input
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            className="input w-full placeholder:text-sm"
          />
          <label className="label pb-0">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <label className="label">
            <span className="label-text text-[16px]">닉네임</span>
          </label>
          <input
            type="password"
            placeholder="닉네임을 입력해 주세요."
            className="input w-full placeholder:text-sm"
          />
          <label className="label pb-0">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <button
            className="btn bg-brown-500 text-white hover:bg-brown-600 mt-6"
            type="submit"
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
