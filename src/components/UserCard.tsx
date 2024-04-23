import { IUser } from "../types";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDeleteUserMutation } from "../store/services/usersQuery.ts";
import Modal from "./Modal.tsx";
import { DeleteButton, UpdateButton } from "./Buttons.tsx";

const DeleteModalUser = ({
  id,
  isOpen,
  onChangeStateDeleteModal,
}: {
  id: number;
  onChangeStateDeleteModal: () => void;
  isOpen: boolean;
}) => {
  const [deleteUser] = useDeleteUserMutation();
  const onDeleteUser = useCallback(() => {
    deleteUser(id);
  }, [id, deleteUser]);
  return (
    <>
      {isOpen && (
        <Modal
          onClose={() => onChangeStateDeleteModal()}
          title={"Delete User"}
          description={"Are you sure you want to delete this user?"}
          onDelete={() => onDeleteUser()}
        />
      )}
    </>
  );
};

const useUserCard = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const onGoToUpdateUserPage = useCallback(() => {
    navigate(`/users/${id}`);
  }, [id, navigate]);
  const onChangeStateDeleteModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return { onChangeStateDeleteModal, onGoToUpdateUserPage, isOpen };
};
const UserCard = ({ data }: { data: IUser }) => {
  const { isOpen, onGoToUpdateUserPage, onChangeStateDeleteModal } =
    useUserCard({ id: data.id });
  return (
    <>
      <DeleteModalUser
        id={data.id}
        isOpen={isOpen}
        onChangeStateDeleteModal={onChangeStateDeleteModal}
      />
      <div className="card_container">
        <div className="card">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate h-28">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {data.fullName}
                </h3>
                <span
                  className={`inline-flex flex-shrink-0 items-center rounded-full bg-light-2 px-1.5 py-0.5 text-xs font-medium ${data.role === "admin" ? "text-red-1" : "text-primary-600"} ring-1 ring-inset ring-green-600/20`}
                >
                  {data.role}
                </span>
              </div>
              <p className="text-sm pt-4">
                Email:
                <span className="mt-1 truncate text-sm text-light-3 pl-1">
                  {data.email}
                </span>
              </p>
            </div>
          </div>
          <div className="flex-center space-x-6 py-4 px-2">
            <UpdateButton onGoToUpdatePostPage={onGoToUpdateUserPage} />
            <DeleteButton onOpenDeleteModal={onChangeStateDeleteModal} />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCard;
