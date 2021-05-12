import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/ToggleSwitch.module.css";

type ToggleSwitchProps = {
  name: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: string[];
};

const ToggleSwitch = ({
  name,
  value,
  onChange,
  options,
}: ToggleSwitchProps) => {
  const [indicator, setIndicator] = useState<any>();
  useEffect(() => {
    setIndicator({
      width: `${100 / options.length}%`,
      left: `${(100 / options.length) * options.indexOf(value)}%`,
    });
  }, [value]);

  return (
    <div className={styles.toggleSwitch}>
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
      <div className={styles.indicator} style={indicator} />
    </div>
  );
};

export default ToggleSwitch;
