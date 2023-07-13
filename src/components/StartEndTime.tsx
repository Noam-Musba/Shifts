// import React from "react";

type StartEndTimeProps = {
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  numOfDays: string;
  setNumOfDays: React.Dispatch<React.SetStateAction<string>>;
}


export const StartEndTime = (props: StartEndTimeProps) => {
  return (
    <div className="mb-3 row">
      <div className="col">
        <div className="form-floating mb-3">
          <input
            type="time"
            className="form-control"
            id="StartTime"
            value={props.startTime}
            onChange={(event) => props.setStartTime(event.target.value)}
            required
          />
          <label htmlFor="StartTime">Insert starting time</label>
        </div>
      </div>

      <div className="col">
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="EndTime"
            value={props.numOfDays}
            onChange={(event) => props.setNumOfDays(event.target.value)}
            required
          />
          <label htmlFor="EndTime">Insert the number of days for the table</label>
        </div>
      </div>
    </div>
  );
};
