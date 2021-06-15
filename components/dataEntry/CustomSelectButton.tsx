import { ChevronDownIcon } from "@heroicons/react/outline";
import { ChangeEvent } from "react";

export type SelectOption = {
  key: string;
  value: string;
};

type SelectButtonProps = {
  name: string;
  value: string;
  options: string[];
  labels: string[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

const CustomSelectButton = ({
  name,
  value,
  onChange,
  options,
  labels,
  className,
}: SelectButtonProps) => {
  return (
    <div className={className + " button relative flex"}>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(event) => {
          onChange?.(event);
        }}
        className="text-sm font-medium bg-transparent z-10 w-full pl-2 pr-6 py-1"
      >
        {options.map((option, key) => (
          <option
            key={option}
            value={option}
            className="font-medium dark:bg-gray-800"
          >
            {labels[key]}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute z-0 right-1 h-5 w-4 my-1" />
    </div>
  );
};

export default CustomSelectButton;
