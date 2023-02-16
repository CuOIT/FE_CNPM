import Orders from "./Orders";

import LogOut from './LogOut';

import CoffeeLogo from './CoffeeLogo.png'


import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";

let tmp = false;
export { tmp };

export default function Order() {

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(false);
  };
  const Logout = () => {
    if (open === true) {
      return <LogOut open={open} handleClick={handleClick} />;
    }
  };

  return (
    <div >
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-16 w-16"
                  src={CoffeeLogo}
                  alt="Logo"
                />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                 
                </div>
              </div>
            </div>
            <div className="Logout">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  onClick={() => setOpen(true)}
                  class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                >
                  Log out
                </button>
              </div>
              <Logout />
            </div>
          </div>
        </div>
      </Disclosure>

      <main className="bg-white" style={{minHeight:700}}>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <Orders />
        </div>
      </main>
      
    </div>
  );
}
