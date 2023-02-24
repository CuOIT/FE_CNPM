import { useEffect, useState } from "react";
import {
  deleteItemInCart,
  orderItems,
  updateCartById,
} from "../../redux/action/auth";
import { useDataAuthRedux } from "../../redux/selector";
import { useDispatch } from "react-redux";
import { METHOD } from "../../constants";
import { formatCurrency } from "../../Utils";
import "./Cart.css";
import { fetchInstant } from "../../config/index";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const enotify = (props) => toast.error(props);
  const notify = (props) => toast.success(props);

  const dataAuthRedux = useDataAuthRedux();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [voucher, setVoucher] = useState({});
  const [order, setOrder] = useState({
    total_price: null,
    payment: null,
    status: 0,
    staff_name: null,
    shipping_address: null,
    user_id: null,
    voucher_id: null,
    details: [],
  });

  const handleUpdateCart = (item, type) => {
    if (type === "increase") {
      dispatch(updateCartById({ ...item, amount: item.amount + 1 }));
    } else {
      if (item.amount === 1) {
        dispatch(deleteItemInCart(item.id));
      } else {
        dispatch(updateCartById({ ...item, amount: item.amount - 1 }));
      }
    }
  };
  const handleDeleteCart = (item) => {
    dispatch(deleteItemInCart(item.id));
  };
  const handleVoucher = () => {
    const voucher_code = document.getElementById("voucherField").value;
    console.log(voucher_code);
    fetchInstant("/api/get-voucher-info-by-code", METHOD.GET, null, {
      voucher_code: voucher_code,
    }).then((res) => {
      if (res.code === 0) {
        notify(res.message);
        setVoucher(res.vouchers[0]);
      } else {
        enotify(res.message);
        setVoucher({});
      }
    });
  };

  const handleOrder = () => {
    const shortCart = [];
    cart.forEach((item) => {
      console.log(item);
      shortCart.push({ item_id: item.id, quantity: item.amount });
    });
    console.log(shortCart);
    if (cart.length === 0) enotify("Empty cart");
    else {
      const newOrder = {
        ...order,
        user_id: dataAuthRedux.id,
        voucher_id: voucher.id,
        payment: document.getElementById("payment-method").value,
        shipping_address: document.getElementById("address-field").value,
        total_price:
          cart.reduce((sum, item) => {
            return sum + item.price * item.amount;
          }, 0) - (voucher.value ? voucher.value : 0),
        details: shortCart,
      };
      const confirmed = window.confirm("Are you sure?");
      if (confirmed) {
        setOrder(newOrder);
        setVoucher({});
        notify("Order successfully");
      }
    }
  };
  useEffect(() => {
    if (dataAuthRedux.cart) {
      setCart(dataAuthRedux.cart);
    } else {
    }
  }, [dataAuthRedux?.cart]);
  useEffect(() => {
    const payload = order;
    fetchInstant("/api/create-new-order-and-detail", METHOD.POST, payload).then(
      (res) => {
        if (res.code === 0) dispatch(orderItems(order));
        console.log(res);
      }
    );
  }, [order]);
  return (
    <div className="h-100" style={{ backgroundColor: "white" }}>
      <Toaster />
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">My Cart</h3>
              <div></div>
            </div>
            {/* Item */}
            <div>
              {cart.map((item, index) => (
                <div key={index} className="cartItem">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${item.image_link}`}
                    alt="product-img"
                    className="img-cart"
                  />
                  <p>{item.name}</p>
                  <div className="setNumItem">
                    <button
                      className="btnSetNumItem btn-outline-secondary"
                      onClick={() => handleUpdateCart(item, "decrease")}
                    >
                      -
                    </button>
                    <div className="numItem">{item.amount}</div>
                    <button
                      className="btnSetNumItem btn-outline-secondary"
                      onClick={() => handleUpdateCart(item, "increase")}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger deleteItem "
                      onClick={() => handleDeleteCart(item)}
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="preTotal">
              {formatCurrency(
                cart.reduce((sum, item) => {
                  return sum + item.price * item.amount;
                }, 0)
              )}
            </div>

            <div className="card mb-4">
              <div className="card-body p-4 d-flex flex-row">
                <div className="form-outline flex-fill">
                  <label className="form-label" for="form1">
                    Address
                  </label>
                  <input
                    type="address"
                    id="address-field"
                    className="form-control form-control-lg"
                  />
                </div>
              </div>

              

              <div className="card-body p-4 d-flex flex-row">
                <div className="form-outline flex-fill">
                  <label className="form-label" for="form1">
                    Discound code
                  </label>
                  <input
                    type="voucher"
                    id="voucherField"
                    className="form-control form-control-lg"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline-warning btn-lg ms-3"
                  onClick={() => handleVoucher()}
                >
                  Apply
                </button>
              </div>
              <div className="detail">
                <div>Voucher: {-voucher.value ? voucher.value : 0}</div>
                <div>
                  Total price:
                  {cart.reduce((sum, item) => {
                    return sum + item.price * item.amount;
                  }, 0) - (voucher.value ? voucher.value : 0)}
                </div>
              </div>
            </div>

            <div className="card">
              <div>
                <button
                  type="button"
                  className="btn btn-warning btn-block btn-lg"
                  onClick={() => handleOrder()}
                >
                  Proceed to Pays
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
