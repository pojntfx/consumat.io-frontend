import { ChevronDownIcon } from "@heroicons/react/outline";

type SelectButtonProps = {
  name: string;
  options: string[];
  className?: string;
};

const SelectButton = ({ name, options, className }: SelectButtonProps) => {
  return (
    <div
      className={
        className + " relative flex rounded border border-gray-800 bg-white"
      }
    >
      <select
        name={name}
        id={name}
        className="text-sm leading-6 font-medium bg-transparent z-10 pl-2 pr-6"
      >
        {options.map((option) => (
          <option key={option} value={option} className="font-medium">
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute z-0 right-1 h-6 w-4" />
    </div>
  );
};

export default SelectButton;
