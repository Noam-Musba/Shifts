import { useEffect, useRef } from "react";

type InputNamesProps = {
  inputNames: string;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
};

export const InputNames = (props: InputNamesProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])
  
  return (
    <div className="mb-3">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="InputNames"
          ref={inputRef}
          value={props.inputNames}
          onChange={(event) => props.setInputName(event.target.value)}
          required
        />
        <label htmlFor="InputNames">Insert either first or last names - repititions are considered as the same person</label>
      </div>
    </div>
  );
};
