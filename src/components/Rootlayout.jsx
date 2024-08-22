import { Outlet, useLocation } from "react-router-dom";

import useDocumentTitle from "../util/hooks/use-documentTitle";
import Navbar from "./Navbar";
import { Fragment } from "react";

const RootLayout = () => {
  const location = useLocation();

  const path = location.pathname;
  let title;

  if (path === "/login") {
    title = "Login";
  } else if (path === "/create-account") {
    title = "Create Account";
  } else {
    title = "Nest-level Blogs";
  }

  useDocumentTitle(title);

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
