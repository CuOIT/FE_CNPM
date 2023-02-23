import React from "react";
import { useDataAuthRedux } from "../../redux/selector";
import "./profile.css"
import toast, { Toaster } from 'react-hot-toast';
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";




const enotify = (props) => toast.error(props);
const notify =  (props) => toast.success(props);

 
const ProfilePage = () => {
  
  const dataUserRedux = useDataAuthRedux();
  const day = new Date(dataUserRedux.birthday).getDate();
  const month = new Date(dataUserRedux.birthday).getMonth();
  const year = new Date(dataUserRedux.birthday).getFullYear();
  const hpbd = `${day}/${month + 1}/${year}`;

  const ranked = (props) => {
    const ranking = dataUserRedux.rank
    if(ranking === null){
      console.log("iron")
      return <img class="imgrank" src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/1.png?v=8"  alt="" />
    } else if(ranking === 1){
      console.log("bzone")
      return <img class="imgrank" src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=8" alt="" />
    } else if (ranking === 2){ 
      console.log("silve")
      return <img class="imgrank" src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=8" alt="" />
    } else if(ranking >=3){
      console.log("gold")
      return <img class="imgrank" src="https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=8" alt="" />
    }
    
  }
  const handleSaveProfile = (event) => {
    event.preventDefault();
    const { phone, name, email, birthday } =
      event.target;
    console.log(phone, name, email, birthday);
    const payload = {
      phone: phone.value,
      user_name: name.value,
      email: email.value,
      birthday: birthday.value,
    };
    fetchInstant("/api/edit-user-info-by-phone", METHOD.PUT, payload).then((res) => {
      console.log(res.message);
      if (res.code===0){
        notify(res.message);
      } else (enotify(res.message) )    
    });
  };

  console.log( useDataAuthRedux())

  const rankUser = dataUserRedux.rank
  
  return <>
   
   
  <div className="container rounded bg-white mt-5 mb-5"><Toaster></Toaster>
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://i.pinimg.com/736x/ed/c2/45/edc2452564d27b40568803c5c66de383.jpg" /><span className="font-weight-bold">{dataUserRedux.user_name}</span><span className="text-black-50">{dataUserRedux.email}</span><span> </span></div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Your profile</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6"><label className="labels">Name:</label> {dataUserRedux.user_name} </div>
                
              
                <div className="col-md-6"><label className="labels">ID:</label>{dataUserRedux.id}</div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Phone:
                </label>{dataUserRedux.phone} </div>
                <br/>
               
                <div className="col-md-12"><label className="labels">Address: 
                 </label> </div>
                <br/>
             
                <div className="col-md-12"><label className="labels">Birthday:
                </label>{hpbd} </div>
                <br/>
              
                <div className="col-md-12"><label className="labels">Email ID:
                </label>{dataUserRedux.email} </div>
               
              </div>
            
              <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" >Edit Profile</button></div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              
              <div className="col-md-12"><label className="labels">Your rank</label><div id = "rank">{ranked(rankUser)}</div></div> <br />
              
            </div>
          </div>
        </div>
      </div>    
      <div className="popup"> 
      <div class='title'>Edit profile</div>
        <div class="close-btn">X</div>
      <form  onSubmit={handleSaveProfile} >
              <div><label >ID:</label>{dataUserRedux.id}</div>
              <div className="field">Phone:
                <input id="phone" type="text" placeholder="Phone"  /> 
              </div>   

              <div className="field">Name:
                <input id="name" type="text" placeholder="Name"  />
              </div>
              <div className="field">Email:
                <input id="email" type="text" placeholder="Email"  />
              </div>
              <div className="field"> 
               
            
                </div>             
              <div className="field">  Birthday:
                <input
                  id="birthday"
                  type="date"
                  placeholder="Birthday"
                  
                />
               </div>
              <div className="form-btn">
                <div className=""></div>
                <input type="submit" value="save" />                              
              </div> 
              <div>      
              </div>
              </form>
      
       
         
      </div>           
      </>;
  
};
export default ProfilePage;