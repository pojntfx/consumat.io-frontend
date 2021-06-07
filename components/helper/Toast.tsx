import { XIcon } from "@heroicons/react/outline";
import { ToastContainer as ToastContainerTmpl } from "react-toastify";

export const ToastContainer = () => (
  <ToastContainerTmpl
    toastClassName={() =>
      "bg-gray-600 relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
    }
    bodyClassName={() => "text-sm font-white font-med block w-full"}
    position="bottom-right"
    autoClose={false}
    closeButton={({ closeToast }) => (
      <button
        className="px-4 py-2 rounded-r border-solid border-l-2 border-gray-200 duration-75"
        onClick={closeToast}
      >
        <XIcon className="w-4" />
      </button>
    )}
  />
);
