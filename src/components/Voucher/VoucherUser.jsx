// xem, tim kiem

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";
import { updateUserDataRedux } from "../../redux/action/auth";
import * as Types from "./../../redux/constants";
import "./style.css";

const VoucherUser = () => {
    function myFunction() {
        // var input, filter, table, tr, td, i;
        // input = document.getElementById("myInput");
        // filter = input.value.toUpperCase();
        // table = document.getElementById("myTable");
        // tr = table.getElementsByTagName("tr");
        // for (i = 0; i < tr.length; i++) {
        //   td = tr[i].getElementsByTagName("td")[0];
        //   if (td) {
        //     txtValue = td.textContent || td.innerText;
        //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //       tr[i].style.display = "";
        //     } else {
        //       tr[i].style.display = "none";
        //     }
        //   }
        // }
      }

  return (
    <div>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        <div className="w3-container w3-green w3-padding-32 w3-center">
            <h1 className="w3-cursive">Kho Voucher</h1><button class="w3-button w3-right w3-white w3-round-xlarge">Thoát <i class="fa fa-sign-out"></i></button>
        </div>

        <div class="w3-container w3-padding-64 w3-xxlarge">
            <input class="w3-input w3-content w3-center w3-pale-green w3-round-xxlarge" 
                type="text" 
                placeholder="Tìm kiếm voucher"
                id="myInput" 
                onkeyup="myFunction()" />
            <div class="w3-content w3-padding-64">
                <div class="w3-container w3-white w3-round w3-padding">
                    <h1>
                        <b>Giảm 5%</b><button class="w3-button w3-right w3-green w3-round-xlarge">Use</button>
                        <p>Đơn tối thiểu 40k</p>
                    </h1>
                    <hr />
                    <h1>
                        <b>Giảm 15%</b><button class="w3-button w3-right w3-green w3-round-xlarge">Use</button>
                        <p>Đơn trên 200k</p>
                    </h1>

                </div>
                
            </div>
        </div>

    </div>
    );
};

export default VoucherUser;
