import { signIn, useSession } from "next-auth/client";

const Login = () => {
  const [session] = useSession();

  if (!session)
    return (
      <button
        className="px-4 py-2 rounded-r border-solid border-l-2 border-gray-200 duration-75"
        onClick={() => signIn(null, { callbackUrl: "/" })}
      >
        Login
      </button>
    );

  return null;
};

export default Login;
