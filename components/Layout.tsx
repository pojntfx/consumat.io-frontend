import { ReactNode } from "react";
import MetaData from "./MetaData";
import Navbar from "./navigation/Navbar";

type LayoutProps = {
  children: ReactNode;
  defaultLayout: String;
};

const Layout = ({ children, defaultLayout }: LayoutProps) => {
  return (
    <>
      <MetaData />
      <Navbar />
      <div className="flex items justify-center">
        <div
          className={
            defaultLayout == "default" ? "w-full max-w-screen-xl" : "w-full"
          }
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
