import Aside from "./components/Aside";

import { useEffect } from "react";
import MainPage from "./components/MainPage";
import MobileAside from "./components/MobileAside";

function App() {
  useEffect(() => {
    document.body.className = `bg-dark sm:overflow-y-auto`;
  }, []);

  return (
    <>
      <Aside />
      <MobileAside />
      <MainPage />
    </>
  );
}

export default App;
