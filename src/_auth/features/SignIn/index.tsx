import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInValidation } from "../../../validation";
import { ISignIn } from "../../../types";
import { useLogInMutation } from "../../../store/services/authQuery.ts";
import { Loader } from "../../../components/Loader.tsx";

const SignIn = () => {
  const [SignIn, { isLoading }] = useLogInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: ISignIn) => {
    SignIn(values);
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark-4">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="form_label">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="form_input"
                  autoComplete="email"
                />
                <p className="form_message">{errors.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form_label">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  {...register("password")}
                  className="form_input"
                  autoComplete="password"
                />
                <p className="form_message">{errors.password?.message}</p>
              </div>
            </div>

            <div>
              <button type="submit" className="main_button">
                {isLoading ? (
                  <div className="flex-center gap-2">
                    <Loader />
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignIn;
