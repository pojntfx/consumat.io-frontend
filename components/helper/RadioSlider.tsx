import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CSS from "csstype";

type RadioSliderProps = {
  name: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: string[];
  className?: string;
};

const RadioSlider = ({
  name,
  value,
  onChange,
  options,
  className,
}: RadioSliderProps) => {
  const [indicator, setIndicator] = useState<CSS.Properties>();
  useEffect(() => {
    setIndicator({
      width: `${100 / options.length}%`,
      left: `${(100 / options.length) * options.indexOf(value)}%`,
    });
  }, [value, options]);

  return (
    <div className={"toggleSwitch " + className}>
      {options.map((option) => (
        <label key={option} htmlFor={option}>
          <input
            type="radio"
            name={name}
            value={option}
            id={option}
            checked={value === option}
            onChange={(event) => {
              onChange(event.target.value);
            }}
          />
          <div>{option}</div>
        </label>
      ))}
      <div className="indicator" style={indicator} />
    </div>
  );
};

export default RadioSlider;
