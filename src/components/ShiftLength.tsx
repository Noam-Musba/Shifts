// import React from 'react'

type ShiftLengthProps = {
  setShiftLength: React.Dispatch<React.SetStateAction<string>>;
  setRestLength: React.Dispatch<React.SetStateAction<string>>;
};

export const ShiftLength = (props: ShiftLengthProps) => {
  return (
    <div className="mb-3 row">
      <div className="col">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(event) => props.setShiftLength(event.target.value)}
          required
        >
          <option defaultValue={"Select the length of a shift"}>
            Select the length of a shift
          </option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
          <option value="8">8 hours</option>
          <option value="9">9 hours</option>
          <option value="10">10 hours</option>
          <option value="12">12 hours</option>
          <option value="16">16 hours</option>
        </select>
      </div>

      <div className="col">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(event) => props.setRestLength(event.target.value)}
          required
        >
          <option defaultValue={"Select the length of rest between shifts"}>
            Select the minimum time of rest between shifts
          </option>
          <option value="1">x1 times the shift length</option>
          <option value="2">x2 times the shift length</option>
          <option value="3">x3 times the shift length</option>
          <option value="4">x4 times the shift length</option>
        </select>
      </div>

    </div>
  );
};
