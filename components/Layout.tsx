import MetaData from "./MetaData";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <MetaData />
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
