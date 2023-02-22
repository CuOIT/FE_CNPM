import React from "react";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { useEffect, useState } from "react";
import "./user.css"



const UserListPage = () => {  
    const [listUser, setListUser] = useState([])
   
    const getAllUser = () => {
        fetchInstant("/api/get-all-users", METHOD.GET).then((res) => {
       const arrayUser = [res.users]
      console.log(res.users);
      setListUser(res.users); 
      console.log(arrayUser);  
     
       var table = document.getElementById("myTable")
       let list = res.users;
             
       for(let i=0;i<= res.users.length;i++){
         const hpbd = (props) => {
           const day = new Date(list[i].birthday).getDate();
           const month = new Date(list[i].birthday).getMonth();
           const year = new Date(list[i].birthday).getFullYear();
           return `${day}/${month + 1}/${year}`;}  
         const decent = (props) => {
           const role = list[i].role
           if(role == 1){
           
            return "Admin"
           }else if(role==2){
            return "Staff"
           }else{
            return "User"
           }
         }

     const deleteUser =(props) => {
      fetchInstant("/api/delete-user", METHOD.DELETE ).then((res) => {
        if (res.code === 0 && res.message === "OK") {
          setListUser(res.user);
        console.log("deleted");

         }
            
          });
         }
         


         console.log(res)
         console.log(list[i].phone);
         console.log(list[i].user_name);
          var row = `<tr id="trid">
          <td> ${list[i].id} </td>
          <td>${list[i].user_name}</td>
          <td>${list[i].email}</td>
          <td>${hpbd(list[i].birthday)}</td>
          <td>${list[i].phone}</td>
          <td>${decent(list[i].role)}</td>  
          <td>${list[i].rank}</td>  
          <td id = "delete"><div>
            <buton type="button" onclick=${deleteUser(list[i].id)} >delete</buton>
          </div></td>    
             
         </tr>`
        table.innerHTML+= row;
        
      }
        
    });
  };
    
   
  useEffect(() => {
    getAllUser();
 },[]);
     
  
    
    return (
      <section className="intro">   
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              
              <div className="col-12"><input type="text" id="myInput" onkeyup = 'tableSearch()' placeholder=" Search by name"></input>
                <div className="table-responsive bg-white">
                  <table className="table mb-0">
                    <thead id="head">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Role</th>
                        <th scope="col">Rank</th>
                        <th scope="col"></th>

                      </tr>
                    </thead>
                    <tbody id="myTable">                    
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>     
    </section>
  );
}
  export default UserListPage;
  