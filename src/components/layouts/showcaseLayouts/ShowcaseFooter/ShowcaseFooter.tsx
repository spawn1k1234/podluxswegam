// import classes from "./ShowcaseFooter.module.css";

// const ShowcaseFooter: React.FC = () => {
//   return (
//     <footer className={classes.footer}>
//       © 2022 React e-commerce store by David Rizametov
//     </footer>
//   );
// };

// export default ShowcaseFooter;
import { useEffect, useRef, useState } from "react";
import classes from "./ShowcaseFooter.module.css";
import { PATHS } from "../../../../constants/routes";
import FavoriteIcon from "../../../UI/icons/FavoriteIcon/FavoriteIcon";
import CartIcon from "../../../UI/icons/CartIcon/CartIcon";
import Badge from "../../../UI/Badge/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Link } from "react-router-dom";

const ShowcaseFooter = () => {
  const { wishlist, cart } = useSelector((state: RootState) => state.user);
  const footerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDraggingUp, setIsDraggingUp] = useState(false);
  const totalProductsQuantityInCart = cart.reduce(
    (res, val) => res + val.quantity,
    0
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Определяем направление скролла
      if (currentScrollY < lastScrollY) {
        // Пользователь тянет вверх
        setIsDraggingUp(true);
        setIsScrolled(false);

        // Сбрасываем таймер при каждом движении вверх
        clearTimeout(timer);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Пользователь скроллит вниз и прошел порог в 50px
        setIsDraggingUp(false);
        setIsScrolled(true);
      }

      // Если пользователь не тянет вверх и не в самом верху
      if (!isDraggingUp && currentScrollY > 50) {
        setIsScrolled(true);
      }

      // Если пользователь в самом верху
      if (currentScrollY <= 50) {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollY, isDraggingUp]);

  return (
    <footer
      ref={footerRef}
      className={`${classes.bottomNav} ${isScrolled ? classes.scrolled : ""}`}
    >
      {/* Остальной код остаётся без изменений */}
      <Link to={PATHS.showcase} className={classes.navButton}>
        <span className={classes.icon}>
          <span className="material-symbols-outlined">barcode_scanner</span>
        </span>
        <span className={classes.label}>Главная</span>
        <div className={classes.line} />
      </Link>

      <div className={classes.navButton}>
        <Badge
          icon={
            <span
              className="material-symbols-outlined"
              style={{ color: "white" }}
            >
              favorite
            </span>
          }
          to={PATHS.wishlist}
          count={wishlist?.length}
        />
        <span className={classes.label}>Избранное</span>
        <div className={classes.line} />
      </div>
      <div className={classes.navButton}>
        <Badge
          icon={
            <span
              className="material-symbols-outlined"
              style={{ color: "white" }}
            >
              shopping_cart
            </span>
          }
          to={PATHS.cart}
          count={totalProductsQuantityInCart}
        />
        <span className={classes.label}>Корзина</span>
        <div className={classes.line} />
      </div>

      <Link to={PATHS.private} className={classes.navButton}>
        <span className={classes.icon}>
          <span className="material-symbols-outlined">policy</span>
        </span>
        <span className={classes.label}>Приват</span>
        <div className={classes.line} />
      </Link>

      <Link to={PATHS.profile} className={classes.navButton}>
        <span className={classes.icon}>
          <span className="material-symbols-outlined">manage_accounts</span>
        </span>
        <span className={classes.label}>Профиль</span>
        <div className={classes.line} />
      </Link>
    </footer>
  );
};

export default ShowcaseFooter;
// import classes from "./ShowcaseFooter.module.css";
// import { PATHS } from "../../../../constants/routes";
// import FavoriteIcon from "../../../UI/icons/FavoriteIcon/FavoriteIcon";
// import CartIcon from "../../../UI/icons/CartIcon/CartIcon";
// import Badge from "../../../UI/Badge/Badge";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../store/store";
// import { Link } from "react-router-dom";

// interface ShowcaseFooterProps {}

// const ShowcaseFooter: React.FC<ShowcaseFooterProps> = () => {
//   const { wishlist, cart } = useSelector((state: RootState) => state.user);
//   const totalProductsQuantityInCart = cart.reduce(
//     (res, val) => res + val.quantity,
//     0
//   );

//   return (
//     <footer className={classes.bottomNav}>
//       <Link to={PATHS.showcase} className={classes.navButton}>
//         <span className={classes.icon}>
//           <span className="material-symbols-outlined">barcode_scanner</span>
//         </span>

//         <span>Главная</span>
//       </Link>

//       <div className={classes.navButton}>
//         <Badge
//           icon={<FavoriteIcon width={20} height={20} />}
//           to={PATHS.wishlist}
//           count={wishlist?.length}
//         />
//         <span>Избранное</span>
//       </div>

//       <div className={classes.navButton} style={{ color: "black" }}>
//         <Badge
//           icon={<CartIcon width={20} height={20} />}
//           to={PATHS.cart}
//           count={totalProductsQuantityInCart}
//         />
//         <span>Корзина</span>
//       </div>

//       <Link to={PATHS.admin} className={classes.navButton}>
//         <span className={classes.icon}>
//           <span className="material-symbols-outlined">policy</span>
//         </span>

//         <span>Приват</span>
//       </Link>

//       <Link to={PATHS.orders} className={classes.navButton}>
//         <span className={classes.icon}>
//           <span className="material-symbols-outlined">manage_accounts</span>
//         </span>

//         <span>Профиль</span>
//       </Link>
//     </footer>
//   );
// };

// export default ShowcaseFooter;
