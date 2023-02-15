
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, Filter, Page, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import './Orders.css';
import { registerLicense } from '@syncfusion/ej2-base';
import { closest } from '@syncfusion/ej2-base';
import { ordersGrid } from '../DataConfig/dummy';
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { fetchInstant } from "../../config";
import { METHOD } from "../../constants";

registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpHaV5AQmFJfFBmRmlbeVRxdEU3HVdTRHRcQl9iSX5QdENiWH1cd3c=;Mgo+DSMBPh8sVXJ0S0J+XE9AflRBQmJLYVF2R2BJfFRycl9HYEwgOX1dQl9gSXxSdkVgW3lfcXZRQ2M=;ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxIfEx0RWFab116dlNMYVxBNQtUQF1hSn5Rd0VjWn1YcXVXQGFf;MTEwMzU1MUAzMjMwMmUzNDJlMzBqR2R4RXlIS0pzZHBITXJEZm9sQW8xOThnUjZDc1JTZU9iV0k3Rk9raWZNPQ==;MTEwMzU1MkAzMjMwMmUzNDJlMzBrek5FQzdkWG5qV01lS2VRSXpBc1A1OTNuRUl4US9VWWVQQ29ZN3NRZ0pVPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmBWf1FpR2NbfE5zfldAal1RVAciSV9jS31TdERjWXxcdnVURWJeUg==;MTEwMzU1NEAzMjMwMmUzNDJlMzBPVWtoTkQzQm1XQlNIN1IvaU9qdXBkalIwRGE4Myt4bjBUSGsrc20xZEhvPQ==;MTEwMzU1NUAzMjMwMmUzNDJlMzBoUTV1Z2NSYzhBVWdSWDNJRDVoQ0h2YVNXNC94dzNrV0I2MzVMSTdEMWg0PQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJXnxIfEx0RWFab116dlNMYVxBNQtUQF1hSn5Rd0VjWn1YcXVWT2Nf;MTEwMzU1N0AzMjMwMmUzNDJlMzBsaWY4a0V4TG9pd1RRem10d3JnRlRqQVlzcWMxdmpKazBOK0lSZUNzYXhFPQ==;MTEwMzU1OEAzMjMwMmUzNDJlMzBUQUhUM2gyY2k1bDVMTUNJM3p5Ry9rYzdzV0xZZ0lscnk3bkVoMThNamFZPQ==;MTEwMzU1OUAzMjMwMmUzNDJlMzBPVWtoTkQzQm1XQlNIN1IvaU9qdXBkalIwRGE4Myt4bjBUSGsrc20xZEhvPQ==');

const Orders = () => {
  const [submit, setSubmit] = useState(false);
  const toolbarOptions = ['Search'];
  let grid;
  const gridTemplate = (props) => {
    setSubmit(false);
    return (
      <div>
        <button onClick={
          () => {
            toast.success("Sucessfull !", { position: "top-left", autoClose: 500, hideProgressBar: true, })
          }}
          className="empData1  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-2 mr-1 border
       border-blue-700 rounded">Confirm</button>
        <button onClick={
          () => {
            toast.success("Sucessfull !", { position: "top-left", autoClose: 500, hideProgressBar: true, })
          }} className="empData2  bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-2 border
       border-blue-700 rounded">Cancel</button>
      </div>
    );
  };
  const recordClick = (args) => {
    if (args.target.classList.contains('empData1')) {
      let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
      let id = rowObj.data.id;
      //console.log(rowObj);
      console.log(id);
      fetchInstant("/api/update-status-order", METHOD.POST, { id: id, isSuccessful: true }).then((res) => {
        console.log(res);
      });
      setSubmit(true);
    }
    else if (args.target.classList.contains('empData2')) {
      let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
      let id = rowObj.data.id;
      //console.log(rowObj);
      console.log(id);
      fetchInstant("/api/update-status-order", METHOD.POST, { id: id, isSuccessful: false }).then((res) => {
        console.log(res);
      });
      setSubmit(true);
    }
  };

  const [listOrder, setListOrder] = useState([]);

  const getListOrder = () => {
    fetchInstant("/api/get-staff-order", METHOD.GET, null, { status: 0 }).then((res) => {
      if (res.code === 0) {
        setListOrder(res.order);
        console.log(res.order);
      }
    });
  };

  useEffect(() => {
    getListOrder();
  }, [submit]);


  return (
    <div className="order m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className=" mb-10">

        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Pending Order
        </p>
      </div>
      <ToastContainer />
      <GridComponent

        dataSource={listOrder}
        allowPaging
        allowSorting
        toolbar={toolbarOptions}
        allowTextWrap={true}

        onClick={recordClick}
        ref={g => grid = g}

      >
        <ColumnsDirective>

          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}

          <ColumnDirective headerText='' width='170' template={gridTemplate} textAlign='Right' isPrimaryKey='true' />


        </ColumnsDirective>
        <Inject services={[Resize, Sort, Filter, Toolbar, Page]} />
      </GridComponent>
    </div>
  );
};
export default Orders;
