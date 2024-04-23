import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader.tsx";

export const DeleteButton = ({
  onOpenDeleteModal,
}: {
  onOpenDeleteModal: () => void;
}) => {
  return (
    <button className="cancel_button w-28" onClick={onOpenDeleteModal}>
      Delete
    </button>
  );
};

export const UpdateButton = ({
  onGoToUpdatePostPage,
}: {
  onGoToUpdatePostPage: () => void;
}) => {
  return (
    <button className="main_button w-28" onClick={onGoToUpdatePostPage}>
      Update
    </button>
  );
};

export const BackButton = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <button
      type="button"
      className="cancel_button md:w-32 w-20"
      onClick={onBack}
    >
      Cancel
    </button>
  );
};

export const SaveButton = ({
  isLoading,
  text,
  className,
}: {
  isLoading: boolean;
  text: string;
  className: string;
}) => {
  return (
    <button type="submit" className={className}>
      {isLoading ? (
        <div className="flex-center gap-2">
          <Loader />
        </div>
      ) : (
        text
      )}
    </button>
  );
};
