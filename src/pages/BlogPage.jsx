import { Fragment, Suspense, lazy } from "react";
import { Await, useLoaderData, useRouteLoaderData } from "react-router-dom";

import dateFormatter from "../util/dateFormatter";
import LoadingSpinner from "../components/LoadingSpinner";

const Blog = lazy(() => import("../components/Blog"));
const BlogsByUserSection = lazy(() =>
  import("../components/BlogsByUserSection")
);
const BlogsByCategorySection = lazy(() =>
  import("../components/BlogsByCategorySection")
);

const BlogPage = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const { id, title, subTitle, category, content, image, createdAt, user } =
    useLoaderData(); //Get Blog By Id

  const { blogs } = useRouteLoaderData("root");

  const date = dateFormatter(createdAt);

  return (
    <Fragment>
      <main>
        <div className="container text-center">
          {image && (
            <img
              className="w-full h-[30rem] mx-auto"
              src={`${api_url}/${image}`}
              alt=""
            />
          )}
          <div className="mt-5">
            {/* <h2 className="">{category}</h2> */}
            <h1 className="title">{title}</h1>
            <h2>{subTitle}</h2>
            <h2>~By {user.name}</h2>
            <h2>{date}</h2>
            <p className="text-justify px-4 mt-5 md:px-0">{content}</p>
          </div>
        </div>
      </main>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={blogs}>
          {(resolvedBlogs) => {
            const blogsByUser = resolvedBlogs
              .filter((blog) => blog.user.id === user.id && blog.id !== id)
              .map((blog) => (
                <Suspense key={blog.id} fallback={<LoadingSpinner />}>
                  <Blog blog={blog} />
                </Suspense>
              ));

            const blogsByCategory = resolvedBlogs
              .filter((blog) => blog.category === category && blog.id !== id)
              .map((blog) => (
                <Suspense key={blog.id} fallback={<LoadingSpinner />}>
                  <Blog blog={blog} />
                </Suspense>
              ));

            return (
              <Fragment>
                {blogsByUser.length > 0 && (
                  <Suspense fallback={<LoadingSpinner />}>
                    <BlogsByUserSection
                      userName={user.name}
                      blogsByUser={blogsByUser}
                    />
                  </Suspense>
                )}
                {blogsByCategory.length > 0 && (
                  <Suspense fallback={<LoadingSpinner />}>
                    <BlogsByCategorySection
                      category={category}
                      blogsByCategory={blogsByCategory}
                    />
                  </Suspense>
                )}
              </Fragment>
            );
          }}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default BlogPage;
