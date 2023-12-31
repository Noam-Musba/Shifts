import { useState } from "react";
import { InputNames } from "./InputNames";
import { NumberOfPositions } from "./NumberOfPositions";
import { ShiftLength } from "./ShiftLength";
import { StartEndTime } from "./StartEndTime";
import { GenerateTable } from "./GenerateTable";

function parseNames(names: string) {
  if (names === "") return [];
  let namesTmp = names.trim().split(/\s+/).filter(Boolean);
  let namesSet = new Set(namesTmp);
  console.log(namesSet);
  return Array.from(namesSet);
}

function isViable(
  numOfPeople: number,
  restLength: number,
  numberOfPositions: number
) {
  console.log(numOfPeople);
  if (numOfPeople < numberOfPositions) return false;
  if (restLength * numberOfPositions > numOfPeople - numberOfPositions)
    return false;
  return true;
}

function generateColumns(
  numOfPositions: number,
  positionsNamesArray: string[]
) {
  let columns = [];
  const specificPositionsNames = positionsNamesArray.length > 0 ? true : false;
  columns.push({ Header: "Time", accessor: "time" });
  for (let i = 0; i < numOfPositions; i++) {
    if (specificPositionsNames) {
      let headerName = positionsNamesArray[i];
      let accessorName = positionsNamesArray[i];
      columns.push({ Header: headerName, accessor: accessorName });
    } else {
      let headerName = "Pos" + i.toString();
      let accessorName = "pos" + i.toString();
      columns.push({ Header: headerName, accessor: accessorName });
    }
  }
  return columns;
}

/**
 *  using the Fisher-Yates shuffle algorithm to shuffle randomly.
 *  the method:
 *  go from the last index i to the first. for each i:
 *    randomize an index between 0-i
 *    exchange between a[i] and a[j]
 */
function randomizeOrder(strArray: string[]) {
  for (let i = strArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [strArray[i], strArray[j]] = [strArray[j], strArray[i]];
  }
  return strArray;
}

function addTimeJump(time: string, jump: number) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours + jump);
  date.setMinutes(minutes);

  const newHours = date.getHours().toString().padStart(2, "0");
  const newMinutes = date.getMinutes().toString().padStart(2, "0");

  return `${newHours}:${newMinutes}`;
}

function generateData(
  namesArray: string[],
  numOfDays: number,
  numOfPositions: number,
  positionsNamesArray: string[],
  startTime: string,
  shiftLength: number
) {
  let data = [];
  const time = "time";
  const shiftsInOneDay = Math.ceil(24 / shiftLength);
  let clockTime = addTimeJump(startTime, -1 * shiftLength);
  let posArray = [];
  if(positionsNamesArray.length > 0){
    for (let i = 0; i < numOfPositions; i++) {
      posArray.push(positionsNamesArray[i]);
    }
  }
  else{

    for (let i = 0; i < numOfPositions; i++) {
      posArray.push("pos" + i.toString());
    }
  }
  const names = randomizeOrder(namesArray);
  const sizeOfNames = names.length;
  let indexOfNames = 0;
  while (numOfDays > 0) {
    for (let i = 0; i < shiftsInOneDay; i++) {
      let entry: { [key: string]: string } = {};
      clockTime = addTimeJump(clockTime, shiftLength);
      entry[time] = clockTime;
      for (let position of posArray) {
        entry[position] = names[indexOfNames++];
        if (indexOfNames >= sizeOfNames) indexOfNames = 0;
      }
      data.push(entry);
    }
    numOfDays--;
  }
  return data;
}

type tableColumnsType = {
  Header: string;
  accessor: string;
}[];

type tableDataType = {
  [key: string]: string;
}[];

export const ShiftsForm = () => {
  const [inputNames, setInputName] = useState("");
  const [numberOfPositions, setNumberOfPositions] = useState("");
  const [nameOfPositions, setNameOfPositions] = useState("");
  const [shiftLength, setShiftLength] = useState("");
  const [restLength, setRestLength] = useState("");
  const [startTime, setStartTime] = useState("");
  const [numOfDays, setNumOfDays] = useState("");
  const [errorCannotCreateTable, setErrorCannotCreateTable] = useState("");
  const [tableColumns, setTablecolumns] = useState<tableColumnsType>([]);
  const [tableData, setTabledata] = useState<tableDataType>([]);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorCannotCreateTable("");
    setShowDownloadButton(false);
    console.log(inputNames);
    const namesArray: string[] = parseNames(inputNames);
    const positionsNamesArray: string[] = parseNames(nameOfPositions);
    const numOfPositions = Number(numberOfPositions);
    if (
      positionsNamesArray.length > 0 &&
      positionsNamesArray.length !== numOfPositions
    ) {
      setErrorCannotCreateTable(
        "The names and the actual number of positions do not match!"
      );
      return;
    }
    console.log(positionsNamesArray);
    console.log(namesArray);
    console.log(numOfPositions);
    console.log(shiftLength);
    console.log(restLength);
    console.log(startTime);
    if (typeof startTime === "string") {
      console.log("time is string");
    }
    console.log(numOfDays);
    if (Number.isInteger(Number(shiftLength))) console.log("woohoo");
    else console.log("what");
    if (!isViable(namesArray.length, Number(restLength), numOfPositions)) {
      setErrorCannotCreateTable("the data cannot hold the restrictions");
      return;
    }

    /**
     * start generating the table, start with columns
     */
    const columns = generateColumns(numOfPositions, positionsNamesArray);
    setTablecolumns(columns);
    const data = generateData(
      namesArray,
      Number(numOfDays),
      numOfPositions,
      positionsNamesArray,
      startTime,
      Number(shiftLength)
    );
    setTabledata(data);
    console.log(data);
    setShowDownloadButton(true);
  };

  return (
    <div
      style={{
        margin: "20px",
        border: "lightgray 1px solid",
      }}
    >
      <h1>
        <u>Shifts form</u>
      </h1>
      <form className="p-5" onSubmit={handleSubmition}>
        <InputNames inputNames={inputNames} setInputName={setInputName} />
        <NumberOfPositions
          numberOfPositions={numberOfPositions}
          setNumberOfPositions={setNumberOfPositions}
          nameOfPositions={nameOfPositions}
          setNameOfPositions={setNameOfPositions}
        />
        <ShiftLength
          setShiftLength={setShiftLength}
          setRestLength={setRestLength}
        />
        <StartEndTime
          startTime={startTime}
          setStartTime={setStartTime}
          numOfDays={numOfDays}
          setNumOfDays={setNumOfDays}
        />
        {errorCannotCreateTable && (
          <p className="fs-3 fw-bold text-danger">{errorCannotCreateTable}</p>
        )}
        <button type="submit" className="btn btn-success">
          Generate Table
        </button>
      </form>
      <GenerateTable
        columns={tableColumns}
        data={tableData}
        downloadButton={showDownloadButton}
      />
    </div>
  );
};
