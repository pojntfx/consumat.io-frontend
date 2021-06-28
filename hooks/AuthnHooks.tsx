import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Language } from "../types/language";
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
    if (session) {
      updateLanguage({
        variables: {
          language: data?.user.language
            ? data?.user.language
            : "" + navigator.language,
        },
      });
    }
  }, [session, loading]);

  return [session, loading];
}
