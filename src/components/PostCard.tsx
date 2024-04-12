import { IPost } from "../types";
import { useNavigate } from "react-router-dom";

const PostCard = ({ data }: { data: IPost }) => {
  const navigate = useNavigate();
  const onGoToUpdatePostPage = () => {
    navigate(`/posts/${data?.id}`);
  };
  return (
    <div className="flex px-4">
      <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
        <div className="p-5">
          <h3 className="h3">{data?.title}</h3>
          <div className="text-medium mb-5 text-dark-4 h-36">
            {data?.content}
          </div>
          <div className="flex-center space-x-6">
            <button className="main_button w-28" onClick={onGoToUpdatePostPage}>
              Update
            </button>
            <button className="cancel_button w-28">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
