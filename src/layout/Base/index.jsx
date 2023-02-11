import Nav from "../../components/Nav/Nav";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      {/* <custom footer /> */}
    </>
  );
};

export default BaseLayout;
