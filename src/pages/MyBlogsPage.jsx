import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Await, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LoadingSpinner from "../components/LoadingSpinner";

import Blog from "../components/Blog";
const EditBlogForm = lazy(() => import("../components/EditBlogForm"));
import { modalActions } from "../redux/store";

const MyBlogsPage = () => {
  const { blogs: blogsData, user } = useRouteLoaderData("root");

  const [blogId, setBlogId] = useState();

  const dispatch = useDispatch();

  const editBlogIsShown = useSelector((state) => state.modal.editBlogIsShown);

  const submit = useSubmit();

  const titleInputRef = useRef();

  useEffect(() => {
    if (editBlogIsShown) {
      titleInputRef.current.focus();
    }
  }, [editBlogIsShown]);

  if (!user) {
    return;
  }

  const userId = user.id;

  const editBlogHandler = (blogId) => {
    dispatch(modalActions.showModal("editBlog"));
    setBlogId(blogId);
  };

  const deletBlogHandler = (blogId) => {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) {
      const formData = new FormData();

      formData.append("blogId", blogId);
      formData.append("intent", "delete");

      submit(formData, { method: "post" });
    }
  };

  return (
    <Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={blogsData}>
          {(resolvedBlogs) => {
            if (resolvedBlogs.length === 0) {
              return (
                <p className="text-center font-semibold text-red-500 text-xl">
                  No blogs yet!
                </p>
              );
            }

            const blogs = resolvedBlogs
              .filter((blog) => blog.user.id === userId)
              .map((blog) => {
                return (
                  <div key={blog.id} className="flex flex-col mx-auto">
                    <Blog blog={blog} noUser={true} />
                    <div className="mx-auto space-x-3 mt-1">
                      <button
                        className="btn-white"
                        onClick={() => editBlogHandler(blog.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-white"
                        onClick={() => deletBlogHandler(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              });

            return (
              <Fragment>
                {editBlogIsShown && (
                  <Suspense fallback={<LoadingSpinner />}>
                    <EditBlogForm
                      ref={titleInputRef}
                      blogsData={resolvedBlogs}
                      blogId={blogId}
                    />
                  </Suspense>
                )}
                <ul className="grid md:grid-cols-2 place-items-center gap-3 mb-5">
                  {blogs}
                </ul>
                ;
              </Fragment>
            );
          }}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default MyBlogsPage;
