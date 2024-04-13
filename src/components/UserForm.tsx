import { useForm } from "react-hook-form";
import { z } from "zod";
import { userValidation } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "./Loader.tsx";
import { useNavigate } from "react-router-dom";
import { IUser, IUserPayload } from "../types";
import { useEffect } from "react";

interface IUserForm {
  onSubmit: (values: IUserPayload) => void;
  data?: IUser;
  isLoading: boolean;
  title: string;
}

const UserForm = ({ onSubmit, data, isLoading, title }: IUserForm) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "",
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      });
    }
  }, [data, reset]);
  const onBack = () => {
    navigate(-1);
  };
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="space-y-12 py-10 px-20">
        <div className="border border-dark-4/10 p-10">
          <h2 className="md:h2-semibold h3 flex-center">{title}</h2>

          <div className="flex md:flex-row flex-col pt-10">
            <div className="w-full p-1">
              <label className="form_label">Full Name</label>
              <div className="mt-2">
                <input
                  type="text"
                  className="form_input"
                  {...register("fullName")}
                />
                <p className="form_message">{errors.fullName?.message}</p>
              </div>
            </div>
            <div className="w-full p-1">
              <label htmlFor="last-name" className="form_label">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="form_input"
                  {...register("email")}
                />
                <p className="form_message">{errors.email?.message}</p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col pt-10">
            <div className="w-full p-1">
              <label className="form_label">Password</label>
              <div className="mt-2">
                <input
                  type="password"
                  className="form_input"
                  {...register("password")}
                />
                <p className="form_message">{errors.password?.message}</p>
              </div>
            </div>
            <div className="w-full p-1">
              <label className="form_label">Role</label>
              <div className="mt-2">
                <select
                  id="types"
                  className="form_input"
                  {...register("role")}
                  defaultValue="admin"
                >
                  <option value="" disabled>
                    Choose a role...
                  </option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
                <p className="form_message">{errors.role?.message}</p>
              </div>
            </div>
          </div>
          <div className="md:mt-28 mt-10 flex flex-center gap-x-6 col-span-4 ">
            <button
              type="button"
              className="cancel_button md:w-32 w-20"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="main_button md:w-32 w-20">
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader />
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default UserForm;
