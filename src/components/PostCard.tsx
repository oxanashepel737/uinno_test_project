import { IPost } from "../types";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Modal from "./Modal.tsx";
import { useDeletePostMutation } from "../store/services/postsQuery.ts";
import { useAuthMeQuery } from "../store/services/authQuery.ts";
import { BigLoader } from "./Loader.tsx";
import { DeleteButton, UpdateButton } from "./Buttons.tsx";

const PostCard = ({ data }: { data: IPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const { isLoading, data: dataMe } = useAuthMeQuery();
  const navigate = useNavigate();
  const onGoToUpdatePostPage = useCallback(() => {
    navigate(`/posts/${data?.id}`);
  }, [data?.id, navigate]);
  const onOpenDeleteModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onCloseDeleteModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onDeletePost = useCallback(() => {
    deletePost(data?.id);
  }, [data?.id, deletePost]);
  if (isLoading) {
    return <BigLoader />;
  }
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
            <div className="mb-5 text-dark-4 h-32">
              <p className="line-clamp-5 text-medium">{data?.content}</p>
            </div>
            {dataMe?.role === "admin" || dataMe?.id === data.userId ? (
              <div className="flex-center space-x-6">
                <UpdateButton onGoToUpdatePostPage={onGoToUpdatePostPage} />
                <DeleteButton onOpenDeleteModal={onOpenDeleteModal} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default PostCard;
