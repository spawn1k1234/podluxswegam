// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   ADD_TO_WISHLIST,
//   REMOVE_FROM_WISHLIST,
// } from "../../../../constants/messages";
// import { AppDispatch, RootState } from "../../../../store/store";
// import { wishListHandler } from "../../../../store/UserSlice";
// import { CartItem, Product } from "../../../../types/common";
// import Section from "../../../layouts/showcaseLayouts/Section/Section";
// import SectionBody from "../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody";
// import AddToCartBtn from "../../../showcase/AddToCartBtn/AddToCartBtn";
// import Chip from "../../../UI/Chip/Chip";
// import IconButton from "../../../UI/IconButton/IconButton";
// import FavoriteIcon from "../../../UI/icons/FavoriteIcon/FavoriteIcon";
// import NotFound from "../NotFound/NotFound";
// import InfoBlock from "./InfoBlock/InfoBlock";
// import classes from "./ProductPage.module.css";

// interface IProductPageProps {}

// const ProductPage: React.FC<IProductPageProps> = () => {
//   const { id: productId } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const { products } = useSelector((state: RootState) => state.product);
//   const { wishlist } = useSelector((state: RootState) => state.user);
//   const product = products.find(
//     (product) => product.id === productId
//   ) as Product;

//   if (!product) {
//     return <NotFound />;
//   }

//   const {
//     id,
//     name,
//     description,
//     image,
//     brand,
//     price,
//     weight,
//     discount,
//     gender,
//   } = product;
//   const chipText =
//     gender.url === "male"
//       ? "Мужская коллекция"
//       : gender.url === "female"
//       ? "Женская коллекция"
//       : "Унисекс";
//   const isWished = wishlist.includes(id);

//   const cartItem: CartItem = {
//     productId: id,
//     name,
//     quantity: 1,
//     price,
//     totalPrice: price,
//     weight,
//     totalWeight: weight,
//     discountedPrice: discount?.discountedPrice,
//     discount: discount?.percent,
//   };

//   return (
//     <Section>
//       <>
//         <SectionBody>
//           <>
//             <div className={classes["product-page"]}>
//               <div className={classes["image-wrapper"]}>
//                 {/* <img src={image} alt={name} className={classes.image} /> */}
//                 {image && image.includes(",") ? (
//                   image
//                     .split(",")
//                     .map((url, i) => (
//                       <img
//                         key={i}
//                         src={url.trim()}
//                         alt={`${name} ${i + 1}`}
//                         className={classes.image}
//                       />
//                     ))
//                 ) : (
//                   <img src={image} alt={name} className={classes.image} />
//                 )}
//               </div>
//               <div className={classes["content-wrapper"]}>
//                 <div className={classes["title-wrapper"]}>
//                   <h1 className={classes.title}>{name}</h1>
//                   <div className={classes["chip-wrapper"]}>
//                     <Chip text={brand.name} mode={"plain"} />
//                     <Chip text={chipText} mode={"plain"} />
//                   </div>
//                 </div>

//                 <div className={classes["price-wrapper"]}>
//                   {discount ? (
//                     <span className={`${classes.price}`}>
//                       <span className={classes.price}>
//                         {discount.discountedPrice} ₽
//                       </span>
//                       <span className={classes["old-price"]}>{price} ₽</span>
//                       <Chip
//                         text={"-" + discount.percent + "%"}
//                         mode={"attention"}
//                       />
//                     </span>
//                   ) : (
//                     <span className={classes.price}>{price} ₽</span>
//                   )}

//                   <IconButton
//                     onClick={() => dispatch(wishListHandler({ id, isWished }))}
//                     column
//                   >
//                     <>
//                       <FavoriteIcon filled={isWished} />
//                       <span className={classes["wishlist-text"]}>
//                         {isWished ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}
//                       </span>
//                     </>
//                   </IconButton>
//                 </div>

//                 <div className={classes.actions}>
//                   <AddToCartBtn product={cartItem} />
//                 </div>

//                 {description && (
//                   <div className={classes.description}>
//                     <p className={classes.subtitle}>О товаре</p>
//                     <p className={classes.text}>{description}</p>
//                   </div>
//                 )}

