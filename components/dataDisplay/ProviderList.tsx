import { Provider } from "../../lib/api/consumat-io";
import ProviderLabel from "./ProviderLabel";

type ProviderListProps = {
  providers: Provider[];
  className?: string;
};

function ProviderList({ providers, className }: ProviderListProps) {
  return (
    <div className={"flex flex-row " + className}>
      {providers.map((provider, index) => (
        <ProviderLabel key={index} provider={provider} />
      ))}
    </div>
  );
}

export default ProviderList;
