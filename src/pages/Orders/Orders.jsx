
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, Filter, Page, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import './Orders.css';
import { registerLicense } from '@syncfusion/ej2-base';
import { closest } from '@syncfusion/ej2-base';
import { ordersGrid,  ordersGrid2} from '../DataConfig/dummy';
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { fetchInstant } from "../../../config";
import { METHOD } from "../../../constants";

registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpHaV5AQmFJfFBmRmlbeVRxdEU3HVdTRHRcQl9iSX5QdENiWH1cd3c=;Mgo+DSMBPh8sVXJ0S0J+XE9AflRBQmJLYVF2R2BJfFRycl9HYEwgOX1dQl9gSXxSdkVgW3lfcXZRQ2M=;ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxIfEx0RWFab116dlNMYVxBNQtUQF1hSn5Rd0VjWn1YcXVXQGFf;MTEwMzU1MUAzMjMwMmUzNDJlMzBqR2R4RXlIS0pzZHBITXJEZm9sQW8xOThnUjZDc1JTZU9iV0k3Rk9raWZNPQ==;MTEwMzU1MkAzMjMwMmUzNDJlMzBrek5FQzdkWG5qV01lS2VRSXpBc1A1OTNuRUl4US9VWWVQQ29ZN3NRZ0pVPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmBWf1FpR2NbfE5zfldAal1RVAciSV9jS31TdERjWXxcdnVURWJeUg==;MTEwMzU1NEAzMjMwMmUzNDJlMzBPVWtoTkQzQm1XQlNIN1IvaU9qdXBkalIwRGE4Myt4bjBUSGsrc20xZEhvPQ==;MTEwMzU1NUAzMjMwMmUzNDJlMzBoUTV1Z2NSYzhBVWdSWDNJRDVoQ0h2YVNXNC94dzNrV0I2MzVMSTdEMWg0PQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJXnxIfEx0RWFab116dlNMYVxBNQtUQF1hSn5Rd0VjWn1YcXVWT2Nf;MTEwMzU1N0AzMjMwMmUzNDJlMzBsaWY4a0V4TG9pd1RRem10d3JnRlRqQVlzcWMxdmpKazBOK0lSZUNzYXhFPQ==;MTEwMzU1OEAzMjMwMmUzNDJlMzBUQUhUM2gyY2k1bDVMTUNJM3p5Ry9rYzdzV0xZZ0lscnk3bkVoMThNamFZPQ==;MTEwMzU1OUAzMjMwMmUzNDJlMzBPVWtoTkQzQm1XQlNIN1IvaU9qdXBkalIwRGE4Myt4bjBUSGsrc20xZEhvPQ==');


const gridTemplate = (props) => {
  
  return (
    <div>
      <button onClick={
        () => {
          toast.success("Sucessfull !", { position: "top-left", autoClose: 500, hideProgressBar: true, })
        }}
        className="empData1  bg-primary hover:bg-primary-dark text-white  px-2 py-2 mr-1 border
        rounded custom-btn">Confirm</button>
      <button onClick={
        () => {
          toast.success("Sucessfull !", { position: "top-left", autoClose: 500, hideProgressBar: true, })
        }} className="empData2  bg-danger hover:bg-danger-dark text-white  py-2 px-2 border rounded custom-btn">Cancel</button>
    </div>
  );
}


