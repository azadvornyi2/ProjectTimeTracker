import { TimeRegister } from "../../../models";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { trackedTimeActions } from "../../../store/reducers";

interface IProps {
  alertOpen: boolean;
  alertClose: () => void;
  timeRegister: TimeRegister;
}

export const TimeRemoveAlert = (props: IProps) => {
  const dispatch = useDispatch();
  let _timeRegister: TimeRegister = { ...props.timeRegister, Deleted: true };
  return (
    <Modal
      onClose={() => props.alertClose()}
      open={props.alertOpen}
      className="modal_container"
    >
      <Box className="modal">
        <div className="modal_title">
          <Typography id="modal-modal-title" variant="h6" component="h1">
            {"Are you sure?"}
          </Typography>
        </div>
        <div className="modal_remove_helper">
          {
            "Do you really want to deleted this registered time? This process cannot be undone."
          }
        </div>

        <div className="modal_buttons_container">
          <div className="PULL_LEFT">
            <div className="button_container">
              <Button
                color="info"
                variant="text"
                startIcon={<CloseIcon />}
                onClick={() => {
                  props.alertClose();
                }}
              >
                {"cancel"}
              </Button>
            </div>
          </div>
          <div className="PULL_LEFT">
            <div className="button_container">
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={() => {
                  dispatch(
                    trackedTimeActions.updateRegiseredTimeRequest_api(
                      _timeRegister
                    )
                  );
                  props.alertClose();
                }}
              >
                {"Remove"}
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
