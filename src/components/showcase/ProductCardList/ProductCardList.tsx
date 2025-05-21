import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { wishListHandler } from "../../../store/UserSlice";
import { Product } from "../../../types/common";
import LoadMore from "../../UI/LoadMore/LoadMore";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductCardList.module.css";

interface IProductCardListProps {
  products: Product[];
}

const PRODUCT_LIST_LIMIT = 12;

const ProductCardList: React.FC<IProductCardListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { url } = useParams();
  const { wishlist } = useSelector((state: RootState) => state.user);
  const [productsToRender, setProductsToRender] = useState<Product[]>([]);
  const [count, setCount] = useState(PRODUCT_LIST_LIMIT);
  const isLoadMoreVisible = products.length > count;
  const [sortInDescendingOrder, setSortInDescendingOrder] = useState(false);
  const [sorted, setSorted] = useState<Product[]>([]);

  const sortedProducts = products.sort((a, b) => {
    let x = a.price;
    let y = b.price;
    if (a.discount?.discountedPrice !== undefined) {
      x = a.discount?.discountedPrice;
    }

    if (b.discount?.discountedPrice !== undefined) {
      y = b.discount?.discountedPrice;
    }

    if (sortInDescendingOrder) {
      return y - x;
    }
    return x - y;
  });

  const sort = () => {
    setSorted(sortedProducts);
  };

  useEffect(() => {
    if (sorted.length > 0) {
      setProductsToRender(sortedProducts.slice(0, count));
    }
  }, [sorted, sortedProducts, sortInDescendingOrder, count]);

  useEffect(() => {
    setProductsToRender(sortedProducts.slice(0, PRODUCT_LIST_LIMIT));
    setCount(PRODUCT_LIST_LIMIT);
  }, [sortedProducts]);

  useEffect(() => {
    setSortInDescendingOrder(false);
  }, [url]);

  const handleWishlist = (id: Product["id"]) => {
    const isWished = wishlist.includes(id);
    dispatch(wishListHandler({ id, isWished }));
  };

  const showMoreHandler = (count: number) => {
    setCount(count);
    const list = sortedProducts.slice(0, count);
    setProductsToRender(list);
  };

  useEffect(() => {
    setProductsToRender(sortedProducts.slice(0, PRODUCT_LIST_LIMIT));
  }, [sortedProducts]);

  const toggleSorting = () => {
    setSortInDescendingOrder((prev) => !prev);
    sort();
  };

  return (
    <div className={classes["product-card-list"]}>
      <div className={classes["list-wrapper"]}>
        <div className={classes["sort-wrapper"]}>
          <span className={classes.sort} onClick={toggleSorting}>
            <strong>Сначала показывать:</strong>{" "}
            {sortInDescendingOrder ? "подороже" : "подешевле"}
          </span>
        </div>

        <ul className={classes.list}>
          {productsToRender.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              discount={product.discount}
              brand={product.brand}
              category={product.category}
              onWishlistClick={() => handleWishlist(product.id)}
              isAddedToWishlist={wishlist.includes(product.id)}
              id={product.id}
            />
          ))}
        </ul>
      </div>

      {isLoadMoreVisible && (
        <LoadMore
          count={count}
          itemsListLength={products.length}
          onClick={showMoreHandler}
          itemsLimit={PRODUCT_LIST_LIMIT}
        />
      )}
      <footer className={classes.footer}>
        <div className={classes.footerContent}>
          <div className={classes.footerSection}>
            <h3 className={classes.footerTitle}>PodLuxSwegam</h3>
            <p className={classes.footerText}>
              Премиальные товары с доставкой по всему миру
            </p>
          </div>

          <div className={classes.footerSection}>
            <h4 className={classes.footerSubtitle}>Контакты</h4>
            <ul className={classes.footerList}>
              <li>Email: info@podluxswegam.com</li>
              <li>Телефон: +123 456 7890</li>
              <li>Telegram: @podluxswegam_support</li>
            </ul>
          </div>

          <div className={classes.footerSection}>
            <h4 className={classes.footerSubtitle}>Соцсети</h4>
            <div className={classes.socialIcons}>
              <a href="#" className={classes.socialLink}>
                Instagram
              </a>
              <a href="#" className={classes.socialLink}>
                Telegram
              </a>
              <a href="#" className={classes.socialLink}>
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className={classes.footerBottom}>
          <p>© {new Date().getFullYear()} PodLuxSwegam. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductCardList;
