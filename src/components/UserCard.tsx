import { IUser } from "../types";

const UserCard = ({ data }: { data: IUser }) => {
  return (
    <div className="flex px-4">
      <div className="card_container">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
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
          <button className="main_button w-28">Update</button>
          <button className="cancel_button w-28">Delete</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
