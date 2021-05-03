import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAuthorization() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/login");
    }
  }, [session, loading]);

  return [session, loading];
}
