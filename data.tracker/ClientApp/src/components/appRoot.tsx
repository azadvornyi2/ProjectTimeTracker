import * as React from "react";
import AppRoutings from "./appRoutings";
import { Container } from "@material-ui/core";
import Header from "./General/Header";
import { Notification } from "./General/Notifications/notification";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AppRoot: React.FC = (props: any) => {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="content_container">
        <AppRoutings />
      </div>
    </>
  );
};

export default AppRoot;
