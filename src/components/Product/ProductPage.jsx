import React, { useEffect, useState } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { formatCurrency } from "../../Utils";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action/auth";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);

  const getAllPoduct = () => {
    fetchInstant("/api/get-all-items", METHOD.GET).then((res) => {
      if (res.code === 0 && res.message === "OK") {
        setListProduct(res.items);
      }
    });
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    getAllPoduct();
  }, []);
  return (
    <div className={style.wrapper}>
      {listProduct.map((item, index) => (
        <div className={style.productItem} key={index}>
          <img src={item.image_link} alt="product-img" />
          <h3 className={`${style.name} line-clamp-2`}>{item.name}</h3>
          {/* <p>{item.description}</p> */}
          <p>Giá: {formatCurrency(item.price)}</p>
          <button onClick={() => handleAddToCart(item)}>
            Thêm vào giỏ hàng
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
