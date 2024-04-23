import { useForm } from "react-hook-form";
import { z } from "zod";
import { postValidation } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Post, PostPayload } from "../types";
import { BackButton, SaveButton } from "./Buttons.tsx";

type PostForm = {
  onSubmit: (values: PostPayload) => void;
  data?: Post;
  isLoading: boolean;
  title: string;
};

export const PostForm = ({ onSubmit, data, isLoading, title }: PostForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="space-y-12 py-10 px-20">
        <div className="border border-dark-4/10 p-10">
          <h2 className="md:h2-semibold h3 flex-center">{title}</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 col-span-5">
              <label className="form_label">Title</label>
              <div className="mt-2">
                <input
                  type="text"
                  className="form_input"
                  {...register("title")}
                />
                <p className="form_message">{errors.title?.message}</p>
              </div>
            </div>

            <div className="col-span-5">
              <label className="form-label">About</label>
              <div className="mt-2">
                <textarea
                  rows={3}
                  className="form_textarea"
                  defaultValue={""}
                  {...register("content")}
                />
                <p className="form_message">{errors.content?.message}</p>
              </div>
            </div>

            <div className="mt-6 flex md:justify-end gap-x-6 col-span-4 ">
              <BackButton />
              <SaveButton
                isLoading={isLoading}
                className={"main_button md:w-32 w-20"}
                text={"Save"}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
