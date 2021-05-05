import { ReactNode } from "react";
import MetaData from "./MetaData";
import Navbar from "./navigation/Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <MetaData />
      <Navbar />
      <div className="flex items justify-center">
        <div className="w-full max-w-screen-xl">{children}</div>
      </div>
    </>
  );
};

export default Layout;
