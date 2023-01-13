import * as React from "react";

import AddIcon from "@mui/icons-material/Add";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Button from "@mui/material/Button";

interface IProps {
  addButtonClick: () => void;
  reportButtonClick: () => void;
}

const ButtonsBar = (props: IProps) => {
  return (
    <>
      <div className="control_buttons_container">
        <div className="button_container">
          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={props.addButtonClick}
          >
            {"Add Spend Time"}
          </Button>
        </div>
        <div className="button_container">
          <Button
            variant="text"
            startIcon={<SummarizeIcon />}
            color="warning"
            onClick={props.reportButtonClick}
          >
            {"Generate Report"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonsBar;
