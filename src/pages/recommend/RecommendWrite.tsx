import { ChangeEvent, FormEvent, useRef, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RecommendWrite = () => {
  const QuillRef = useRef<ReactQuill>();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  return (
    <div className="pt-14 xl:px-32 lg:px-20 md:px-12 sm:px-6 px-4">
      <div className="flex items-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-2xl text-left font-bold">추천 질문</h2>
        <span className="ml-3.5 text-brown-400">
          추천 받고 싶은 제품이 있나요?
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-brown-400 text-right">*필수입력</span>
        <h4 className="font-bold mb-4">질문*</h4>
        <form onSubmit={onSubmit}>
          <input
            name="title"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={onChange}
            className="w-full text-base bg-beige mb-4 p-3 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
            // required
          />
          <ReactQuill
            ref={(element: null) => {
              if (element !== null) {
                QuillRef.current = element;
              }
            }}
            value={contents}
            onChange={setContents}
            placeholder="추천 받고 싶은 제품이나 향에 대해 작성해 주세요."
            className="w-full bg-beige"
            // required
          />
          <div className="flex justify-center">
            <button className="mt-8 btn bg-white text-brown border-brown-300 hover:bg-beige">
              취소
            </button>
            <button
              type="submit"
              className="mt-8 ml-4 btn bg-brown-500 text-white hover:bg-brown-600"
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecommendWrite;
