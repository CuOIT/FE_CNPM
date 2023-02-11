import React, { useEffect, useState } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { formatCurrency } from "../../Utils";
import style from "./style.module.css";

const ProductPage = () => {
  const [listProduct, setListProduct] = useState([]);

  const getAllPoduct = () => {
    fetchInstant("/api/get-all-items", METHOD.GET).then((res) => {
      if (res.code === 0 && res.message === "OK") {
        setListProduct(res.items);
      }
    });
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
          <button >Thêm vào giỏ hàng</button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
