import { IPost } from "../types";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Modal from "./Modal.tsx";
import { useDeletePostMutation } from "../store/services/postsQuery.ts";

const PostCard = ({ data }: { data: IPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const onGoToUpdatePostPage = () => {
    navigate(`/posts/${data?.id}`);
  };
  const onOpenDeleteModal = () => {
    setIsOpen(true);
  };
  const onCloseDeleteModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onDeletePost = useCallback(() => {
    deletePost(data?.id);
  }, [data?.id, deletePost]);
  return (
    <>
      {isOpen && (
        <Modal
          onClose={() => onCloseDeleteModal()}
          title={"Delete Post"}
          description={"Are you sure you want to delete this post?"}
          onDelete={() => onDeletePost()}
        />
      )}
      <div className="card_container">
        <div className="card">
          <div className="p-5">
            <h3 className="h3">{data?.title}</h3>
            <div className="text-medium mb-5 text-dark-4 h-36">
              {data?.content}
            </div>
            <div className="flex-center space-x-6">
              <button
                className="main_button w-28"
                onClick={onGoToUpdatePostPage}
              >
                Update
              </button>
              <button
                className="cancel_button w-28"
                onClick={onOpenDeleteModal}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostCard;
