import { useState } from "react";
import { InputNames } from "./InputNames";
import { NumberOfPositions } from "./NumberOfPositions";
import { ShiftLength } from "./ShiftLength";
import { StartEndTime } from "./StartEndTime";
import { GenerateTable } from "./GenerateTable";
import {useTable} from "react-table";

function parseNames(names: string) {
  let namesTmp = names.trim().split(/\s+/).filter(Boolean);
  let namesSet = new Set(namesTmp)
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

function generateColumns(numOfPositions: number) {
  let columns = [];
  columns.push({ Header: "Time", accessor: "time" });
  for (let i = 0; i < numOfPositions; i++) {
    let headerName = "Pos" + i.toString();
    let accessorName = "pos" + i.toString();
    columns.push({ Header: headerName, accessor: accessorName });
  }
  return columns;
}

/**
 *  using the Fisher-Yates shuffle algorithm to shuffle randomly
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
  startTime: string,
  shiftLength: number
) {
  let data = [];
  const time = "time";
  const shiftsInOneDay = Math.ceil(24 / shiftLength);
  let clockTime = addTimeJump(startTime, -1 * shiftLength);
  let posArray = [];
  for (let i = 0; i < numOfPositions; i++) {
    posArray.push("pos" + i.toString());
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
  const [shiftLength, setShiftLength] = useState("");
  const [restLength, setRestLength] = useState("");
  const [startTime, setStartTime] = useState("");
  const [numOfDays, setNumOfDays] = useState("");
  const [tableColumns, setTablecolumns] = useState<tableColumnsType>([]);
  const [tableData, setTabledata] = useState<tableDataType>([]);

  const handleSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputNames);
    const namesArray: string[] = parseNames(inputNames);
    const numOfPositions = Number(numberOfPositions);
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
      console.log(
        "enter error message that the data cannot hold the restrictions"
      );
    }

    /**
     * start generating the table, start with columns
     */
    const columns = generateColumns(numOfPositions);
    /** get back to hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */
    setTablecolumns(columns);
    const data = generateData(
      namesArray,
      Number(numOfDays),
      numOfPositions,
      startTime,
      Number(shiftLength)
    );
    setTabledata(data);
    console.log(data);
    
    /** from here we need to generate the table */
    // const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    //   columns: tableColumns,
    //   data: tableData
    // })
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

        <button type="submit" className="btn btn-success">
          Generate Table
        </button>
      </form>
      <GenerateTable columns={tableColumns} data={tableData} />
    </div>
  );
};
