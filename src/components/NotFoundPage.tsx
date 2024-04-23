import { useNavigate } from "react-router-dom";
export const NotFoundPage = () => {
  const navigate = useNavigate();

  const onBackHome = () => {
    navigate("/posts");
  };

  return (
    <div className="flex flex-1 justify-center items-center flex-col">
      <img
        src="/assets/page_not_found.jpg"
        alt="Page not found"
        width={450}
        height={450}
        className="items-center justify-center text-center"
      />
      <div>
        <button className="main_button" onClick={onBackHome}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};
