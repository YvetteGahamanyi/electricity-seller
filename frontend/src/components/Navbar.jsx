import React from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <div>
      <div class="d-flex flex-row justify-content-between m-5">
        <div class="p-2 ">
          {" "}
          <h1> ElectricitySeller</h1>
        </div>
        <div class="p-2 text-right">
          <p>
            +250 786 123 987
            <br />
            electricitySeller@gmail.com
          </p>
        </div>
      </div>
      <div class="d-flex flex-row bg-primary justify-content-between w-75 mx-auto shadow rounded">
        <div
          class={`py-3 w-100 pointer ${
            location.pathname === "/" ? "bg-white  text-primary " : "bg-primary"
          }`}
        >
          <Link
            class={`${
              location.pathname === "/" ? "text-primary " : "text-white"
            }`}
            to={"/"}
          >
            {" "}
            Home
          </Link>
        </div>
        <div
          class={`py-3 w-100 pointer ${
            location.pathname === "/buy"
              ? "bg-white  text-primary "
              : "bg-primary"
          }`}
        >
          <Link
            class={`${
              location.pathname === "/buy" ? "text-primary " : "text-white"
            }`}
            to={"/buy"}
          >
            {" "}
            Buy electricity{" "}
          </Link>
        </div>
        <div
          class={`py-3 w-100 pointer ${
            location.pathname === "/check"
              ? "bg-white  text-primary "
              : "bg-primary"
          }`}
        >
          {" "}
          <Link
            class={`${
              location.pathname === "/check" ? "text-primary " : "text-white"
            }`}
            to={"/check"}
          >
            {" "}
            Check electricity
          </Link>
        </div>
      </div>
    </div>
  );
}
