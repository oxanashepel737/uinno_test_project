import { Post } from "../types";
import { useNavigate } from "react-router-dom";
import { ReactNode, useCallback, useState } from "react";
import { Modal } from "./Modal.tsx";
import { useDeletePostMutation } from "../store/services/postsQuery.ts";
import { useAuthMeQuery } from "../store/services/authQuery.ts";
import { BigLoader } from "./Loader.tsx";
import { DeleteButton, UpdateButton } from "./Buttons.tsx";

const DeleteModalPost = ({
  id,
  onChangeStateDeleteModal,
  isOpen,
}: {
  id: number;
  onChangeStateDeleteModal: () => void;
  isOpen: boolean;
}) => {
  const [deletePost] = useDeletePostMutation();
  const onDeletePost = useCallback(() => {
    deletePost(id);
  }, [id, deletePost]);
  return (
    <>
      {isOpen && (
        <Modal
          onClose={() => onChangeStateDeleteModal()}
          title={"Delete Post"}
          description={"Are you sure you want to delete this post?"}
          onDelete={() => onDeletePost()}
        />
      )}
    </>
  );
};
const RenderRolesPost = ({
  userId,
  children,
}: {
  userId: number;
  children: ReactNode;
}) => {
  const { isLoading, data } = useAuthMeQuery();
  if (isLoading) {
    return <BigLoader />;
  }
  {
    return data?.role === "admin" || data?.id === userId ? children : null;
  }
};

const usePostCard = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const onGoToUpdatePostPage = useCallback(() => {
    navigate(`/posts/${id}`);
  }, [id, navigate]);
  const onChangeStateDeleteModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return { onGoToUpdatePostPage, onChangeStateDeleteModal, isOpen };
};

const PostCard = ({ data }: { data: Post }) => {
  const { onChangeStateDeleteModal, onGoToUpdatePostPage, isOpen } =
    usePostCard({
      id: data.id,
    });
  return (
    <>
      <DeleteModalPost
        id={data.id}
        onChangeStateDeleteModal={onChangeStateDeleteModal}
        isOpen={isOpen}
      />
      <div className="card_container">
        <div className="card">
          <div className="p-5">
            <h3 className="h3">{data.title}</h3>
            <div className="mb-5 text-dark-4 h-32">
              <p className="line-clamp-5 text-medium">{data.content}</p>
            </div>
            <RenderRolesPost userId={data.userId}>
              <div className="flex-center space-x-6">
                <UpdateButton onGoToUpdatePostPage={onGoToUpdatePostPage} />
                <DeleteButton onOpenDeleteModal={onChangeStateDeleteModal} />
              </div>
            </RenderRolesPost>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostCard;
