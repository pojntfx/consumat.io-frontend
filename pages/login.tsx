import { signIn, useSession } from "next-auth/client";

const Login = () => {
  const [session] = useSession();

  if (!session)
    return (
      <div className="h-auto flex flex-col self-center items-center justify-center">
        <h1>CONSUMAT.IO</h1>
        <h2>Track, plan and enjoy content.</h2>
        <button onClick={() => signIn(null, { callbackUrl: "/" })}>
          SIGN IN
        </button>
      </div>
    );

  return null;
};

export default Login;