const Orders = () => {
  
  const [listOrder, setListOrder] = useState([]);
  const toolbarOptions = ['Search'];
  let grid;
  
  const recordClick = (args) => {
    
    if (args.target.classList.contains('empData1')) {
      console.log(grid);
      let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
      console.log(rowObj);
      let id = rowObj.data.id;
      //console.log(rowObj);
      fetchInstant("/api/update-status-order", METHOD.POST, { id: id, isSuccessful: true }).then((res) => {
        getListOrder();
      });
      
    }
    else if (args.target.classList.contains('empData2')) {
      let rowObj = grid.getRowObjectFromUID(closest(args.target, '.e-row').getAttribute('data-uid'));
      let id = rowObj.data.id;
      //console.log(rowObj);
      fetchInstant("/api/update-status-order", METHOD.POST, { id: id, isSuccessful: false }).then((res) => {
        getListOrder();
      });
      
    }
  };


  const getListOrder = () => {
    fetchInstant("/api/get-staff-order", METHOD.GET, null, { status: 0 }).then((res) => {
      if (res.code === 0) {
        setListOrder(res.order);
        
      }
    });
  };

  useEffect(() => {
    getListOrder();
  }, []);

  const [listOrder2, setListOrder2] = useState([]);
  const getListOrder2 = () => {
    fetchInstant("/api/get-staff-order", METHOD.GET, null, { status: 1 }).then((res) => {
      if (res.code === 0) {
        setListOrder2(res.order);
      }
    });
  };

  const [listOrder3, setListOrder3] = useState([]);
  const getListOrder3 = () => {
    fetchInstant("/api/get-staff-order", METHOD.GET, null, { status: -1 }).then((res) => {
      if (res.code === 0) {
        setListOrder3(res.order);
      }
    });
  };


  const [activeTable, setActiveTable] = useState(1);

  const handleSwitchTable = (tableNum) => {
    setActiveTable(tableNum);
  }


  return (
    <div className="order ">

      <ToastContainer />

      <div className="border-b border-gray-200">
        <nav className="d-flex flex-row" aria-label="Tables">
          <button
            className={`px-4 py-2 font-medium text-sm border-b-4 border-b-0 ${activeTable === 1 ? 'border-indigo-500' : 'border-gray-300'} ${activeTable === 1 ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-200 focus:outline-none focus:bg-gray-200`}
            onClick={() => handleSwitchTable(1)}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-4 border-b-0 ${activeTable === 2 ? 'border-indigo-500' : 'border-gray-300'} ${activeTable === 2 ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-200 focus:outline-none focus:bg-gray-200`}
            onClick={() => {
              handleSwitchTable(2);
              getListOrder2();
            }}
          >
            Success
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-4 border-b-0 ${activeTable === 3 ? 'border-indigo-500' : 'border-gray-300'} ${activeTable === 3 ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-200 focus:outline-none focus:bg-gray-200`}
            onClick={() => {
              handleSwitchTable(3);
              getListOrder3();
            }}
          >
            Cancel
          </button>
        </nav>


        {activeTable === 1 && (
          <GridComponent
            dataSource={listOrder}
            allowPaging
            allowSorting
            pageSettings={{ pageSize: 30 }}
            toolbar={toolbarOptions}
            allowTextWrap={true}
            onClick={recordClick}
            ref={g => grid = g}
            
          >
            <ColumnsDirective>
              {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
              <ColumnDirective  width='160' template={gridTemplate} textAlign='Right' isPrimaryKey='true' />
            </ColumnsDirective>
            <Inject services={[Resize, Sort, Filter, Toolbar, Page]} />
          </GridComponent>
        )}

        {activeTable === 2 && (
          <GridComponent
            dataSource={listOrder2}
            allowPaging
            allowSorting
            pageSettings={{ pageSize: 30 }}
            toolbar={toolbarOptions}
            allowTextWrap={true}
          >
            <ColumnsDirective>
              {ordersGrid2.map((item, index) => <ColumnDirective key={index} {...item} />)}
            </ColumnsDirective>
            <Inject services={[Resize, Sort, Filter, Toolbar, Page]} />
          </GridComponent>
        )}
        {activeTable === 3 && (
          <GridComponent
            dataSource={listOrder3}
            allowPaging
            allowSorting
            pageSettings={{ pageSize: 30 }}
            toolbar={toolbarOptions}
            allowTextWrap={true}
          >
            <ColumnsDirective>
              {ordersGrid2.map((item, index) => <ColumnDirective key={index} {...item} />)}
            </ColumnsDirective>
            <Inject services={[Resize, Sort, Filter, Toolbar, Page]} />
          </GridComponent>
        )}
      </div>




    </div>
  );
};
export default Orders;
