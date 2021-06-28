import { Provider } from "../../lib/api/consumat-io";

type ProviderLabelProps = {
  provider: Provider;
};

function ProviderLabel({ provider }: ProviderLabelProps) {
  return (
    <div className="flex items-center justify-center mr-1 py-1 px-2 bg-gray-200 dark:bg-gray-800 text-white text-sm font-bold rounded shadow">
      {provider.name === "Netflix" ? (
        <img src="/images/netflix.png" className="h-6" />
      ) : provider.name === "Amazon Prime Video" ? (
        <img src="/images/prime-video.png" className="h-6" />
      ) : provider.name === "Disney Plus" ? (
        <img src="/images/disney-plus.png" className="h-6" />
      ) : (
        <div>{provider.name}</div>
      )}
    </div>
  );
}

export default ProviderLabel;
