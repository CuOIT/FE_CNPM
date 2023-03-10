import React, { useEffect, useState } from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import toast, { Toaster } from "react-hot-toast";

const ProductAdminPage = () => {
  const getAllItems = () => {
    fetchInstant("/api/get-all-items", METHOD.GET).then((res) => {
      setItemList(res.items);
    });
  };
  const [itemList, setItemList] = useState([]);
  const enotify = (props) => toast.error(props);
  const notify = (props) => toast.success(props);
  const [handleDelete, setHandleDelete] = useState({ status: 0 });
  const [formCreate, setFormCreate] = useState({
    name: "",
    amount: "",
    price: "",
    description: "",
  });
  const [file, setFile] = useState();
  const [validateFile, setValidateFile] = useState(false);
  const [itemUpdate, setItemUpdate] = useState({
    name: "",
    amount: "",
    price: "",
    description: "",
  });
  const [itemIdUpdate, setItemIdUpdate] = useState({ id: null });

  useEffect(() => {
    getAllItems();
  }, []);

  // useEffect(() => {}, [
  //   JSON.parse(localStorage.getItem("allBook")),
  //   handleDelete.status,
  // ]) Ham nay k dung vi trong khong

  const deleteItem = (id) => {
    const payload = {
      id,
    };
    fetchInstant("/api/delete-item", METHOD.DELETE, payload).then((res) => {
      if (res.msg.code === 0) {
        getAllItems();
        setHandleDelete({ status: 1 });
      }
    });
  };
  const handleCreateItem = (e) => {
    e.preventDefault();
    if (validateFile === true) {
      let formData = new FormData();
      formData.append("file", file);
      console.log(formCreate);
      fetchInstant("/api/create-new-item", METHOD.POST, formCreate).then(
        (res) => {
          if (res.code === 0) {
            //process.env.REACT_APP_BASE_URL
            fetch(`http://localhost:8080/api/upload-item?id=${res.data.id}`, {
              method: "PUT",
              body: formData,
            }).then((response) => {
              if (response.status === 201) {
                notify(res.message);
                fetchInstant("/api/get-all-items", METHOD.GET).then((data) => {
                  setItemList(data.items);
                });
              }
            });
          } else enotify(res.message);
        }
      );
    }
  };
  const handleUpdateItem = (e) => {
    console.log(itemUpdate);
    e.preventDefault();
    if (validateFile === true) {
      let formData = new FormData();
      formData.append("file", file);
      const formUpdate = { ...itemUpdate, id: itemIdUpdate.id };
      console.log("HI");
      console.log(formUpdate);
      fetchInstant("/api/edit-item-info-by-id", METHOD.PUT, formUpdate).then(
        (res) => {
          if (res.message.code === 0) {
            if (file == null) {
              //process.env.REACT_APP_BASE_URL = http://localhost:8080
              fetch(
                `http://localhost:8080/api/upload-item?id=${itemIdUpdate.id}`,
                {
                  method: "PUT",
                  body: formData,
                }
              ).then((response) => {
                if (response.status === 201) {
                  notify(res.message.message);
                  fetchInstant("/api/get-all-items", METHOD.GET).then(
                    (data) => {
                      // localStorage.setItem(
                      //   "allBook",
                      //   JSON.stringify(data.items)
                      // );
                      setItemList(data.items);
                    }
                  );
                }
              });
            } else {
              notify(res.message.message);
              fetchInstant("/api/get-all-items", METHOD.GET).then((data) => {
                setItemList(data.items);
              });
            }
          } else enotify(res.message.message);
        }
      );
    }
  };
  const handleOnChangeCreate = (event) => {
    let { name, value } = event.target;
    let changeValues = { ...formCreate, [name]: value };
    setFormCreate({
      ...formCreate,
      name: changeValues.name,
      amount: changeValues.amount,
      description: changeValues.description,
      price: changeValues.price,
    });
  };

  const handleOnChangeUpdate = (event) => {
    let { name, value } = event.target;
    let changeValues = { ...itemUpdate, [name]: value };
    setItemUpdate({
      ...itemUpdate,
      name: changeValues.name,
      amount: changeValues.amount,
      description: changeValues.description,
      price: changeValues.price,
    });
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setTimeout(() => {
      const extension = [".png", "jpeg"];
      const extensionOriginFile = e.target.files[0].name.slice(-4);
      const checkExtension = extension.includes(extensionOriginFile);
      if (checkExtension) {
        setValidateFile(true);
        console.log("true");
      } else {
        setValidateFile(false);
        console.log("false");
      }
    }, 50);
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
        T???o m???i
      </button>
      <table class="table" style={{ width: "100%", marginTop: "30px" }}>
        <thead>
          <tr>
            <th style={{ width: "6%" }} scope="col">
              #
            </th>
            <th style={{ width: "30%" }} scope="col">
              Name
            </th>
            <th style={{ width: "12%" }} scope="col">
              Price
            </th>
            <th style={{ width: "12%" }} scope="col">
              Amount
            </th>
            <th style={{ width: "20%" }} scope="col">
              Created At
            </th>
            <th style={{ width: "20%" }} scope="col">
              Manager
            </th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {itemList.map((item, index) => {
            const date = new Date(item.createdAt);
            return (
              <tr style={{ height: "55px" }} key={index}>
                <th style={{ width: "6%" }} scope="row">
                  {item.id}
                </th>
                <td style={{ width: "30%" }}>{item.name}</td>
                <td style={{ width: "12%" }}>{item.price}</td>
                <td style={{ width: "12%" }}>{item.amount}</td>
                <td style={{ width: "20%" }}>{`${date.getDate()} - ${date.getMonth() + 1} - ${
                            date.getYear() + 1900
                          }`}</td>
                <td style={{ width: "20%" }}>
                  <button
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                    class="btn btn-danger"
                    style={{
                      margin: "0px 10px",
                      width: "60px",
                    }}
                  >
                    x??a
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#modalUpdate"
                    onClick={() => {
                      setItemUpdate({
                        name: item.name,
                        amount: item.amount,
                        price: item.price,
                        description: item.description,
                      });
                      setItemIdUpdate({ id: item.id });
                    }}
                    style={{
                      margin: "0px 10px",
                      width: "60px",
                    }}
                  >
                    s???a
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
              <form onSubmit={(e) => handleCreateItem(e)}>
                <div class="form-group">
                  <label for="1">Name</label>
                  <input
                    name="name"
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    type="text"
                    class="form-control"
                    id="1"
                    placeholder="Name"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="2">Amount</label>
                  <input
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    name="amount"
                    type="number"
                    class="form-control"
                    id="2"
                    placeholder="Amount"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="3">Price</label>
                  <input
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    name="price"
                    type="number"
                    class="form-control"
                    id="3"
                    placeholder="Price"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Description</label>
                  <textarea
                    onChange={(event) => {
                      handleOnChangeCreate(event);
                    }}
                    name="description"
                    style={{ width: "80%" }}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="image">Ch???n ???nh cho s???n ph???m</label>
                  <form enctype="multipart/form-data">
                    <input onChange={onChangeFile} type="file" name="file" />
                  </form>
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
                Update product
              </h1>
              <button
                type="button"
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={(e) => handleUpdateItem(e)}>
                <div class="form-group">
                  <label for="1">Name</label>
                  <input
                    defaultValue={itemUpdate.name}
                    name="name"
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    type="text"
                    class="form-control"
                    id="1"
                    placeholder="Name"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="2">Amount</label>
                  <input
                    defaultValue={itemUpdate.amount}
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    name="amount"
                    type="number"
                    class="form-control"
                    id="2"
                    placeholder="Amount"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="3">Price</label>
                  <input
                    defaultValue={itemUpdate.price}
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    name="price"
                    type="number"
                    class="form-control"
                    id="3"
                    placeholder="Price"
                    style={{ width: "70%" }}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Description</label>
                  <textarea
                    defaultValue={itemUpdate.description}
                    onChange={(event) => {
                      handleOnChangeUpdate(event);
                    }}
                    name="description"
                    style={{ width: "80%" }}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="image">Ch???n ???nh cho s???n ph???m</label>
                  <form enctype="multipart/form-data">
                    <input onChange={onChangeFile} type="file" name="file" />
                  </form>
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
export default ProductAdminPage;
