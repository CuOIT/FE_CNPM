import React from "react";
import { useDataAuthRedux } from "../../redux/selector";
import "./profile.css"

const ProfilePage = () => {
  const dataUserRedux = useDataAuthRedux();
  const day = new Date(dataUserRedux.birthday).getDate();
  const month = new Date(dataUserRedux.birthday).getMonth();
  const year = new Date(dataUserRedux.birthday).getFullYear();
  const hpbd = `${day}/${month + 1}/${year}`;


  return <>
   
   
  <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://i.pinimg.com/736x/ed/c2/45/edc2452564d27b40568803c5c66de383.jpg" /><span className="font-weight-bold">{dataUserRedux.user_name}</span><span className="text-black-50">{dataUserRedux.email}</span><span> </span></div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control"  defaultValue={dataUserRedux.user_name} /></div>
                <div className="col-md-6"><label className="labels">ID</label><input type="text" className="form-control" defaultValue={dataUserRedux.id} /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Phone</label><input type="text" className="form-control" placeholder="enter phone number" defaultValue={dataUserRedux.phone} /></div>
                
                <div className="col-md-12"><label className="labels">Address </label><input type="text" className="form-control"  defaultValue /></div>
                
                <div className="col-md-12"><label className="labels">Birthday</label><input type="text" className="form-control"  defaultValue ={hpbd} /></div>
                
                <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control"  defaultValue ={dataUserRedux.email} /></div>
               
              </div>
            
              <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              
              <div className="col-md-12"><label className="labels">Your rank</label><input type="text" className="form-control" placeholder="rank" defaultValue /></div> <br />
              
            </div>
          </div>
        </div>
      </div></>;
  
};
export default ProfilePage;
