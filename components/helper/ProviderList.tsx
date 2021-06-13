import React from "react";
import { Provider } from "../../lib/api/consumat-io";
import ProviderTag from "./ProviderTag";

type ProviderListProps = {
  providers: Provider[];
  className?: string;
};

function ProviderList({ providers, className }: ProviderListProps) {
  return (
    <div className={"flex flex-row " + className}>
      {providers.map((provider) => (
        <ProviderTag provider={provider} />
      ))}
    </div>
  );
}

export default ProviderList;
