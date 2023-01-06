import { Alert, Snackbar, SnackbarOrigin, Stack } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { IAppState } from "../../../models/states/appState";

export interface State extends SnackbarOrigin {}

export const Notification = () => {
  const [state, setState] = React.useState<State>({
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;

  const [isOpen, setIsOpen] = React.useState(false);
  const notification = useSelector<IAppState, any>(
    (state) => state.notification.notification
  );
  React.useEffect(() => {
    if (notification.statusCode > 0) {
      setIsOpen(true);
    }
  }, [notification]);
  if (notification) {
    return (
      <>
        <ToastContainer />
        <Snackbar
          open={isOpen}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={6000}
          onClose={() => setIsOpen(false)}
        >
          <Alert
            severity={notification.statusCode === 200 ? "success" : "error"}
            className="notification_container"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </>
    );
  } else return null;
};
