import { ArrowUpIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useUpdate() {
  const router = useRouter();

  useEffect(() => {
    // Handle service worker updates
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any).workbox !== undefined
    ) {
      const wb = (window as any).workbox;

      const promptNewVersionAvailable = () => {
        toast(
          <div className="flex">
            <div className="flex-1 p-3">Update available!</div>

            <button
              className="px-4 py-2 rounded-r border-solid border-l-2 border-gray-200 duration-75 flex items-center"
              onClick={async () => {
                wb.addEventListener("controlling", () => {
                  setTimeout(() => {
                    router.push("/");

                    window.location.reload();
                  }, 2000);
                });

                wb.messageSW({ type: "SKIP_WAITING" });

                const registrations =
                  await navigator.serviceWorker.getRegistrations();

                await Promise.all(registrations.map((reg) => reg.unregister()));

                setTimeout(() => {
                  router.push("/");

                  window.location.reload();
                }, 2000);
              }}
            >
              <ArrowUpIcon className="w-4 mr-1" /> Upgrade
            </button>
          </div>
        );
      };

      wb.addEventListener("waiting", promptNewVersionAvailable);
      wb.addEventListener("externalwaiting", promptNewVersionAvailable);

      wb.register();
    }
  }, []);
}
