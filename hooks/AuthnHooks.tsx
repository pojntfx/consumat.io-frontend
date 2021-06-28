import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetUser, useSetLanguage } from "./DataHooks";

export function useAuthorization() {
  const [session, loading] = useSession();
  const { data, loading: loadingUser, error } = useGetUser();
  const router = useRouter();
  const [updateLanguage, { data: de, loading: le, error: ee }] =
    useSetLanguage();

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/login");
    }
  }, [session, loading]);

  return [session, loading];
}
