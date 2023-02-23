// xem, tim kiem

import React, { useState } from "react";
import { useEffect } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import toast, { Toaster } from "react-hot-toast";

const VoucherUserPage = () => {
  const [voucherdata, setvoucherdata] = useState([]);
  const [search, setSearch] = useState("");
  const enotify = (props) => toast.error(props);
  const notify = (props) => toast.success(props);
  // const remove = (id) => {
  //   const newlist = list.filter((l) => l.id != id);
  //   setList(newlist);
  // };
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      let value = e.target.value;
      console.log(value);
      if (value === "") setFilteredVouchers(voucherdata);
      else {
        const fVouchers = voucherdata.filter((voucher) =>
          voucher.voucher_code.toLowerCase().includes(value.toLowerCase())
        );
        if (fVouchers.length === 0) {
          enotify("Voucher doesn't exist");
          setFilteredVouchers(voucherdata);
        } else {
          setFilteredVouchers(fVouchers);
        }
      }
    }
  };
  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };
  const getAllVoucher = () => {
    fetchInstant("/api/get-all-vouchers", METHOD.GET).then((res) => {
      if (res.code === 0 && res.message === "OK") {
        setvoucherdata(res.vouchers);
      }
    });
  };
  useEffect(() => {
    getAllVoucher();
    console.log(filteredVouchers);
  }, []);
  console.log("HI");
  return (
    <div
      style={{
        backgroundColor: "#E8E8E8",
        width: "90%",
        minHeight: "600px",
        margin: "100px auto",
        borderRadius: "10px",
        padding: "0px 2px",
      }}
    >
      <Toaster />
      <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <div class="w3-container w3-padding-64 w3-xxlarge">
        <input
          class="w3-input w3-content w3-center w3-pale-green w3-round-xxlarge w3-large"
          placeholder="Tìm kiếm voucher"
          onChange={handleOnChange}
          onKeyDown={handleSearch}
        />
        <div class="w3-content w3-padding">
          <div>
            {/* show voucher */}
            <table class="w3-table-all w3-large table-bordered">
              <thead>
                <tr class="w3-green">
                  <th>expired_date</th>
                  <th>value</th>
                  <th>voucher_code</th>
                </tr>
              </thead>
              <tbody>
                {filteredVouchers.length !== 0
                  ? filteredVouchers.map((item, index) => {
                      console.log(filteredVouchers);
                      const date = new Date(item.expired_date);
                      return (
                        <tr key={index}>
                          <td>{`${date.getDate()} - ${date.getMonth() + 1} - ${
                            date.getYear() + 1900
                          }`}</td>
                          <td>{item.value}</td>
                          <td>{item.voucher_code}</td>
                        </tr>
                      );
                    })
                  : voucherdata.map((item, index) => {
                      console.log("HELLO");
                      const date = new Date(item.expired_date);
                      return (
                        <tr key={index}>
                          <td>{`${date.getDate()} - ${date.getMonth() + 1} - ${
                            date.getYear() + 1900
                          }`}</td>
                          <td>{item.value}</td>
                          <td>{item.voucher_code}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherUserPage;
