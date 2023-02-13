import './AdminData.css';
import Form from './Form';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDataAuthRedux } from "../../redux/selector";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";

const AdminDataPage = () => {

    const dataUserRedux = useDataAuthRedux();
    // console.log(dataUserRedux);

    const dispatch = useDispatch();
    const [listVoucher, setListVoucher] = useState([]);
    const [listItem, setListItem] = useState([]);

    const getAllVoucher = () => {
        fetchInstant("/api/get-all-vouchers", METHOD.GET).then((res) => {
            console.log(res.vouchers);
            if (res.code === 0 && res.message === "OK") {
                setListVoucher(res.vouchers);
            }
        });
    };

    const getAllItem = () => {
        fetchInstant("/api/get-all-items", METHOD.GET).then((res) => {
            console.log(res.items);
            if (res.code === 0 && res.message === "OK") {
                setListItem(res.items);
            }
        });
    };

    useEffect(() => {
        getAllVoucher();
        getAllItem();
    }, []);


    const [showCheck1, setShowCheck1] = useState(false);
    const [showCheck2, setShowCheck2] = useState(false);
    const [showCheck3, setShowCheck3] = useState(false);
    const [showCheck4, setShowCheck4] = useState(false);

    return (
        <>
            <div class="statistic">
                <div class="container">
                    <img class="userava" src="https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0" alt="Ava User"></img>
                    <h2>Chào sếp {dataUserRedux.user_name}</h2>
                </div>
                <div class="option">
                    <div>
                        <button onClick={() => setShowCheck1(true)} class="thongkeelement main">Doanh thu cửa hàng</button>
                        <Form
                            title={'Doanh thu cửa hàng'}
                            body={'check 1 body'}
                            show={showCheck1}
                            onHide={() => setShowCheck1(false)}
                        />
                        <button onClick={() => setShowCheck2(true)} class="thongkeelement">Thông tin nhân viên</button>
                        <Form
                            title={'Thông tin nhân viên'}
                            body={'check 2 body'}
                            show={showCheck2}
                            onHide={() => setShowCheck2(false)}
                        />
                    </div>
                    <div>
                        <button onClick={() => setShowCheck3(true)} class="thongkeelement">Thông tin sản phẩm</button>
                        <Form
                            title={'Thông tin sản phẩm'}
                            body={<div>
                                <table className="table">
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </tr>
                                    {listItem.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{item.id}</th>
                                                <th>{item.name}</th>
                                                <th>{item.price}</th>
                                                <th>{item.amount}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>}
                            show={showCheck3}
                            onHide={() => setShowCheck3(false)}
                        />
                        <button onClick={() => setShowCheck4(true)} class="thongkeelement">Thông tin voucher</button>
                        <Form
                            title={'Thông tin voucher'}
                            body={
                                <table className="table">
                                    <tr>
                                        <th>Id</th>
                                        <th>Voucher Code</th>
                                        <th>Value</th>
                                        <th>Expired date</th>
                                        <th>Amount</th>
                                    </tr>
                                    {listVoucher.map((voucher, index) => {
                                        const date = new Date(voucher.expired_date);
                                        return (
                                            <tr key={index}>
                                                <th>{voucher.id}</th>
                                                <th>{voucher.voucher_code}</th>
                                                <th>{voucher.value}</th>
                                                <th>{`${date.getDate()} - ${date.getMonth() + 1} - ${date.getYear() + 1900}`}</th>
                                                <th>{voucher.amount}</th>
                                            </tr>
                                        )
                                    })}
                                </table>

                            }
                            show={showCheck4}
                            onHide={() => setShowCheck4(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default AdminDataPage;