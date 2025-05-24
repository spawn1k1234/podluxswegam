// import Badge from "../../../UI/Badge/Badge";
// import CartIcon from "../../../UI/icons/CartIcon/CartIcon";
// import FavoriteIcon from "../../../UI/icons/FavoriteIcon/FavoriteIcon";
// import classes from "./ShowcaseHeader.module.css";
// import Logo from "../../../../assets/logo.png";
// import { PATHS } from "../../../../constants/routes";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../store/store";
// import Menu from "../../../showcase/Menu/Menu";
// import { Link } from "react-router-dom";

// interface IShowcaseHeaderProps {}

// const ShowcaseHeader: React.FC<IShowcaseHeaderProps> = () => {
//   const categories = useSelector(
//     (state: RootState) => state.category.categories
//   );
//   const { wishlist, cart } = useSelector((state: RootState) => state.user);
//   const totalProductsQuantityInCart = cart.reduce(
//     (res, val) => res + val.quantity,
//     0
//   );

//   return (
//     <header className={classes.header}>
//       {/* Видео в качестве фона */}
//       <Link to={PATHS.showcase}>
//         <video
//           className={classes.backgroundVideo}
//           autoPlay
//           muted
//           loop
//           playsInline
//         >
//           <source
//             src={require("../../../../assets/TensorPix - 1466fon.mp4")}
//             type="video/mp4"
//           />
//         </video>
//       </Link>

//       <div className={classes["wrapper"]}>
//         {/* <Link to={PATHS.showcase}>
//           <img src={Logo} alt="Logo" className={classes.logo} />
//         </Link> */}

//         <div className={classes["actions-wrapper"]}>
//           <Menu categories={categories} />

//           <div className={classes["badge-wrapper"]}>
//             <Badge
//               icon={
//                 <span
//                   className="material-symbols-outlined"
//                   style={{ color: "white" }}
//                 >
//                   favorite
//                 </span>
//               }
//               to={PATHS.wishlist}
//               count={wishlist?.length}
//               title={"Избранное"}
//             />

//             <Badge
//               icon={
//                 <span
//                   className="material-symbols-outlined"
//                   style={{ color: "white" }}
//                 >
//                   shopping_cart
//                 </span>
//               }
//               to={PATHS.cart}
//               count={totalProductsQuantityInCart}
//               title={"Корзина"}
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default ShowcaseHeader;
import React, { useState } from "react";
import Badge from "../../../UI/Badge/Badge";
import { PATHS } from "../../../../constants/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Menu from "../../../showcase/Menu/Menu";
import { Link } from "react-router-dom";
import classes from "./ShowcaseHeader.module.css";

const ShowcaseHeader: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const { wishlist, cart } = useSelector((state: RootState) => state.user);
  const totalProductsQuantityInCart = cart.reduce(
    (res, val) => res + val.quantity,
    0
  );

  // Функция для обработки события загрузки видео
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <header className={classes.header}>
      {/* Видео в качестве фона */}
      <Link to={PATHS.showcase}>
        <video
          className={`${classes.backgroundVideo} ${
            videoLoaded ? classes.loaded : ""
          }`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={handleVideoLoaded} // Используем событие onCanPlayThrough
        >
          <source
            src={require("../../../../assets/TensorPix - 1466fon.mp4")}
            type="video/mp4"
          />
        </video>
      </Link>

      <div className={classes["wrapper"]}>
        <div className={classes["actions-wrapper"]}>
          <Menu categories={categories} />

          <div className={classes["badge-wrapper"]}>
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
              title={"Избранное"}
            />

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
              title={"Корзина"}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShowcaseHeader;
