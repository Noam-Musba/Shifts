type InputNamesProps = {
  inputNames: string;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
};

export const InputNames = (props: InputNamesProps) => {
  return (
    <div className="mb-3">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="InputNames"
          value={props.inputNames}
          onChange={(event) => props.setInputName(event.target.value)}
          required
        />
        <label htmlFor="InputNames">Insert names</label>
      </div>
    </div>
  );
};
