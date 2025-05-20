// import { useState } from "react";
// import { Link } from "react-router-dom";
// import useOutsideClick from "../../../hooks/useOutsideClick";
// import { Category } from "../../../types/common";
// import classes from "./Menu.module.css";

// interface IMenuProps {
//   categories: Category[];
// }

// const Menu: React.FC<IMenuProps> = ({ categories }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const openMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const ref = useOutsideClick<HTMLDivElement>(closeMenu);

//   return (
//     <div className={classes.menu} ref={ref}>
//       <button onClick={openMenu} className={classes.button}>
//         <svg
//           className={`ham hamRotate ham1 ${isMenuOpen ? "active" : ""}`}
//           viewBox="0 0 100 100"
//           width="35"
//         >
//           <path
//             className="line top"
//             d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902
//             0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914
//             -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
//           />
//           <path className="line middle" d="m 30,50 h 40" />
//           <path
//             className="line bottom"
//             d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785
//             15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118
//             -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427
//             -18.435284,17.125656 l 0.252538,40"
//           />
//         </svg>
//         Каталог товаров
//       </button>
//       {isMenuOpen && (
//         <nav className={classes.nav}>
//           <ul className={classes["menu-list"]}>
//             {categories.map((category) => (
//               <li key={category.id} className={classes["menu-list-item"]}>
//                 <Link
//                   to={category.url}
//                   onClick={closeMenu}
//                   className={classes.link}
//                 >
//                   {category.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default Menu;
import { useState } from "react";
import { Link } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { Category } from "../../../types/common";
import classes from "./Menu.module.css";

interface IMenuProps {
  categories: Category[];
}

const Menu: React.FC<IMenuProps> = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const ref = useOutsideClick<HTMLDivElement>(closeMenu);

  return (
    <div className={classes.menu} ref={ref}>
      <button onClick={toggleMenu} className={classes.button}>
        <svg
          className={`ham hamRotate ham1 ${isMenuOpen ? "active" : ""}`}
          viewBox="0 0 100 100"
          width="35"
        >
          <path
            className="line top"
            d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902
            0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914
            -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
          />
          <path className="line middle" d="m 30,50 h 40" />
          <path
            className="line bottom"
            d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785
            15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118
            -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427
            -18.435284,17.125656 l 0.252538,40"
          />
        </svg>
        Каталог товаров
      </button>
      <nav className={`${classes.nav} ${isMenuOpen ? classes.open : ""}`}>
        <button className={classes.closeButton} onClick={closeMenu}>
          <svg
            className={`ham hamRotate ham1 active ${classes.closeIcon}`}
            viewBox="0 0 100 100"
            width="35"
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902
              0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914
              -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className="line bottom"
              d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785
              15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118
              -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427
              -18.435284,17.125656 l 0.252538,40"
            />
          </svg>
        </button>
        <ul className={classes["menu-list"]}>
          {categories.map((category) => (
            <li key={category.id} className={classes["menu-list-item"]}>
              <Link
                to={category.url}
                onClick={closeMenu}
                className={classes.link}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
