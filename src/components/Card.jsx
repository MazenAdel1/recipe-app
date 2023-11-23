import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItem,
  deleteItem,
  saveToLocalStorage,
} from "../rtk/slices/favorite-list-slice";

function Card({ meal, mealCategory }) {
  const addToFavBtn = useRef();

  const addToFav = () => {
    addToFavBtn.current.classList.toggle(`text-red-500`);
  };

  useEffect(() => {
    favoriteList.map((el) => {
      el.idMeal == meal.idMeal &&
        addToFavBtn.current.classList.add(`text-red-500`);
    });
  }, []);

  const favoriteList = useSelector((state) => state.favoriteList);
  const dispatch = useDispatch();

  const toggleListItem = () => {
    if (addToFavBtn.current.classList.contains(`text-red-500`)) {
      dispatch(addItem(meal));
      dispatch(saveToLocalStorage());
    } else {
      dispatch(deleteItem(meal));
      dispatch(saveToLocalStorage());
    }
  };

  return (
    <>
      <div className="flex w-full flex-col overflow-hidden">
        <Link to={`/meal/${meal.idMeal}`} className="w-full">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-52 w-full rounded-t object-cover transition-all hover:scale-110"
          />
        </Link>
        <div className="z-10 flex items-center justify-between gap-3 rounded-b bg-dark-blue p-3 text-white">
          <div className="flex w-full flex-col gap-1 overflow-hidden text-ellipsis">
            <Link
              to={`/meal/${meal.idMeal}`}
              className="block w-full truncate font-bold tracking-wider"
            >
              {meal.strMeal}
            </Link>
            <Link
              to={`/${mealCategory}`}
              className="w-fit font-light tracking-wider"
            >
              {mealCategory}
            </Link>
          </div>
          <button onClick={toggleListItem}>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={addToFav}
              ref={addToFavBtn}
              className={`transition`}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