//                 <InfoBlock />
//               </div>
//             </div>
//           </>
//         </SectionBody>
//       </>
//     </Section>
//   );
// };

// export default ProductPage;
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../../../../constants/messages";
import { AppDispatch, RootState } from "../../../../store/store";
import { wishListHandler } from "../../../../store/UserSlice";
import { CartItem, Product } from "../../../../types/common";
import Section from "../../../layouts/showcaseLayouts/Section/Section";
import SectionBody from "../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody";
import AddToCartBtn from "../../../showcase/AddToCartBtn/AddToCartBtn";
import Chip from "../../../UI/Chip/Chip";
import IconButton from "../../../UI/IconButton/IconButton";
import FavoriteIcon from "../../../UI/icons/FavoriteIcon/FavoriteIcon";
import NotFound from "../NotFound/NotFound";
import InfoBlock from "./InfoBlock/InfoBlock";
import classes from "./ProductPage.module.css";
import { useState, useRef, useEffect } from "react";

interface IProductPageProps {}

const ProductPage: React.FC<IProductPageProps> = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const { wishlist } = useSelector((state: RootState) => state.user);

  // Переносим все хуки перед условными операторами
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const product = products.find(
    (product) => product.id === productId
  ) as Product;

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  if (!product) {
    return <NotFound />;
  }

  const {
    id,
    name,
    description,
    image,
    brand,
    price,
    weight,
    discount,
    gender,
  } = product;
  const chipText =
    gender.url === "male"
      ? "Мужская коллекция"
      : gender.url === "female"
      ? "Женская коллекция"
      : "Унисекс";
  const isWished = wishlist.includes(id);

  const cartItem: CartItem = {
    productId: id,
    name,
    quantity: 1,
    price,
    totalPrice: price,
    weight,
    totalWeight: weight,
    discountedPrice: discount?.discountedPrice,
    discount: discount?.percent,
  };

  const images = image.includes(",")
    ? image.split(",").map((url) => url.trim())
    : [image];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  return (
    <Section>
      <>
        <SectionBody>
          <>
            <div className={classes["product-page"]}>
              <div className={classes["slider-container"]}>
                <div
                  className={classes["slider-track"]}
                  ref={sliderRef}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {images.map((url, i) => (
                    <div key={i} className={classes["slide"]}>
                      <img
                        src={url}
                        alt={`${name} ${i + 1}`}
                        className={classes.image}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes["slider-dots"]}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`${classes.dot} ${
                        i === currentSlide ? classes.active : ""
                      }`}
                      onClick={() => goToSlide(i)}
                    />
                  ))}
                </div>
              </div>

              <div className={classes["content-wrapper"]}>
                <div className={classes["title-wrapper"]}>
                  <h1 className={classes.title}>{name}</h1>
                  <div className={classes["chip-wrapper"]}>
                    <Chip text={brand.name} mode={"plain"} />
                    <Chip text={chipText} mode={"plain"} />
                  </div>
                </div>

                <div className={classes["price-wrapper"]}>
                  {discount ? (
                    <span className={`${classes.price}`}>
                      <span className={classes.price}>
                        {discount.discountedPrice} ₽
                      </span>
                      <span className={classes["old-price"]}>{price} ₽</span>
                      <Chip
                        text={"-" + discount.percent + "%"}
                        mode={"attention"}
                      />
                    </span>
                  ) : (
                    <span className={classes.price}>{price} ₽</span>
                  )}

                  <IconButton
                    onClick={() => dispatch(wishListHandler({ id, isWished }))}
                    column
                  >
                    <>
                      <FavoriteIcon filled={isWished} />
                      <span className={classes["wishlist-text"]}>
                        {isWished ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}
                      </span>
                    </>
                  </IconButton>
                </div>

                <div className={classes.actions}>
                  <AddToCartBtn product={cartItem} />
                </div>

                {description && (
                  <div className={classes.description}>
                    <p className={classes.subtitle}>О товаре</p>
                    <p className={classes.text}>{description}</p>
                  </div>
                )}

                <InfoBlock />
              </div>
            </div>
          </>
        </SectionBody>
      </>
    </Section>
  );
};

export default ProductPage;
