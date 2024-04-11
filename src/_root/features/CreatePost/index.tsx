import { useForm } from "react-hook-form";
import { z } from "zod";
import { postValidation } from "../../../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPostPayload } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../../store/services/postsQuery.ts";
import { Loader } from "../../../components/Loader.tsx";
import { useEffect } from "react";

const CreatePost = () => {
  const navigate = useNavigate();
  const [createPost, { isSuccess, isLoading }] = useCreatePostMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/posts");
    }
  }, [isSuccess, navigate]);

  const onSubmit = (values: IPostPayload) => {
    createPost(values);
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 py-10 px-20">
        <div className="border border-dark-4/10 p-10">
          <h2 className="md:h2-semibold h3 flex-center">Create Post</h2>

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
      </div>
    </form>
  );
};
export default CreatePost;
