import React, { useEffect, useState } from "react";
import { useDataAuthRedux } from "../../redux/selector";
import "./profile.css";
import toast, { Toaster } from "react-hot-toast";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { useDispatch } from "react-redux";
import { updateUserDataRedux } from "../../redux/action/auth";
import { calculateAggregate } from "@syncfusion/ej2-react-grids";

const enotify = (props) => toast.error(props);
const notify = (props) => toast.success(props);

const ProfilePage = () => {
  const dataUserRedux = useDataAuthRedux();
  console.log(dataUserRedux);
  const dispatch = useDispatch();
  const day = new Date(dataUserRedux.birthday).getDate();
  const month = new Date(dataUserRedux.birthday).getMonth();
  const year = new Date(dataUserRedux.birthday).getFullYear();
  const hpbd = `${day}/${month + 1}/${year}`;
  const [user, setUser] = useState({
    id: dataUserRedux.id,
    phone: dataUserRedux.phone,
    email: dataUserRedux.email,
    user_name: dataUserRedux.user_name,
    gender: dataUserRedux.gender,
    birthday: dataUserRedux.birthday,
    role: 3,
  });
  const [userUpdate, setUserUpdate] = useState({
    id: dataUserRedux.id,
    phone: dataUserRedux.phone,
    email: dataUserRedux.email,
    user_name: dataUserRedux.user_name,
    gender: dataUserRedux.gender,
    birthday: dataUserRedux.birthday,
    role: 3,
  });
  const handleGenderChange = (e) => {
    setUserUpdate({ ...userUpdate, gender: e.target.value });
  };

  const ranked = (ranking) => {
    console.log(ranking);
    if (ranking === undefined) {
      return (
        <img
          class="imgrank"
          src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/1.png?v=8"
          alt=""
        />
      );
    } else if (ranking === 1) {
      console.log("bzone");
      return (
        <img
          class="imgrank"
          src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=8"
          alt=""
        />
      );
    } else if (ranking === 2) {
      console.log("silve");
      return (
        <img
          class="imgrank"
          src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=8"
          alt=""
        />
      );
    } else if (ranking >= 3) {
      console.log("gold");
      return (
        <img
          class="imgrank"
          src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=8"
          alt=""
        />
      );
    }
  };
  const handleSaveProfile = () => {
    // event.preventDefault();
    const payload = userUpdate;
    fetchInstant("/api/edit-user-info-by-phone", METHOD.PUT, payload).then(
      (res) => {
        console.log(res);
        if (res.message.code === 0) {
          notify("Updated successfully");
          dispatch(updateUserDataRedux(userUpdate));
        } else enotify("Failed");
      }
    );
  };

  const rankUser = dataUserRedux.rank;

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <Toaster></Toaster>
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://i.pinimg.com/736x/ed/c2/45/edc2452564d27b40568803c5c66de383.jpg"
              />
              <span className="font-weight-bold">
                {dataUserRedux.user_name}
              </span>
              <span className="text-black-50">{dataUserRedux.email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Your profile</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Name:</label>{" "}
                  {dataUserRedux.user_name}{" "}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Phone:</label>
                  {dataUserRedux.phone}{" "}
                </div>
                <br />

                <div className="col-md-12">
                  <label className="labels">Birthday:</label>
                  {hpbd}{" "}
                </div>
                <br />

                <div className="col-md-12">
                  <label className="labels">Email ID:</label>
                  {dataUserRedux.email}{" "}
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editProfile"
                >
                  Edit Profile
                </button>

                <div
                  class="modal fade"
                  id="editProfile"
                  tabindex="-1"
                  aria-labelledby="editProfile"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Edit profile
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div className="mb-3 editField">
                            Name:
                            <input
                              id="name"
                              type="text"
                              value={userUpdate.user_name}
                              onChange={(e) => {
                                setUserUpdate({
                                  ...userUpdate,
                                  user_name: e.target.value,
                                });
                              }}
                              placeholder="Name"
                            />
                          </div>
                          <div className="mb-3 editField">
                            Email:
                            <input
                              id="email"
                              type="text"
                              value={userUpdate.email}
                              onChange={(e) => {
                                setUserUpdate({
                                  ...userUpdate,
                                  email: e.target.value,
                                });
                              }}
                              placeholder="Email"
                            />
                          </div>
                          <div className="field"></div>
                          <div className="field editField">
                            {" "}
                            Birthday:
                            <input
                              id="birthday"
                              type="date"
                              onChange={(e) => {
                                setUserUpdate({
                                  ...userUpdate,
                                  birthday: e.target.value,
                                });
                              }}
                              placeholder="Birthday"
                            />
                          </div>
                          <div className="mb-3 gender editField">
                            <div>
                              <label
                                style={{
                                  marginRight: "20px",
                                }}
                              >
                                Gender
                              </label>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                style={{
                                  display: "inline",
                                  width: "20px",
                                }}
                                id="inlineRadio1"
                                value="1"
                                onChange={handleGenderChange}
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio1"
                              >
                                Male
                              </label>
                            </div>
                            <div className="editField form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                style={{
                                  display: "inline",
                                  width: "20px",
                                }}
                                id="inlineRadio2"
                                onChange={handleGenderChange}
                                value="0"
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio2"
                              >
                                Female
                              </label>
                            </div>
                          </div>
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
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={handleSaveProfile}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="col-md-12">
                <label className="labels">Your rank</label>
                <div id="rank">{ranked(rankUser)}</div>
              </div>{" "}
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="popup">
        <div class="title">Edit profile</div>
        <div class="close-btn">X</div>
        
      </div> */}
    </>
  );
};
export default ProfilePage;
