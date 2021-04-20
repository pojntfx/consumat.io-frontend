import { ReactNode } from "react";
import MetaData from "./MetaData";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <MetaData />
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
