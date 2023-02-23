import React from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { useEffect, useState } from "react";
import "./user.css"
import toast, { Toaster } from "react-hot-toast";



const UserListPage = () => {  
    const [handleDelete, setHandleDelete] = useState({ status: 0 });
    useEffect(() => {

    }, [
      JSON.parse(localStorage.getUser("allUser")),
      handleDelete.status,
    ]);

    const deleteUser = (id) => {
      const payload = {
        id,
      };
      fetchInstant("/api/delete-user", METHOD.DELETE, payload).then((res) => {
        if (res.msg.code === 0) {
          fetchInstant("/api/get-all-users", METHOD.GET).then((res) => {
            localStorage.setUser("allUser", JSON.stringify(res.users));
            setHandleDelete({ status: 1 });
          });
        }
      });
    };

    const renderUser = () => {
      if (JSON.parse(localStorage.getUser("allUser")) === null) {
      } else {
        return JSON.parse(localStorage.getUser("allUser")).map((user) => {
          return (
            <tr style={{ height: "55px" }}>
              <th style={{ width: "6%" }} scope="row">
                {user.id}
              </th>
              <td style={{ width: "30%" }}>{user.user_name}</td>
              <td style={{ width: "12%" }}>{user.email}</td>
              <td style={{ width: "12%" }}>{user.birthday}</td>
              <td style={{ width: "20%" }}>{user.role}</td>
              <td style={{ width: "20%" }}>{user.rank}</td>
              <td style={{ width: "20%" }}>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                  class="btn btn-danger"
                  style={{
                    margin: "0px 10px",
                    width: "60px",
                  }}
                >
                  delete
                </button>
                </td>
          </tr>
        );
      });
    }
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
              Email
            </th>
            <th style={{ width: "12%" }} scope="col">
              Birthday
            </th>
            <th style={{ width: "20%" }} scope="col">
              Role
            </th>
            <th style={{ width: "20%" }} scope="col">
              Rank
            </th>
            <th style={{ width: "20%" }} scope="col">
              Manager
            </th>
          </tr>
        </thead>
        <tbody class="table-group-divider">{renderUser()}</tbody>
      </table>
      </div>
  );
  
//     const [listUser, setListUser] = useState([])
   
//     const getAllUser = () => {
//         fetchInstant("/api/get-all-users", METHOD.GET).then((res) => {
//        const arrayUser = [res.users]
//       console.log(res.users);
//       setListUser(res.users); 
//       console.log(arrayUser);  
     
//        var table = document.getElementById("myTable")
//        let list = res.users;
             
//        for(let i=0;i<= res.users.length;i++){
//          const hpbd = (props) => {
//            const day = new Date(list[i].birthday).getDate();
//            const month = new Date(list[i].birthday).getMonth();
//            const year = new Date(list[i].birthday).getFullYear();
//            return `${day}/${month + 1}/${year}`;}  
//          const decent = (props) => {
//            const role = list[i].role
//            if(role == 1){
           
//             return "Admin"
//            }else if(role==2){
//             return "Staff"
//            }else{
//             return "User"
//            }
//          }

//      const deleteUser =(props) => {
//       fetchInstant("/api/delete-user", METHOD.DELETE ).then((res) => {
//         if (res.code === 0 && res.message === "OK") {
//           setListUser(res.user);
//         console.log("deleted");

//          }
            
//           });
//          }
         


//          console.log(res)
//          console.log(list[i].phone);
//          console.log(list[i].user_name);
//           var row = `<tr id="trid">
//           <td> ${list[i].id} </td>
//           <td>${list[i].user_name}</td>
//           <td>${list[i].email}</td>
//           <td>${hpbd(list[i].birthday)}</td>
//           <td>${list[i].phone}</td>
//           <td>${decent(list[i].role)}</td>  
//           <td>${list[i].rank}</td>  
//           <td id = "delete"><div>
//             <buton type="button" onclick=${deleteUser(list[i].id)} >delete</buton>
//           </div></td>    
             
//          </tr>`
//         table.innerHTML+= row;
        
//       }
        
//     });
//   };
    
   
//   useEffect(() => {
//     getAllUser();
//  },[]);
     
  
    
//     return (
//       <section className="intro">   
//         <div className="mask d-flex align-items-center h-100">
//           <div className="container">
//             <div className="row justify-content-center">
              
//               <div className="col-12"><input type="text" id="myInput" onkeyup = 'tableSearch()' placeholder=" Search by name"></input>
//                 <div className="table-responsive bg-white">
//                   <table className="table mb-0">
//                     <thead id="head">
//                       <tr>
//                         <th scope="col">Id</th>
//                         <th scope="col">Name</th>
//                         <th scope="col">Email</th>
//                         <th scope="col">Birthday</th>
//                         <th scope="col">Phone</th>
//                         <th scope="col">Role</th>
//                         <th scope="col">Rank</th>
//                         <th scope="col"></th>

//                       </tr>
//                     </thead>
//                     <tbody id="myTable">                    
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>     
//     </section>
//   );
}
  export default UserListPage;
  