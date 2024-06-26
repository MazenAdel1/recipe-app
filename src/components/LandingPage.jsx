import Card from "./Card";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillNewData } from "../rtk/slices/meals-data-slice";
import SkeletonCard from "./SkeletonCard";

function LandingPage() {
  const pageContent = useRef();
  const aside = useSelector((state) => state.aside);
  const [currentMeals, setCurrentMeals] = useState([]);

  const mealsData = useSelector((state) => state.mealsData);
  const dispatch = useDispatch();

  const toggleMargin = () => {
    if (aside) {
      if (pageContent.current) {
        pageContent.current.className = `grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      }
    } else {
      if (pageContent.current) {
        pageContent.current.className = `grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
      }
    }
  };

  toggleMargin();

  async function fetchData() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`,
    );
    const data = await response.json();

    if (data.meals[0].strCategory !== "Pork") {
      if (!currentMeals.some((meal) => meal.idMeal === data.meals[0].idMeal)) {
        setCurrentMeals((prev) => [...prev, data.meals[0]]);
      }
    }
  }

  useEffect(() => {
    if (currentMeals.length <= 8) {
      fetchData();
      dispatch(fillNewData({ meals: currentMeals }));
    }
  }, [currentMeals]);

  return (
    <>
      <div
        ref={pageContent}
        className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {mealsData.meals && mealsData.meals.length >= 8
          ? mealsData.meals.map((meal) => {
              return (
                <Card
                  meal={meal}
                  mealCategory={meal.strCategory}
                  key={meal.idMeal}
                />
              );
            })
          : [...Array(8)].map((_, index) => <SkeletonCard key={index} />)}
      </div>
    </>
  );
}

export default LandingPage;
