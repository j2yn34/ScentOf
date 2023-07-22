import { ChangeEvent, FormEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../quillModules";
import { auth, db } from "../../database/initialize";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Rating from "../../components/common/Rating";

const ReviewWrite = () => {
  const QuillRef = useRef<ReactQuill | null>(null);
  const [brandName, setBrandName] = useState("");
  const [productName, setProductName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const docRef = await addDoc(collection(db, "reviews"), {
          userId: currentUser.uid,
          nickname: currentUser.displayName,
          brandName: brandName,
          productName: productName,
          title: title,
          content: content,
          rating: rating,
          postedDate: new Date(),
        });
        setTitle("");
        setContent("");
        navigate("/review", { replace: true });
        console.log("문서 ID:", docRef.id);
      }
    } catch (error) {
      console.error("Firestore 저장 오류:", error);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "brandName") {
      setBrandName(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "product") {
      setProductName(value);
    }
  };

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
  };

  return (
    <div className="pt-14 xl:px-32 lg:px-20 md:px-12 sm:px-6 px-4">
      <div className="flex items-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-2xl text-left font-bold">향기 리뷰</h2>
        <span className="ml-3.5 text-brown-400">
          향을 오래 기억할 수 있도록 기록해 보세요.
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-brown-400 text-right">*필수입력</span>
        <form onSubmit={onSubmit}>
          <div className="flex md:flex-row flex-wrap">
            <div className="mr-6">
              <h4 className="font-bold mb-4">브랜드*</h4>
              <input
                name="brandName"
                placeholder="브랜드명을 입력해 주세요."
                value={brandName}
                onChange={onChange}
                className="text-base bg-beige mb-6 p-2.5 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
                required
              />
            </div>
            <div className="mr-6">
              <h4 className="font-bold mb-4">제품명*</h4>
              <input
                name="product"
                placeholder="제품명을 입력해 주세요."
                value={productName}
                onChange={onChange}
                className="text-base bg-beige mb-6 p-2.5 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <h4 className="font-bold mb-4">별점*</h4>
              <Rating rating={rating} setRating={handleRatingChange} />
            </div>
          </div>
          <h4 className="font-bold mb-4">리뷰 작성*</h4>
          <input
            name="title"
            placeholder="(제목) 한 줄 평을 입력해 주세요."
            value={title}
            onChange={onChange}
            className="w-full text-base bg-beige mb-4 p-2.5 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
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
            placeholder="향에 대한 생각을 자유롭게 작성해 주세요."
            className="w-full bg-beige"
          />
          <div className="flex justify-center">
            <button className="mt-8 btn cancel-btn">취소</button>
            <button type="submit" className="mt-8 ml-4 btn submit-btn">
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewWrite;
