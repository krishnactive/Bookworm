import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import Freecourse from "../components/Freecourse";
import Toggle from "../components/Toggle";

function Home() {
  const [showFreeBooks, setShowFreeBooks] = React.useState(true);

  const handleToggle = () => {
    setShowFreeBooks(!showFreeBooks);
  };

  return (
    <>
      <Navbar />
      
      <Banner />
      <div className="pt-1 min-h-screen">
      <Toggle showFreeBooks={showFreeBooks} handleToggle={handleToggle} />
      {showFreeBooks ? <Freebook /> : <Freecourse />}
      </div>
      <Footer />
    </>
  );
}

export default Home;
