import React from "react";
import classes from "./PrivatePage.module.css";
import ShowcaseFooter from "../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter";

const PrivatePage = () => {
  return (
    <div className={classes.container}>
      <h1>Привет, это приват</h1>
      <ShowcaseFooter />
    </div>
  );
};

export default PrivatePage;
