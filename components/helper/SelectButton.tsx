import { ChevronDownIcon } from "@heroicons/react/outline";

type SelectButtonProps = {
  name: string;
  options: string[];
  className?: string;
};

const SelectButton = ({ name, options, className }: SelectButtonProps) => {
  return (
    <div className={className + " button relative flex"}>
      <select
        name={name}
        id={name}
        className="text-sm font-medium bg-transparent z-10 pl-2 pr-6 py-1"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="font-medium dark:bg-gray-800"
          >
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute z-0 right-1 h-5 w-4 my-1" />
    </div>
  );
};

export default SelectButton;
