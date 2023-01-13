import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableRowsIcon from "@mui/icons-material/TableRows";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, TimeRegister } from "../../../models";
import ErrorIcon from "@mui/icons-material/Error";
import { Report } from "../../../models/entities/Reports/Report";
import { CSVLink } from "react-csv";
import { useRef, useState } from "react";
import * as moment from "moment";

interface IProps {
  isOpen: boolean;
  isClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getFileName = () => {
  let date: Date = new Date();
  let name: string = "Report_" + moment(date).format("DDMMyyhhmmss") + ".csv";
  return name;
};

export const GeneratedReportDialog = (props: IProps) => {
  const inputEl = useRef(null);
  const [fileData, setFileData] = useState([]);
  const report = useSelector<IAppState, Report>(
    (state) => state.reports.report
  );

  const generateTableDate = () => {
    debugger;
    let _csv = [];
    if (report.RegisteredTime) {
      report.RegisteredTime.map((registered) => {
        _csv.push({
          Project: registered.ProjectName,
          Date: registered.Starts.slice(0, 10),
          WeekDay: new Intl.DateTimeFormat("en-US", {
            weekday: "long",
          }).format(new Date(registered.Starts)),
          Hours: registered.Duration,
          Notes: registered.Notes,
        });
      });
      debugger;
    }
    return _csv;
  };

  return (
    <>
      <Dialog
        fullScreen
        open={props.isOpen}
        onClose={props.isClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} className="header">
          <Toolbar className="header">
            <Typography
              variant="h6"
              component="strong"
              className="header_label"
              sx={{ flexGrow: 1 }}
            >
              Report generated on {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString().slice(0, 5)}
            </Typography>
            <IconButton
              edge="start"
              color="error"
              onClick={props.isClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {report.RegisteredTime[1] ? (
          <>
            <div className="export_buttons_container">
              <div className="button_container">
                <Button
                  variant="text"
                  onClick={() => {
                    generateTableDate;
                    document.getElementById("downloadCSV").click();
                  }}
                  startIcon={<TableRowsIcon />}
                >
                  {"Export to CSV"}
                </Button>
              </div>
              <div className="button_container">
                <Button
                  variant="text"
                  startIcon={<PictureAsPdfIcon />}
                  color="error"
                >
                  {"Export to PDF"}
                </Button>
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 100 }}
                aria-label="simple table"
                stickyHeader={true}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Project</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Week Day</TableCell>
                    <TableCell align="center">Hours</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.RegisteredTime.map((row: TimeRegister) => (
                    <TableRow
                      key={row.Id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell width={150} align="center">
                        {row.ProjectName}
                      </TableCell>
                      <TableCell width={100} align="center">
                        {row.Starts.slice(0, 10)}
                      </TableCell>
                      <TableCell width={100} align="center">
                        {new Intl.DateTimeFormat("en-US", {
                          weekday: "long",
                        }).format(new Date(row.Starts))}
                      </TableCell>
                      <TableCell width={50} align="center">
                        {row.Duration}
                      </TableCell>
                      <TableCell>{row.Notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <div className="empty_report_container">
              This report has no time records :(
            </div>
          </>
        )}
        <div className="report_information_lable">
          <h1>Information about this report</h1>
        </div>
        <div className="report_information_container">
          <div>
            <div className="report_information_block_lable">Data</div>
            <div className="report_information_block">
              <div className="report_information_row">
                Report type: {report.ReportType}
              </div>
              <div className="report_information_row">
                Project: {report.ProjectName}
              </div>
            </div>
          </div>
          <div>
            <div className="report_information_block_lable">Time frames</div>
            <div className="report_information_block">
              <div className="report_information_row">
                Begin date: <strong>{report.StartDate}</strong>
              </div>
              <div className="report_information_row">
                End date: <strong>{report.EndDate}</strong>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <CSVLink
        id={"downloadCSV"}
        ref={inputEl}
        filename={getFileName()}
        data={generateTableDate()}
      ></CSVLink>
    </>
  );
};
