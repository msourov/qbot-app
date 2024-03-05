import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";
import axios from "axios";
import history from "./history";

const Home = () => {
  const [token, setToken] = useState("");
  const [options, setOptions] = useState("");
  const [options2, setOptions2] = useState("");

  const getData = async () => {
    const res = await axios.get("http://192.168.60.81:8000/dekstop/name/show");
    const res1 = await axios
      .get("http://192.168.60.81:8000/dekstop/all/view")
      .then(function (response) {
        // handle success
        return response;
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
    const res2 = await axios
      .get("http://192.168.60.81:8000/dekstop/all/view")
      .then(function (response) {
        // handle success
        return response;
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
    // if (res?.status === 200) {
    //   localStorage.setItem("name", res?.data?.name);
    //   localStorage.setItem("status", res?.data?.status);
    // }
    // if (res2.status === 200) {
    //   setOptions2(res2?.data);
    // }
    if (res1.status === 200) {
      setOptions(res1?.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const componentRef = useRef();
  const handle = useReactToPrint({
    content: () => componentRef.current,
  });

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
            src="http://192.168.60.81:8000/dekstop/logo/read/logo.png"
            alt=""
            width="350px"
          />
        </div>
        <div
          style={{
            aligSelf: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {options
            ? options?.map((item) => (
                <>
                  {item?.categories === "mandatory" ? (
                    <button className="btn">{item?.name}</button>
                  ) : null}
                  {item?.categories === "normal" ? (
                    <>
                      <button
                        className="btn"
                        onClick={() => history.push("/path2")}
                        style={{ marginBottom: "20px" }}
                      >
                        {item?.name}
                      </button>
                      {/* <br /> */}
                      {/*<button
                        className="btn"
                        onClick={() => history.push("/path2/special")}
                        style={{ marginBottom: "20px" }}
                      >
                        S-{item?.name}
                      </button> */}
                    </>
                  ) : null}
                  {item?.categories === "single" ? (
                    <button
                      class="btn"
                      onClick={() => history.push("/path3")}
                      style={{ marginBottom: "20px" }}
                    >
                      {item?.name}
                    </button>
                  ) : null}
                </>
              ))
            : null}
          {
            <button
              class="btn"
              onClick={() =>
                axios.get(
                  "http://192.168.60.81:8000/count/create?base=select&sub=wd"
                )
              }
              style={{ marginBottom: "20px" }}
            >
              Withdraw
            </button>
          }
          {
            <button
              class="btn"
              onClick={() =>
                axios.get(
                  "http://192.168.60.81:8000/count/create?base=select&sub=dp"
                )
              }
              style={{ marginBottom: "20px" }}
            >
              Deposit
            </button>
          }
          {options2
            ? options2?.map((item) => (
                <>
                  {item?.categories === "mandatory" ? (
                    <button className="btn">{item?.name}</button>
                  ) : null}
                  {item?.categories === "normal" ? (
                    <>
                      <button
                        className="btn"
                        onClick={() => history.push("/path4")}
                        style={{ marginBottom: "20px" }}
                      >
                        {item?.name}
                      </button>
                      {/* <br /> */}
                      {/* <button
                        className="btn"
                        onClick={() => history.push("/path4/special")}
                      >
                        S-{item?.name}
                      </button>*/}
                    </>
                  ) : null}
                  {item?.categories === "single" ? (
                    <button class="btn" onClick={() => history.push("/path3")}>
                      {item?.name}
                    </button>
                  ) : null}
                </>
              ))
            : null}
        </div>
        {/* <br /> */}
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
        {/* <marquee className="addv">
          A product of Transworld Mercantile Corporation. For more information
          please visit <strong>www.transworldbd.com</strong> or call{" "}
          <strong>+880 9613848484, +880 1860877300</strong>
        </marquee> */}
      </div>
    </>
  );
};

export default Home;
