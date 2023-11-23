import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { clear, fetchMeals } from "../rtk/slices/meals-data-slice";

function CategoryPage() {
  let { categoryName } = useParams();

  const pageContent = useRef();
  const aside = useSelector((state) => state.aside);
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

  useEffect(() => {
    dispatch(clear());
    dispatch(
      fetchMeals(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      ),
    );
  }, [categoryName]);

  return (
    <>
      {
        <div
          ref={pageContent}
          className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {mealsData.meals !== null &&
          mealsData.meals !== undefined &&
          mealsData.meals.length > 0 ? (
            mealsData.meals.map((meal) => {
              return (
                <Card
                  meal={meal}
                  mealCategory={categoryName}
                  key={meal.idMeal}
                />
              );
            })
          ) : (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="animate-spin text-center text-4xl text-white"
              />
            </div>
          )}
        </div>
      }
    </>
  );
}

export default CategoryPage;
