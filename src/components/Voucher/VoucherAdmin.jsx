// xem, tim kiem

import React, {  useState } from "react";
import { useEffect } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import {data} from "./data.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const VoucherAdmin = () => {
    // console.log(data);
    const [dataSearch, setDataSearch] = useState(data)
    const [voucherdata, setvoucherdata] = useState([]);
    const [search, setSearch] = useState('');


    console.log(dataSearch)
    // const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    // const handleSearch = (e) => {
    //     // console.log(e.target.voucher_code);
    //     let target = e.target.value;
    //     setFilterFn({
    //         fn: items => {
    //             if (target === "")
    //                 return items;
    //             else
    //                 return items.filter(data => data.voucher_code.toLowerCase().includes(target))
    //         }
    //     })
    // }
    // const getAllVoucher = () => {
    //     fetchInstant("/api/get-all-vouchers", METHOD.GET).then((res) => {
    //       console.log(res.vouchers);
    //       if (res.code === 0 && res.message === "OK") {
    //         setvoucherdata(res.vouchers);
    //       }
    //     });
    //   };
    // useEffect(()=>{
    //     getAllVoucher();
    // },[]);

    
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
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button
            style={{
                width: "100px",
                height: "42px",
                borderRadius: "5px",
                marginTop: "30px",
                marginLeft: "50px",
            }}
            type="button"
            class="btn btn-primary w3-green"
            data-toggle="modal"
            data-target="#exampleModal"
        >Tạo mới
        </button>

        <div class="w3-container w3-padding-64 w3-xxlarge">
            <input class="w3-input w3-content w3-center w3-pale-green w3-round-xxlarge w3-large" 
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search voucher code'/>
            <div class="w3-content w3-padding">
                <div>
                    {/* show voucher */}
                    <table class="w3-table-all w3-large table-bordered">
                        <thead>
                        <tr class="w3-green">
                            <th>expired_date</th>
                            <th>value</th>
                            <th>amount</th>
                            <th>voucher_code</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data
                            .filter((item) => {
                                return search?.toLowerCase() === ''
                                    ? item
                                    : item.voucher_code.toLowerCase().includes(search.toLowerCase());
                        })
                         .map((voucherdata, index) => (   
                        <tr key={index}>
                            <td>{voucherdata.expried_date}</td>
                            <td>{voucherdata.value}</td>
                            <td>{voucherdata.amount}</td>
                            <td>{voucherdata.voucher_code}</td>
                            
                        </tr>
                        ))}
                        </tbody>

                    </table>
                        
                </div>
                
            </div>
        </div>

    </div>
    );
};

export default VoucherAdmin;