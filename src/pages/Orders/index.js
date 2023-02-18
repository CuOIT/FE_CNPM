import Orders from "./Orders";
import React from "react";

export default function Order() {
  return (
    <div >
      <main className="bg-white" style={{minHeight:1000}}>
        <div className="mx-auto py-5 " style={{maxWidth:1360}} >
          <Orders/>
        </div>
      </main>
      
    </div>
  );
}
