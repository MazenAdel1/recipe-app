import { useRef } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MealsPage from "./MealsPage";
import CategoryPage from "./CategoryPage";
import Meal from "./Meal";

function MainPage() {
  const aside = useSelector((state) => state.aside);
  const mainPage = useRef();

  const toggleMargin = () => {
    if (mainPage.current) {
      if (aside) {
        mainPage.current.className = `px-3 lg:px-10 py-5 transition-all lg:px-20 md:ml-[250px]`;
      } else {
        mainPage.current.className = `px-3 md:px-10 py-5 transition-all lg:px-20`;
      }
    }
  };

  toggleMargin();

  return (
    <>
      <div ref={mainPage} className="px-3 py-5 md:px-10 lg:px-20">
        <Header />
        <Routes>
          <Route path="/" element={<MealsPage />} />
          <Route path=":categoryName" element={<CategoryPage />} />
          <Route path="meal/:mealId" element={<Meal />} />
        </Routes>
      </div>
    </>
  );
}

export default MainPage;
