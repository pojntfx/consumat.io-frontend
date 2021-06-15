import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage = ({
  message = "Oops! Something went wrong. (≧Д≦)",
}: ErrorMessageProps) => {
  const [shouldBeDisplayed, setShouldBeDisplayed] = useState(true);

  return (
    shouldBeDisplayed && (
      <div className="flex justify-between bg-red-500 my-2 p-2 rounded shadow hover:shadow-md">
        <div className="flex justify-center items-center text-gray-50 font-semibold">
          <ExclamationCircleIcon className="h-6 w-6" />
          <p className="ml-2">{message}</p>
        </div>
        <button
          className="h-6 w-6 bg-transparent shadow-none hover:shadow-none text-gray-50"
          onClick={() => setShouldBeDisplayed(false)}
        >
          <XIcon />
        </button>
      </div>
    )
  );
};

export default ErrorMessage;
