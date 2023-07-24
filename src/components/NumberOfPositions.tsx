// import React from 'react'

type NumberOfPositionsProps = {
  numberOfPositions: string;
  setNumberOfPositions: React.Dispatch<React.SetStateAction<string>>;
  nameOfPositions: string;
  setNameOfPositions: React.Dispatch<React.SetStateAction<string>>;
};

export const NumberOfPositions = (props: NumberOfPositionsProps) => {
  return (
    <div className="mb-3 row">
      <div className="col-2">
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            min={1}
            id="NumberOfPositions"
            value={props.numberOfPositions}
            onChange={(event) => props.setNumberOfPositions(event.target.value)}
            required
          />
          <label htmlFor="NumberOfPositions">Insert number of positions</label>
        </div>
      </div>
      <div className="col">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="NameOfPositions"
            value={props.nameOfPositions}
            onChange={(event) => props.setNameOfPositions(event.target.value)}
          />
          <label htmlFor="NameOfPositions">Insert the names of the positions</label>
        </div>
      </div>
    </div>
  );
};
