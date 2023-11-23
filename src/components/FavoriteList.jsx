import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearList,
  deleteItem,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../rtk/slices/favorite-list-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function FavoriteList({ status }) {
  const favoriteList = useSelector((state) => state.favoriteList);

  const favoriteListRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFromLocalStorage());
  }, []);

  return (
    <>
      {status && (
        <div className="absolute right-0 top-10 z-30 flex max-h-[calc(100dvh-62px)] w-[300px] flex-col gap-2 overflow-auto rounded-md bg-gray-900 text-white">
          {favoriteList.length ? (
            <>
              <button
                className="w-full bg-red-700 py-2 font-bold text-white transition hover:bg-red-800"
                onClick={() => {
                  dispatch(clearList());
                  dispatch(saveToLocalStorage());
                }}
              >
                Clear All
              </button>
              {favoriteList.map((meal, index) => (
                <div key={meal.idMeal} className="flex" ref={favoriteListRef}>
                  <Link
                    to={`/meal/${meal.idMeal}`}
                    className="flex w-full items-center gap-3 rounded-md transition hover:bg-black"
                  >
                    <div className="basis-20">
                      <img
                        src={`${meal.strMealThumb}`}
                        alt="meal image"
                        className={`${index == 0 && "rounded-tl-md"} ${
                          index == favoriteList.length - 1 && "rounded-bl-md"
                        }`}
                      />
                    </div>
                    <div className="flex-1 truncate">
                      <h3 className="truncate font-bold">{meal.strMeal}</h3>
                      <h4 className="text-sm">{meal.strCategory}</h4>
                    </div>
                  </Link>
                  <button
                    className="px-3 transition hover:text-gray-600"
                    onClick={() => {
                      dispatch(deleteItem(meal));
                      dispatch(saveToLocalStorage());
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className="py-4 text-center">Your list is empty</div>
          )}
        </div>
      )}
    </>
  );
}
