// import React from 'react'

// const Voucher = () => {
  
//   return (
//     <div>VoucherPage</div>
//   )
// }

// export default Voucher

import React, { useEffect, useState } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { formatCurrency } from "../../Utils";
import style from "./style.css";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/action/auth";

const VoucherPage = () => {
  const dispatch = useDispatch();
  const [listVoucher, setListVoucher] = useState([]);

  const getAllVoucher = () => {
    fetchInstant("/api/get-all-items", METHOD.GET).then((res) => {
      if (res.code === 0 && res.message === "OK") {
        setListVoucher(res.items);
      }
    });
  };
  // const handleAddToVoucher = (item) => {
  //   dispatch(addToVoucher(item));
  // };

  useEffect(() => {
    getAllVoucher();
  }, []);
  return (
    <div className={style.wrapper}>
      {listVoucher.map((item, index) => (
        <div className={style.voucherItem} key={index}>
          {/* <img src={item.image_link} alt="voucher-img" /> */}
          <h3 className={`${style.name} line-clamp-2`}>{item.name}</h3>
          {/* <p>{item.description}</p> */}
          {/* <p>Giá: {formatCurrency(item.price)}</p>
          <button onClick={() => handleAddToVoucher(item)}>   
            Thêm voucher
          </button> */}

        </div>
      ))}
    </div>
  );
};

export default VoucherPage;
