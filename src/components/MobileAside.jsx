import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleAsideStatus } from "../rtk/slices/aside-slice";

function MobileAside() {
  const [categories, setCategories] = useState([]);
  const aside = useSelector((state) => state.aside);
  const mobileAsideRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);

  const togglingAside = () => {
    if (mobileAsideRef.current !== undefined) {
      if (!aside) {
        mobileAsideRef.current.classList.add(`hidden`);
      } else {
        mobileAsideRef.current.classList.remove(`hidden`);
      }
    }
  };

  togglingAside();

  const toggleBodyOverflow = () => {
    dispatch(toggleAsideStatus());
    document.body.classList.toggle(`overflow-y-hidden`);
  };

  return (
    <>
      <aside
        ref={mobileAsideRef}
        className="absolute left-0 top-0 z-50 h-screen w-full overflow-auto bg-black bg-opacity-90 transition-all md:hidden"
      >
        <button className="p-5" onClick={() => toggleBodyOverflow()}>
          <FontAwesomeIcon icon={faX} className="text-xl text-white" />
        </button>
        <div className="flex flex-col gap-3 pb-2 text-center">
          <span className="relative bg-white py-2 text-center font-semibold text-black ">
            Categories
          </span>
          <ul>
            <li>
              <Link
                to={`/`}
                className="mb-2 block w-full bg-mid-blue px-2 py-1 font-bold text-white transition hover:bg-transparent"
              >
                Home
              </Link>
            </li>
            {categories.map((category) => {
              if (category.strCategory != "Pork") {
                return (
                  <li key={`category-${category.idCategory}`}>
                    <Link
                      to={category.strCategory}
                      className="block w-full px-2 py-1 text-lg text-white transition hover:bg-light-blue "
                    >
                      {category.strCategory}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default MobileAside;
