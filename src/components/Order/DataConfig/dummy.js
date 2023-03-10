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

export function gridOrderText(props) {
  const item = props.detail_order;
  return (
    <div>
      {item.map((item) => (
        <p key={item.name} style={{ margin: 0 }}>
          {item.name}
          &ensp; x{item.quantity?item.quantity:0}
        </p>
      ))}
    </div>
  );
}

export default function gridOrderStatus(props) {
  let status = "";
  let statusBg = "";
  if (props.status == 0) {
    status = "Pending";
    statusBg = "#FEC90F";
  } else if (props.status == 1) {
    status = "Successfull";
    statusBg = "#8BE78B";
  } else {
    status = "Cancel";
    statusBg = "#c4233b";
  }

  return (
    <button
      type="button"
      style={{ background: statusBg }}
      className="text-white py-1 px-1 border-0 rounded-pill"
    >
      {status}
    </button>
  );
}

export const ordersGrid = [
  {
    field: "id",
    headerText: "ID",
    width: "70",
    textAlign: "Center",
  },

  {
    field: "user_name",
    headerText: "Customer Name",
    width: "130",
    textAlign: "Center",
  },

  {
    field: "detail_order",
    headerText: "Item",
    width: "200",
    template: gridOrderText,
    textAlign: "Center",
  },

  {
    field: "total_price",
    headerText: "Total Price",

    textAlign: "Center",

    width: "100",
  },
  {
    field: "voucher_code",
    headerText: "Voucher",

    textAlign: "Center",

    width: "120",
  },
  {
    field: "shipping_address",
    headerText: "Address",
    width: "170",
    textAlign: "Center",
  },
  {
    field: "createdAt",
    headerText: "Create Time",
    width: "190",
    textAlign: "Center",
  },
  {
    field: "status",
    headerText: "Status",
    template: gridOrderStatus,
    textAlign: "Center",
    width: "100",
  },
];

export const ordersGrid2 = [
  {
    field: "id",
    headerText: "ID",
    width: "70",
    textAlign: "Center",
  },

  {
    field: "user_name",
    headerText: "Customer Name",
    width: "130",
    textAlign: "Center",
  },

  {
    field: "detail_order",
    headerText: "Item",
    width: "190",
    template: gridOrderText,
    textAlign: "Center",
  },

  {
    field: "total_price",
    headerText: "Total Price",

    textAlign: "Center",

    width: "120",
  },

  {
    field: "voucher_code",
    headerText: "Voucher",

    textAlign: "Center",

    width: "120",
  },

  {
    field: "shipping_address",
    headerText: "Address",
    width: "170",
    textAlign: "Center",
  },
  {
    field: "updatedAt",
    headerText: "Update Time",
    width: "190",
    textAlign: "Center",
  },
  {
    field: "status",
    headerText: "Status",
    template: gridOrderStatus,
    textAlign: "Center",
    width: "100",
  },
];
