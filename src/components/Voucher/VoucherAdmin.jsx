// xem, tim kiem

import React, {  useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { updateUserDataRedux } from "../../redux/action/auth";
import * as Types from "./../../redux/constants";
import {data} from "./data.js";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ".style.module.css";


const VoucherAdmin = () => {
    console.log(data);

    const [voucherdata, setvoucherdata] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search);

    const [list, setList] = React.useState([data])
    const remove = (id) => {
        const newlist = list.filter((l) => l.id != id);
        setList(newlist);
    };
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.voucher_code.toLowerCase().includes(target.value))
            }
        })
    }
    const getAllVoucher = () => {
        fetchInstant("/api/get-all-vouchers", METHOD.GET).then((res) => {
          console.log(res.vouchers);
          if (res.code === 0 && res.message === "OK") {
            setvoucherdata(res.vouchers);
          }
        });
      };
    useEffect(()=>{
        getAllVoucher();
    },[]);

    
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
                    placeholder="Tìm kiếm voucher"
                    onChange={handleSearch} />
            <div class="w3-content w3-padding">
                <div>
                    {/* show voucher */}
                    <table class="w3-table-all w3-large table-bordered">
                        <thead>
                        <tr class="w3-green">
                            <th>expired_date</th>
                            <th>value</th>
                            <th>amount</th>
                            <th>voucher_id</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.map((voucherdata, index)=>(
                            
                        <tr key={index}>
                            <td>{voucherdata.expried_date}</td>
                            <td>{voucherdata.value}</td>
                            <td>{voucherdata.amount}</td>
                            <td>{voucherdata.voucher_code}</td>
                            <td>
                                <button class="w3-button w3-green w3-round-xxlarge">Sửa</button>
                                <button onClick = {() => remove(voucherdata.id)} class="w3-button w3-green w3-round-xxlarge">Xoá</button>
                            </td>
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