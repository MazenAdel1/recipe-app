import { faBars, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { toggleAsideStatus } from "../rtk/slices/aside-slice";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteList from "./FavoriteList";

function Header() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [listStatus, setListStatus] = useState(false);

  const searchResultsRef = useRef();

  const toggleBodyOverflow = () => {
    dispatch(toggleAsideStatus());
    document.body.classList.toggle(`overflow-y-hidden`);
  };

  const handlingSearch = (e) => {
    setSearch(e.target.value);
    setListStatus(false);
  };

  // useEffect(() => {
  //   const fn = (e) => {
  //     if (
  //       listButtonRef.current &&
  //       e.target != listButtonRef.current &&
  //       e.target != listButtonRef.current.children[0] &&
  //       e.target != listButtonRef.current.children[0].children[0] &&
  //       listStatus
  //     ) {
  //       setListStatus(false);
  //     }
  //   };
  //   document.addEventListener(`click`, fn);

  //   return () => {
  //     document.removeEventListener(`click`, fn);
  //   };
  // });

  useEffect(() => {
    if (search !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => res.json())
        .then((data) => {
          let filteredResults = [];

          data.meals &&
            (filteredResults = data.meals.filter((meal) => {
              return meal.strCategory != "Pork";
            }));

          setSearchResults(filteredResults);
        });

      searchResultsRef.current.classList.remove(`hidden`);
    } else {
      searchResultsRef.current.classList.add(`hidden`);
    }
  }, [search]);

  return (
    <header className="flex items-center justify-between">
      <Link
        to={`/`}
        className="hidden bg-white p-1 font-bold text-black transition hover:bg-transparent hover:text-white md:block"
      >
        Home
      </Link>
      <div className="flex items-center gap-4 md:w-1/2">
        <button
          className="block md:hidden"
          onClick={() => toggleBodyOverflow()}
        >
          <FontAwesomeIcon icon={faBars} className="text-xl text-white" />
        </button>

        <div className="relative w-full">
          <input
            type="text"
            className="w-full rounded bg-dark-blue p-1 pl-2 text-white outline-none"
            placeholder="Search for a meal..."
            onChange={(e) => handlingSearch(e)}
            value={search}
          />
          <div
            className="absolute top-full z-40 mt-5 hidden max-h-[300px] w-full overflow-auto rounded-sm bg-dark-blue drop-shadow-xl"
            ref={searchResultsRef}
          >
            <ul>
              {searchResults ? (
                searchResults.map((meal) => {
                  return (
                    <li key={meal.idMeal}>
                      <Link
                        to={`/meal/${meal.idMeal}`}
                        className="block px-2 py-1 text-white transition hover:bg-gray-700"
                        onClick={() => setSearch("")}
                      >
                        {meal.strMeal}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <h2 className="py-2 text-center font-bold text-white">
                  Not Found
                </h2>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative">
        <button onClick={() => setListStatus(!listStatus)}>
          <FontAwesomeIcon icon={faHeart} className="text-xl text-red-500" />
        </button>
        <FavoriteList status={listStatus} />
      </div>
    </header>
  );
}

export default Header;
