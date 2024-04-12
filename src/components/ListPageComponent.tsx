import { ReactElement } from "react";

interface IListPageComponent {
  title: string;
  button_name: string;
  Card: () => ReactElement;
  isRendering: boolean;
  onGoToCreate: () => void;
}

const ListPageComponent = ({
  title,
  button_name,
  Card,
  isRendering,
  onGoToCreate,
}: IListPageComponent) => {
  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-row">
        <h1 className="h1-semibold lg:flex-center grow">{title}</h1>
        <div className="flex-none">
          <button className="main_button my-2 h-auto" onClick={onGoToCreate}>
            {button_name}
          </button>
        </div>
      </div>
      {isRendering ? (
        <Card />
      ) : (
        <div className="flex-col flex-center h-96">
          <img
            src="/assets/no-data-icon.svg"
            alt="No Data"
            width={50}
            height={50}
          />
          <h3 className="h3">No data found</h3>
          <p>Please add new item to see more data</p>
        </div>
      )}
    </div>
  );
};
export default ListPageComponent;
