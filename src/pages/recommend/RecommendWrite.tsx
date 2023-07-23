import { ChangeEvent, FormEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../quillModules";
import { auth, db } from "../../database/initialize";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RecommendWrite = () => {
  const QuillRef = useRef<ReactQuill | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const docRef = await addDoc(collection(db, "recommendations"), {
          nickname: currentUser.displayName,
          userId: currentUser.uid,
          title: title,
          content: content,
          postedDate: new Date(),
        });
        setTitle("");
        setContent("");
        navigate("/recommend", { replace: true });
        console.log("문서 ID:", docRef.id);
      }
    } catch (error) {
      console.error("Firestore 저장 오류:", error);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  return (
    <div className="pt-14 xl:px-32 lg:px-20 md:px-12 sm:px-6 px-4">
      <div className="flex items-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-2xl text-left font-bold">추천 문의</h2>
        <span className="ml-3.5 text-brown-400">
          추천 받고 싶은 제품이 있나요?
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-brown-400 text-right">*필수입력</span>
        <h4 className="font-bold mb-4">문의 작성*</h4>
        <form onSubmit={onSubmit}>
          <input
            name="title"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={onChange}
            className="w-full text-base bg-beige mb-4 p-3 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
            required
          />
          <ReactQuill
            ref={(element: null) => {
              if (element !== null) {
                QuillRef.current = element;
              }
            }}
            value={content}
            modules={modules}
            onChange={setContent}
            placeholder="추천 받고 싶은 제품이나 향에 대해 작성해 주세요."
            className="w-full bg-beige"
          />
          <div className="flex justify-center">
            <button
              className="mt-8 btn cancel-btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              취소
            </button>
            <button type="submit" className="mt-8 ml-4 btn submit-btn">
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecommendWrite;
