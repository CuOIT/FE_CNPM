import { useEffect, useState } from "react";
import { deleteItemInCart, updateCartById } from "../../redux/action/auth";
import { useDataAuthRedux } from "../../redux/selector";
import { useDispatch } from "react-redux";
import { METHOD } from "../../constants";
import { formatCurrency } from "../../Utils";
import "./Cart.css";
import { fetchInstant } from "../../config/index";
const CartPage = () => {
  const dataAuthRedux = useDataAuthRedux();
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);
  const [voucher, setVoucher] = useState({});
  const [order, setOrder] = useState({});

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
      setVoucher(res.vouchers[0]);
    });
  };
  useEffect(() => {
    if (dataAuthRedux.cart) {
      setCart(dataAuthRedux.cart);
    } else {
    }
  }, [dataAuthRedux?.cart]);

  return (
    <div className="h-100" style={{ backgroundColor: "white" }}>
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
                  <p>{item.name}</p>
                  <div className="setNumItem">
                    <button onClick={() => handleUpdateCart(item, "decrease")}>
                      -
                    </button>
                    <p className="numItem">{item.amount}</p>
                    <button onClick={() => handleUpdateCart(item, "increase")}>
                      +
                    </button>
                    <button
                      className="deleteItem"
                      onClick={() => handleDeleteCart(item)}
                    >
                      Delete
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
                    id="addressField"
                    className="form-control form-control-lg"
                  />
                </div>
              </div>

              <div className="payMethods card-body p-4 d-flex flex-row">
                <div className="container">
                  <div class="form-group">
                    <label for="payment-method">Payment Method:</label>
                    <select class="form-control" id="payment-method">
                      <option value="cash">Cash</option>
                      <option value="banking">Banking</option>
                      <option value="momo">Momo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="card-body p-4 d-flex flex-row">
                <div className="form-outline flex-fill">
                  <input
                    type="voucher"
                    id="voucherField"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" for="form1">
                    Discound code
                  </label>
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
                >
                  Proceed to Pay
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
