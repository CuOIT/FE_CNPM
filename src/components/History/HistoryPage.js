import './HistoryPage.css';
import Form from './Form';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDataAuthRedux } from "../../redux/selector";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";

const HistoryPage = () => {

  const dataUserRedux = useDataAuthRedux();
  // console.log(dataUserRedux);

  // const dispatch = useDispatch();
  // const [listPurchase, setListPurchase] = useState([]);

  // const getAllPurchase = () => {
  //   fetchInstant("/api/get-all-items", METHOD.GET).then((res) => {
  //     console.log(res.items);
  //     if (res.code === 0 && res.message === "OK") {
  //       setListPurchase(res.items);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getAllPurchase();
  // }, []);


  const [showCheck1, setShowCheck1] = useState(false);
  const [showCheck2, setShowCheck2] = useState(false);
  const [showCheck3, setShowCheck3] = useState(false);
  const [showCheck4, setShowCheck4] = useState(false);

  return (
    <>
      <div class="statistic">
        <div class="container">
          <img class="userava" src="https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0" alt="Ava User"></img>
          <h2>{dataUserRedux.user_name}</h2>
        </div>
        <div class="option">
          <div>
            <button onClick={() => setShowCheck1(true)} class="thongkeelement main">Lịch sử mua hàng</button>
            <Form
              title={'Lịch sử mua hàng'}
              body={'check 1 body'}
              show={showCheck1}
              onHide={() => setShowCheck1(false)}
            />
            <button onClick={() => setShowCheck2(true)} class="thongkeelement">Voucher đã dùng</button>
            <Form
              title={'Voucher đã dùng'}
              body={'check 2 body'}
              show={showCheck2}
              onHide={() => setShowCheck2(false)}
            />
          </div>
          <div>
            <button onClick={() => setShowCheck3(true)} class="thongkeelement">Tổng số tiền đã dùng</button>
            <Form
              title={'Tổng số tiền đã dùng'}
              body={<div>
                <h1>Hello</h1>
              </div>}
              show={showCheck3}
              onHide={() => setShowCheck3(false)}
            />
            <button onClick={() => setShowCheck4(true)} class="thongkeelement">Sản phẩm đã dùng</button>
            <Form
              title={'Sản phẩm đã dùng'}
              body={'check 4 body'}
              show={showCheck4}
              onHide={() => setShowCheck4(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default HistoryPage;