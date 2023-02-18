import React, { useEffect, useState } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { formatCurrency } from "../../Utils";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action/auth";
import { Select } from "@mantine/core";
import toast, { Toaster } from "react-hot-toast";


const ProductPage = () => {
  const enotify = (props) => toast.error(props);
  const notify = (props) => toast.success(props);
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);

  const [sortBy, setSortBy] = useState("Sort by name");
  const [sortType, setSortType] = useState("1");

  const getAllPoduct = () => {
    fetchInstant("/api/get-all-items", METHOD.GET).then((res) => {
      if (res.code === 0 && res.message === "OK") {
        setListProduct(res.items);
      }
    });
  };
  const handleAddToCart = (item) => {
    notify("Added "+item.name);
    dispatch(addToCart(item));
  };
  useEffect(() => getAllPoduct(), []);

  const handleSortBy = (e) => {
    setSortBy(e);
    const clone = listProduct;
    if (e === "Sort by name") {
      clone.sort((a, b) =>
        a.name > b.name ? Number(sortType) : -Number(sortType)
      );
    } else if (e === "Sort by price") {
      clone.sort((a, b) =>
        a.price > b.price ? Number(sortType) : -Number(sortType)
      );
    }
    setListProduct(clone);
  };

  const handleSortType = (e) => {
    const clone = listProduct;
    if (sortBy === "Sort by name") {
      clone.sort((a, b) => (a.name > b.name ? Number(e) : -Number(e)));
    } else if (sortBy === "Sort by price") {
      clone.sort((a, b) => (a.price > b.price ? Number(e) : -Number(e)));
    }
    setSortType(e);
    setListProduct(clone);
  };
  return (
    <div className={style.wrapper}>
            <Toaster />
      <div style={{ display: "flex" }}>
        <Select
          className="mr-4"
          value={sortBy}
          data={[
            { value: "Sort by name", label: "Sort by name" },
            { value: "Sort by price", label: "Sort by price" },
          ]}
          onChange={(e) => handleSortBy(e)}
        />
        <Select
          value={sortType}
          data={[
            { value: "1", label: "Increase" },
            { value: "-1", label: "Decrease" },
          ]}
          onChange={(e) => handleSortType(e)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          margin: "20px 0",
        }}
      >
        {listProduct.map((item, index) => (
          <div key={index}>
            <div className={style.productItem}>
              <img src={item.image_link} alt="product-img" />
              <h3 className={`${style.name} line-clamp-2`}>{item.name}</h3>
              {/* <p>{item.description}</p> */}
              <p>Giá: {formatCurrency(item.price)}</p>
              <button
                style={{ margin: "0 auto" }}
                onClick={() => handleAddToCart(item)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
