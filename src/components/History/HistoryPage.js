import "./HistoryPage.css";
import Form from "./Form";
import React, { useEffect, useState } from "react";
import { useDataAuthRedux } from "../../redux/selector";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";

const HistoryPage = () => {
  const dataUserRedux = useDataAuthRedux();
  // console.log(dataUserRedux);

  const [showCheck1, setShowCheck1] = useState(false);
  const [showCheck2, setShowCheck2] = useState(false);
  const [showCheck3, setShowCheck3] = useState(false);
  const [showCheck4, setShowCheck4] = useState(false);

  const [listOrder, setListOrder] = useState([]);
  const [listVoucher, setListVoucher] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [listItem, setListItem] = useState([]);

  const paramsForUser = {
    user_id: dataUserRedux.id,
  };

  const getAllOrder = () => {
    fetchInstant(
      "/api/get-orders-by-user-id",
      METHOD.GET,
      "",
      paramsForUser
    ).then((res) => {
      console.log(res.orders);
      if (res.code === 0 && res.message === "OK") {
        setListOrder(res.orders);
      }
    });
  };

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

  const getAllOrderDetails = () => {
    fetchInstant("/api/get-all-order-details", METHOD.GET).then((res) => {
      console.log(res.details);
      if (res.code === 0 && res.message === "OK") {
        setListOrderDetail(res.details);
      }
    });
  };

  useEffect(() => {
    getAllOrder();
    getAllVoucher();
    getAllOrderDetails();
    getAllItem();
  }, []);

  var totalMoney = 0;
  var status = "";
  var orderstatus = "";

  listOrder.map((order) => {
    totalMoney += order.total_price;
  });

  var number = new Array();
  var numberindex = -1;

  return (
    <>
      <div className="statistic">
        <div className="white-background">
          <div className="stats">
            <img
              className="userava"
              src="https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0"
              alt="Ava User"
            ></img>
            <h2 className="justname">{dataUserRedux.user_name}</h2>
          </div>
          <div className="optionofhistory">
            <div className="firstRow">
              <button
                onClick={() => setShowCheck1(true)}
                className="thongkeelement"
              >
                L???ch s??? mua h??ng
              </button>
              <Form
                title={"L???ch s??? mua h??ng"}
                body={
                  <div>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>Order ID</th>
                          <th>Total Price</th>
                          <th>Payment</th>
                          <th>Shipping Address</th>
                          <th>Status</th>
                        </tr>
                        {listOrder.map((order, index) => {
                          if (order.payment === 1) {
                            status = "Cash";
                          }
                          if (order.payment === 2) {
                            status = "Banking";
                          }
                          if (order.payment === 3) {
                            status = "Momo";
                          }
                          if (order.status === -1) {
                            orderstatus = "Cancel";
                          }
                          if (order.status === 0) {
                            orderstatus = "Pending";
                          }
                          if (order.status === 1) {
                            orderstatus = "Succesful";
                          }
                          return (
                            <tr key={index}>
                              <th>{order.id}</th>
                              <th>{order.total_price}</th>
                              <th>{status}</th>
                              <th>{order.shipping_address}</th>
                              <th>{orderstatus}</th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                }
                show={showCheck1}
                onHide={() => setShowCheck1(false)}
              />
              <button
                onClick={() => setShowCheck2(true)}
                className="thongkeelement"
              >
                Voucher ???? d??ng
              </button>
              <Form
                title={"Voucher ???? d??ng"}
                body={
                  <div>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>Voucher ID</th>
                          <th>Name</th>
                          <th>Day used</th>
                        </tr>
                        {listOrder.map((order, index) => {
                          index++;
                          return listVoucher.map((voucher, index) => {
                            const date = new Date(order.createdAt);
                            if (order.voucher_id === voucher.id) {
                              return (
                                <tr>
                                  <th>{voucher.id}</th>
                                  <th>{voucher.voucher_code}</th>
                                  <th>{`${date.getDate()} - ${
                                    date.getMonth() + 1
                                  } - ${date.getYear() + 1900}`}</th>
                                </tr>
                              );
                            }
                          });
                        })}
                      </tbody>
                    </table>
                  </div>
                }
                show={showCheck2}
                onHide={() => setShowCheck2(false)}
              />
            </div>
            <div className="secondRow">
              <button
                onClick={() => setShowCheck3(true)}
                className="thongkeelement"
              >
                T???ng s??? ti???n ???? d??ng
              </button>
              <Form
                title={"T???ng s??? ti???n ???? d??ng"}
                body={
                  <div>
                    <h3 align="center">
                      B???n ???? d??ng {totalMoney} VND r???i ????! &#128525;
                    </h3>
                    <img></img>
                  </div>
                }
                show={showCheck3}
                onHide={() => setShowCheck3(false)}
              />
              <button
                onClick={() => setShowCheck4(true)}
                className="thongkeelement"
              >
                S???n ph???m ???? d??ng
              </button>
              <Form
                title={"S???n ph???m ???? d??ng"}
                body={
                  <div>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th></th>
                          <th>Item</th>
                          <th>Quantity</th>
                        </tr>
                        {listItem.map((item, index) => {
                          numberindex++;
                          number[numberindex] = 0;
                          listOrder.map((order, index) => {
                            listOrderDetail.map((orderdetail, index) => {
                              if (
                                item.id === orderdetail.item_id &&
                                orderdetail.order_id === order.id
                              ) {
                                number[numberindex]++;
                              }
                            });
                          });
                          return (
                            <tr>
                              <th>
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/${item.image_link}`}
                                  alt="img"
                                  className="img-his"
                                />
                              </th>
                              <th>{item.name}</th>
                              <th>{number[numberindex]}</th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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
export default HistoryPage;
