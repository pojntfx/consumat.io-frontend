import React from "react";
import { Provider } from "../../lib/api/consumat-io";

type ProviderTagProps = {
  provider: Provider;
};

function ProviderTag({ provider }: ProviderTagProps) {
  return (
    <div className="rounded bg-gray-200 p-0.5 mr-1">
      {provider.name === "Netflix" ? (
        <img src="/images/netflix.png" className="h-6" />
      ) : provider.name === "Amazon Prime Video" ? (
        <img src="/images/prime-video.png" className="h-6" />
      ) : provider.name === "Disney Plus" ? (
        <img src="/images/disney-plus.png" className="h-6" />
      ) : (
        <div className="my-0.5 mx-1 text-sm font-semibold text-gray-500">
          {provider.name}
        </div>
      )}
    </div>
  );
}

export default ProviderTag;
