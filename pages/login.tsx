import { signIn, useSession } from "next-auth/client";

const Login = () => {
  const [session] = useSession();

  if (!session) return <div></div>;

  return null;
};

export default Login;
