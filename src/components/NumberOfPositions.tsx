// import React from 'react'

type NumberOfPositionsProps = {
  numberOfPositions: string;
  setNumberOfPositions: React.Dispatch<React.SetStateAction<string>>;
};

export const NumberOfPositions = (props: NumberOfPositionsProps) => {
  return (
    <div className="mb-3">
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          id="NumberOfPositions"
          value={props.numberOfPositions}
          onChange={(event) => props.setNumberOfPositions(event.target.value)}
          required
        />
        <label htmlFor="NumberOfPositions">Insert number of positions</label>
      </div>
    </div>
  );
};
