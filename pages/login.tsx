import { signIn, useSession } from "next-auth/client";

const Login = () => {
  const [session] = useSession();

  if (!session)
    return (
      <div className="h-auto flex flex-col self-center items-center justify-center">
        <h2 className="text-5xl md:text-7xl mt-48">CONSUMAT.IO</h2>
        <p className="mt-4">Track, plan and enjoy content.</p>
        <button onClick={() => signIn(null, { callbackUrl: "/" })}>
          SIGN IN
        </button>
      </div>
    );

  return null;
};

export default Login;
