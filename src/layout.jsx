import logo from "./logo.svg";
import "./App.css";
import PrintPage from "./retest";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";
import history from "./history";
import "./global.css";
import Switcher from "./switcher";
const Layout = () => {
  const [token, setToken] = useState("");
  useEffect(async () => {
    const res = await axios
      .get("http://192.168.60.200:8001/dekstop/name/show")
      .then(function (response) {
        // handle success
        return response;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    if (res?.status === 200) {
      localStorage.setItem("name", res?.data?.name);
      localStorage.setItem("status", res?.data?.status);
    }
  }, []);

  const date = () => {
    const x = new Date();

    const y = "0" + x.getHours();
    const z = "0" + x.getMinutes();
    const s = "0" + x.getSeconds();
    const h = "0" + x.getDate();
    const ano = x.getFullYear().toString().substr(-2);
    const ms = x.getMonth();
    const meses = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      y.substr(-2) +
      ":" +
      z.substr(-2) +
      ":" +
      s.substr(-2) +
      " -  " +
      h.substr(-2) +
      "/" +
      meses[ms]
    );
  };
  return (
    <>
      <Switcher />
    </>
  );
};

export default Layout;
