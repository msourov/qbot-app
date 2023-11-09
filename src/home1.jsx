import logo from "./logo.svg";
import "./App.css";
import PrintPage from "./retest";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";
import axios from "axios";
import history from "./history";
import "./global.css";
import ReTest from "./retest";
import Other from "./other";
const Home = () => {
  const [token, setToken] = useState("");
  useEffect(async () => {
    const res = await axios
      .get("http://192.168.60.200:8001/dekstop/name/show")
      .then(function (response) {
        // handle success
        // console.log(response)
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
      console.log(res?.data);
      localStorage.setItem("name", res?.data?.name);
      localStorage.setItem("status", res?.data?.status);
    }
  }, []);

  const componentRef = useRef();
  const handle = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = async () => {
    const res = await axios
      .get("http://192.168.60.200:8001/count/create/?base=all")
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
      setToken(res?.data);
      handle();
    }
  };

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
      <div className="container">
        <div className="header">
          <img
            className="logo"
            src="http://192.168.60.200:8001/dekstop/logo/read/logo.png"
            alt=""
            width="80px"
          />
        </div>
        <div
          style={{
            aligSelf: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button class="btn" onClick={handlePrint}>
            Medical Checkup{" "}
          </button>
          <Link class="btn" to="/path2">
            Re-test
          </Link>
          <button class="btn" to="/path3">
            Other
          </button>
        </div>
        <br />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            marginLeft: "1vw",
          }}
        >
          <a
            href="#"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src="./qbot.png" style={{ width: "150px" }} alt="Logo" />
          </a>
          <p
            // className="bot-logo-text"
            style={{
              color: "black",
              margin: "0.5em auto",
              marginTop: "0",
              fontFamily: "Georgia, monospace",
              // fontWeight: "bold",
            }}
          >
            Queue Management Solution
          </p>
        </div>
        <marquee className="addv">
          A product of Transworld Mercantile Corporation. For more information
          please visit <strong>www.transworldbd.com</strong> or call{" "}
          <strong>+880 9613848484, +880 1860877300</strong>
        </marquee>
      </div>
    </>
  );
};

export default Home;
