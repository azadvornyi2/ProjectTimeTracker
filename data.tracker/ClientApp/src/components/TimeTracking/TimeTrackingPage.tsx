import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { IAppState, IReportsState, Project, TimeRegister } from "../../models";
import { reportActions } from "../../store/reducers";
import { projectsActions } from "../../store/reducers/ProjectReducer";
import ButtonsBar from "./Components/ButtonsBar";
import { GeneratedReportDialog } from "./Components/GeneratedReportDialog";
import { GenerateReportModal } from "./Components/GenerateReportModal";
import RegisteredTimeTable from "./Components/RegisteredTimeTable";
import { TimeTrackingModal } from "./Components/TimeTrackingModal";

const TimeTrackingPage = () => {
  const dispatch = useDispatch();

  const projects = useSelector<IAppState, any[]>(
    (state) => state.projects.projects
  );

  const invokeModal = () => {
    if (projects.length === 0) {
      toast.error("There is no project. First, add a project");
    } else {
      setIsModalCalled(true);
    }
  };

  const invokeReports = () => {
    if (projects.length === 0) {
      toast.error("There is no project. First, add a project");
    } else {
      setIsReportCalled(true);
    }
  };

  useEffect(() => {}, []);

  const [isModalCalled, setIsModalCalled] = React.useState<boolean>(false);
  const [isReportCalled, setIsReportCalled] = React.useState<boolean>(false);
  const [openReport, setOpenReport] = React.useState<boolean>(false);

  useEffect(() => {
    dispatch(projectsActions.getAllProjectsRequest_api());
  }, []);

  return (
    <>
      <div>
        <h1>Time</h1>
        <ButtonsBar
          addButtonClick={() => invokeModal()}
          reportButtonClick={() => invokeReports()}
        />
        <RegisteredTimeTable />

        <TimeTrackingModal
          closeModal={() => setIsModalCalled(false)}
          isNew={true}
          openModal={isModalCalled}
          timeRegister={new TimeRegister()}
        />
        <GenerateReportModal
          openModal={isReportCalled}
          closeModal={() => setIsReportCalled(false)}
          openReport={() => setOpenReport(true)}
        />
        <GeneratedReportDialog
          isClose={() => setOpenReport(false)}
          isOpen={openReport}
        />
      </div>
    </>
  );
};

export default TimeTrackingPage;
