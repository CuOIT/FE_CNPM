
import React from "react";


export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />


  </div>
);

export  function gridOrderText(props) {
  const item = props.OrderItems;
  const quanity = props.Quanity;
  return <div>
    {
      item.map((item,index) =>
        <p key={item}>
          {item}
          &ensp;&ensp;&ensp;
          
        </p>)
    }
  </div>

};

export default function gridOrderStatus(props){
  console.log(props)
  let status=''
  let statusBg=''
  if (props.status == 0){
    status = 'Pending'
    statusBg='#FEC90F';

  }
  else if(props.status == 1){
    status = 'Successfull'
    statusBg='#8BE78B';
  }
  else {
    status = "Cancel"
    statusBg = '#c4233b'
  }
  
  return <button
    type="button"
    style={{ background: statusBg}}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    
  >
    
    {status}
    
  </button>
};




export const ordersGrid = [
  {
    field: 'id',
    headerText: 'ID',
    width: '80',
    textAlign: 'Center',
  },

  {
    field: 'user_name',
    headerText: 'Customer Name',
    width: '120',
    textAlign: 'Center',
  },

  {
    field:"name",
    headerText: 'Item',
    width: '130',
    
    textAlign: 'Center',
  },
  

  {
    field: 'total_price',
    headerText: 'Total Price',
    
    textAlign: 'Center',
    
    width: '100',
  },
  
  {
    field: 'shipping_address',
    headerText: 'Address',
    width: '150',
    textAlign: 'Center',
  },
  {
    field:"createdAt",
    headerText: 'Create Time',
    width: '200',
    textAlign: 'Center',
  },
  { 
    field: 'status',
    headerText: 'Status',
    template: gridOrderStatus, 
    textAlign: 'Center',
    width: '100',
  },
];



export const ordersData = [
  
];



