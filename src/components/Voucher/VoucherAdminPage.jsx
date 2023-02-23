import React, { useEffect, useState } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import toast, { Toaster } from "react-hot-toast";

const VoucherAdminPage = () => {
  const getAllVouchers = () => {
    fetchInstant("/api/get-all-vouchers", METHOD.GET).then((res) => {
      setVoucherList(res.vouchers);
    });
  };
  const [voucherList, setVoucherList] = useState([]);
  const enotify = (props) => toast.error(props);
  const notify = (props) => toast.success(props);
  const [newVoucher, setNewVoucher] = useState({
    expired_date: "",
    amount: 0,
    value: 0,
    voucher_code: "",
  });
  const [voucherUpdate, setVoucherUpdate] = useState({
    expired_date: "",
    amount: 0,
    value: 0,
    voucher_code: "",
  });
  const [voucherIdUpdate, setVoucherIdUpdate] = useState({ id: null });

  useEffect(() => {
    getAllVouchers();
  }, []);

  const deleteVoucher = (id) => {
    const payload = {
      id,
    };
    fetchInstant("/api/delete-voucher", METHOD.DELETE, payload).then((res) => {
      if (res.msg.code === 0) {
        getAllVouchers();
      }
    });
  };
  const handleCreateVoucher = (e) => {
    e.preventDefault();
    const payload = newVoucher;
    console.log(payload);
    fetchInstant("/api/create-new-voucher", METHOD.POST, payload).then(
      (res) => {
        if (res.code === 0) {
          //process.env.REACT_APP_BASE_URL
          notify(res.message);
          getAllVouchers();
        } else enotify(res.message);
      }
    );
  };
  const handleUpdateVoucher = (e) => {
    console.log(voucherUpdate);
    e.preventDefault();
    const payload = { id: voucherIdUpdate.id, ...voucherUpdate };
    fetchInstant("/api/edit-voucher-info-by-id", METHOD.PUT, payload).then(
      (res) => {
        console.log(payload);
        if (res.message.code === 0) {
          notify(res.message.message);
          getAllVouchers();
        } else {
          notify(res.message.message);
        }
      }
    );
  };
  const handleOnChangeCreate = (event) => {
    let { name, value } = event.target;
    setNewVoucher({
      ...newVoucher,
      [name]: value,
    });
  };

  const handleOnChangeUpdate = (event) => {
    console.log(voucherUpdate);
    let { name, value } = event.target;
    setVoucherUpdate({
      ...voucherUpdate,
      [name]: value,
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "90%",
        minHeight: "600px",
        margin: "20px auto",
        borderRadius: "10px",
        padding: "0px 20px",
      }}
    >
      <Toaster />
      <button
        style={{
          width: "100px",
          height: "42px",
          borderRadius: "5px",
          marginTop: "30px",
          marginLeft: "50px",
        }}
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Tạo mới
      </button>
      <table class="table" style={{ width: "100%", marginTop: "30px" }}>
        <thead>
          <tr>
            <th style={{ width: "6%" }} scope="col">
              #
            </th>
            <th style={{ width: "30%" }} scope="col">
              Voucher_code
            </th>
            <th style={{ width: "12%" }} scope="col">
              Value
            </th>
            <th style={{ width: "12%" }} scope="col">
              Amount
            </th>
            <th style={{ width: "20%" }} scope="col">
              Expired_At
            </th>
            <th style={{ width: "20%" }} scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {voucherList.map((item, index) => {
            const date = new Date(item.expired_date);
            return (
              <tr style={{ height: "55px" }} key={index}>
                <th style={{ width: "6%" }} scope="row">
                  {item.id}
                </th>
                <td style={{ width: "30%" }}>{item.voucher_code}</td>
                <td style={{ width: "12%" }}>{item.value}</td>
                <td style={{ width: "12%" }}>{item.amount}</td>
                <td style={{ width: "20%" }}>{`${date.getDate()} - ${
                  date.getMonth() + 1
                } - ${date.getYear() + 1900}`}</td>
                <td style={{ width: "20%" }}>
                  <button
                    onClick={() => {
                      deleteVoucher(item.id);
                    }}
                    class="btn btn-danger"
                    style={{
                      margin: "0px 10px",
                      width: "60px",
                    }}
                  >
                    xóa
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#modalUpdate"
                    onClick={() => {
                      setVoucherUpdate({
                        voucher_code: item.voucher_code,
                        value: item.value,
                        amount: item.amount,
                        expired_date: item.expired_date,
                      });
                      setVoucherIdUpdate({ id: item.id });
                    }}
                    style={{
                      margin: "0px 10px",
                      width: "60px",
                    }}
                  >
                    sửa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Create product
              </h1>
              <button
                type="button"
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={(e) => handleCreateVoucher(e)}>
                <div class="form-group">
                  <label for="1">Voucher Code</label>
                  <input
                    name="voucher_code"
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    type="text"
                    class="form-control"
                    id="1"
                    placeholder="Voucher Code"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="2">Value</label>
                  <input
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    name="value"
                    type="number"
                    class="form-control"
                    id="2"
                    placeholder="Value"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="3">Amount</label>
                  <input
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    name="amount"
                    type="number"
                    class="form-control"
                    id="3"
                    placeholder="Amount"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="4">Expired Date</label>
                  <input
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    type="date"
                    name="expired_date"
                    style={{ width: "80%" }}
                    class="form-control"
                    id="4"
                    rows="3"
                  ></input>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ width: "100px" }}
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="modalUpdate"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Voucher
              </h1>
              <button
                type="button"
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={(e) => handleUpdateVoucher(e)}>
                <div class="form-group">
                  <label for="1">Voucher Code</label>
                  <input
                    defaultValue={voucherUpdate.voucher_code}
                    name="voucher_code"
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    type="text"
                    class="form-control"
                    id="1"
                    placeholder="Voucher Code"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="2">Value</label>
                  <input
                    defaultValue={voucherUpdate.value}
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    name="value"
                    type="number"
                    class="form-control"
                    id="2"
                    placeholder="Value"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="3">Amount</label>
                  <input
                    defaultValue={voucherUpdate.amount}
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    name="amount"
                    type="number"
                    class="form-control"
                    id="3"
                    placeholder="Amount"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Expired Date</label>
                  <input
                    defaultValue={voucherUpdate.expired_date}
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    type="date"
                    defaultValue={voucherUpdate.expired_date}
                    name="expired_date"
                    style={{ width: "80%" }}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                  ></input>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ width: "100px" }}
                  onClick={() => {
                    console.log("first");
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VoucherAdminPage;
