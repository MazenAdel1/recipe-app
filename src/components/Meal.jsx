import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clear, fetchMeals } from "../rtk/slices/meals-data-slice";

function Meal() {
  let { mealId } = useParams();

  const dispatch = useDispatch();

  const mealsData = useSelector((state) => state.mealsData);

  useEffect(() => {
    dispatch(clear());
    dispatch(
      fetchMeals(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      ),
    );
  }, [mealId]);

  const ingredientsFn = () => {
    if (mealsData.meals) {
      let list = [];
      for (let i = 1; i <= 20; i++) {
        if (
          mealsData.meals[0][`strIngredient${i}`] !== "" &&
          mealsData.meals[0][`strIngredient${i}`] !== " " &&
          mealsData.meals[0][`strIngredient${i}`]
        )
          list.push({
            ingredient: mealsData.meals[0][`strIngredient${i}`],
            measure: mealsData.meals[0][`strMeasure${i}`],
          });
      }

      return list;
    }
  };

  return (
    <>
      {mealsData.meals && (
        <div className="flex flex-col justify-between gap-10 pt-10 sm:gap-5 md:flex-row-reverse lg:gap-20">
          <div className="flex flex-1 flex-col sm:mt-14">
            <div className="mx-auto flex aspect-square w-4/5 justify-center rounded-md border-2 border-white shadow-xl">
              <img
                src={mealsData.meals[0].strMealThumb}
                alt={mealsData.meals[0].strMeal}
                className="w-full rounded-md"
              />
            </div>
            <div className="flex flex-col pt-3 text-center text-white">
              <h1 className="font-bold tracking-wide">
                {mealsData.meals[0].strMeal}
              </h1>
              <div>
                <span>
                  {mealsData.meals[0].strArea} |{" "}
                  {mealsData.meals[0].strCategory}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h3 className="w-fit  rounded-lg bg-white px-2 py-1 font-bold text-dark">
                Ingredients
              </h3>
              <ul className="grid list-inside list-disc grid-cols-2 grid-rows-5 flex-col gap-1">
                {ingredientsFn().map((el, index) => (
                  <li
                    key={index + 1}
                    className="bg-orange-500 px-2 py-1 font-semibold text-black"
                  >
                    {el.ingredient} : {el.measure}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center gap-2 pt-3 md:items-start">
              <h3 className="w-fit rounded-lg bg-white px-2 py-1 font-bold text-dark">
                Instructions
              </h3>
              <p className="text-center text-white md:text-start">
                {mealsData.meals[0].strInstructions}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Meal;
