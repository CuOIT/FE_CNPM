import './AdminData.css';
import Form from './Form';
import React, { useEffect, useState } from "react";
import { useDataAuthRedux } from "../../redux/selector";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";

const AdminDataPage = () => {

    const dataUserRedux = useDataAuthRedux();
    // console.log(dataUserRedux)

    const [listVoucher, setListVoucher] = useState([]);
    const [listItem, setListItem] = useState([]);
    const [listStaff, setListStaff] = useState([]);
    const [listOrder, setListOrder] = useState([]);

    const paramsForStaff = {
        role: 2,
    };

    var totalMoney = 0;

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

    const getAllStaff = () => {
        fetchInstant("/api/get-all-users-by-role", METHOD.GET, '', paramsForStaff).then((res) => {
            console.log(res.users);
            if (res.code === 0 && res.message === "OK") {
                setListStaff(res.users);
            }
        });
    };

    const getAllOrder = () => {
        fetchInstant("/api/get-all-orders", METHOD.GET).then((res) => {
            console.log(res.orders);
            if (res.code === 0 && res.message === "OK") {
                setListOrder(res.orders);
            }
        });
    };

    useEffect(() => {
        getAllVoucher();
        getAllItem();
        getAllStaff();
        getAllOrder();
    }, []);


    const [showCheck1, setShowCheck1] = useState(false);
    const [showCheck2, setShowCheck2] = useState(false);
    const [showCheck3, setShowCheck3] = useState(false);
    const [showCheck4, setShowCheck4] = useState(false);

    listOrder.map((order) => {
        totalMoney += order.total_price;
    });

    return (
        <>
            <div className="statistic">
                <div className="white-background">
                    <div className="stats">
                        <img className="userava" src="https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0" alt="Ava User"></img>
                        <h2 className="justname">{dataUserRedux.user_name}</h2>
                    </div>
                    <div className="optionofhistory">
                        <div className="firstRow">
                            <button onClick={() => setShowCheck1(true)} className="thongkeelement main">Doanh thu cửa hàng</button>
                            <Form
                                title={'Doanh thu cửa hàng'}
                                body={<div>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Total Money</th>
                                                <th>{totalMoney}</th>
                                            </tr>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Total Price</th>
                                            </tr>
                                            {listOrder.map((order, index) => {
                                                // totalMoney += order.total_price;
                                                return (
                                                    <tr key={index}>
                                                        <th>{order.id}</th>
                                                        <th>{order.total_price}</th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>}
                                show={showCheck1}
                                onHide={() => setShowCheck1(false)}
                            />
                            <button onClick={() => setShowCheck2(true)} className="thongkeelement">Thông tin nhân viên</button>
                            <Form
                                title={'Thông tin nhân viên'}
                                body={<div>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Id</th>
                                                <th>Phone</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Birthday</th>
                                            </tr>
                                            {listStaff.map((user, index) => {
                                                const date = new Date(user.birthday);
                                                return (
                                                    <tr key={index}>
                                                        <th>{user.id}</th>
                                                        <th>{user.phone}</th>
                                                        <th>{user.user_name}</th>
                                                        <th>{user.email}</th>
                                                        <th>{`${date.getDate()} - ${date.getMonth() + 1} - ${date.getYear() + 1900}`}</th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>}
                                show={showCheck2}
                                onHide={() => setShowCheck2(false)}
                            />
                        </div>
                        <div className="secondRow">
                            <button onClick={() => setShowCheck3(true)} className="thongkeelement">Thông tin sản phẩm</button>
                            <Form
                                title={'Thông tin sản phẩm'}
                                body={<div>
                                    <table className="table">
                                        <tbody>
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
                                        </tbody>
                                    </table>
                                </div>}
                                show={showCheck3}
                                onHide={() => setShowCheck3(false)}
                            />
                            <button onClick={() => setShowCheck4(true)} className="thongkeelement">Thông tin voucher</button>
                            <Form
                                title={'Thông tin voucher'}
                                body={
                                    <table className="table">
                                        <tbody>
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
                                        </tbody>
                                    </table>

                                }
                                show={showCheck4}
                                onHide={() => setShowCheck4(false)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
export default AdminDataPage;