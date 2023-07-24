import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../../database/initialize";
import CustomDateTime from "../common/timeFormat/DateWithTime";

type CommentData = {
  id: string;
  postId: string;
  content: string;
  nickname: string;
  userId: string;
  createdDate: Timestamp;
};

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [commentsDatas, setCommentsDatas] = useState<CommentData[]>([]);
  const [editing, setEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<CommentData | null>(
    null
  );

  const currentUser = auth.currentUser;

  const getComments = async () => {
    try {
      const commentsRef = collection(db, "comments");
      const commentsQuery = query(
        commentsRef,
        where("postId", "==", postId),
        orderBy("createdDate", "asc")
      );

      onSnapshot(commentsQuery, (querySnapshot) => {
        const data: CommentData[] = [];

        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as CommentData);
        });
        setCommentsDatas(data);
      });
    } catch (error) {
      console.error("댓글 불러오는 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  const onDeleteClick = (comment: CommentData) => async () => {
    const ok = confirm("댓글을 삭제할까요?");
    if (ok) {
      await deleteDoc(doc(db, "comments", comment.id));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onEditClick = (comment: CommentData) => () => {
    setNewComment(comment.content);
    setEditingComment(comment);
    toggleEditing();
  };

  const onSaveClick = async () => {
    if (editingComment) {
      try {
        await updateDoc(doc(db, "comments", editingComment.id), {
          content: newComment,
        });
        toggleEditing();
      } catch (error) {
        console.error("댓글 수정 중 오류 발생: ", error);
      }
    }
  };

  const onCancelClick = () => {
    setEditingComment(null);
    toggleEditing();
  };

  return (
    <>
      {commentsDatas.map((comment) => (
        <div
          key={comment.id}
          className="px-4 py-3 min-h-[100px] bg-beige border-t border-brown-200"
        >
          <div className="mb-3">
            <div className="flex justify-between">
              <div className="flex items-center">
                <span className="mr-4 text-brown-500">{comment.nickname}</span>
                <div className="text-brown-400 text-sm">
                  <CustomDateTime timestamp={comment.createdDate.toDate()} />
                </div>
              </div>
              {currentUser &&
                currentUser.uid === comment.userId &&
                !editing && (
                  <div className="flex">
                    <button
                      onClick={onDeleteClick(comment)}
                      className="text-sm text-red"
                    >
                      삭제
                    </button>
                    <button
                      onClick={onEditClick(comment)}
                      className="text-sm ml-4"
                    >
                      수정
                    </button>
                  </div>
                )}
            </div>
            {editing && editingComment?.id === comment.id ? (
              <div className="flex">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="my-2 p-2 w-full bg-beige placeholder:text-brown-300 placeholder:italic"
                />
                <div className="flex items-center">
                  <button
                    onClick={onCancelClick}
                    className="text-sm w-[36px] h-[30px] ml-2"
                  >
                    취소
                  </button>
                  <button
                    onClick={onSaveClick}
                    className="text-sm text-green min-w-[36px] h-[30px] ml-3"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-3 text-brown-600">{comment.content}</div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
