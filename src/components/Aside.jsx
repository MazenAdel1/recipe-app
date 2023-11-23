import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleAsideStatus } from "../rtk/slices/aside-slice";
import { Link } from "react-router-dom";

function Aside() {
  const [categories, setCategories] = useState([]);
  const aside = useSelector((state) => state.aside);
  const asideRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);

  const togglingAside = () => {
    if (asideRef.current !== undefined) {
      if (!aside) {
        asideRef.current.classList.add("-translate-x-[250px]");
      } else {
        asideRef.current.classList.remove("-translate-x-[250px]");
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
        ref={asideRef}
        className="fixed hidden h-screen w-[250px] -translate-x-[250px] flex-col bg-dark-blue transition-all md:flex"
      >
        <button
          className="absolute left-full top-14 -z-10 rounded-r-md bg-mid-blue p-2 text-xl text-white"
          onClick={() => toggleBodyOverflow()}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="relative mb-3 bg-white py-1 text-center font-semibold tracking-wide text-black ">
          Categories
        </span>
        <ul>
          {categories.map((category) => {
            if (category.strCategory != "Pork") {
              return (
                <li key={`category-${category.idCategory}`}>
                  <Link
                    to={category.strCategory}
                    className="block w-full px-2 py-1 text-lg tracking-wider text-white transition hover:bg-light-blue"
                  >
                    {category.strCategory}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </aside>
    </>
  );
}

export default Aside;
