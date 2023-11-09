import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./global.css";
import history from "./history";

const ReTest = () => {
  const [inputs, setInputs] = useState({});
  const [fields, setFields] = useState(null);
  const [token, setToken] = useState("");
  const { state } = useParams();
  console.log("state", state);
  const getFields = async () => {
    const res = await axios
      .get("http://192.168.60.200:8001/count/get/option?base=select")
      .then(function (response) {
        return response?.data?.detail;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
    setFields(res);
  };
  useEffect(() => {
    getFields();
  }, []);
  const handleChange = (event) => {
    var checkboxes = document.getElementsByName("check");
    checkboxes.forEach((item) => {
      if (item !== event.target) item.checked = false;
    });
    const name = event.target.id;
    const value = event?.target?.checked;
    setInputs({ [name]: value });
    // setInputs(values => ({...values, [name]: value}))
  };
  const handleChangeM = (event) => {
    const name = event.target.name;
    const value = event?.target?.checked;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const componentRef = useRef();

  const handleSubmit = async (event) => {
    let name = "";
    event.preventDefault();
    fields?.map((item) => {
      name = item?.name;
    });

    let param = [];
    let count = 0;
    Object.keys(inputs).map((key) => {
      count += 1;
      if (inputs[key]) {
        param.push(`sub=${key}&`);
      }
    });
    const char = param.join("").toString();
    const params = char.slice(0, -1);
    if (state === "special") {
      if (params) {
        axios
          .get(
            `http://192.168.60.200:8001/count/special/create/?base=select&${params}`
          )
          .then(function (response) {
            if (response.status === 200) {
              setToken(response.data);

              history.push("/path1");
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {});
      } else {
        history.push("/path1");
      }
    } else {
      if (params) {
        axios
          .get(`http://192.168.60.200:8001/count/create/?base=select&${params}`)
          .then(function (response) {
            if (response.status === 200) {
              setToken(response.data);

              history.push("/path1");
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {});
      } else {
        history.push("/path1");
      }
    }
  };

  const handleSubmitM = async (event) => {
    let name = "";
    event.preventDefault();
    fields?.map((item) => {
      name = item?.name;
    });

    let param = [];
    let count = 0;
    Object.keys(inputs).map((key) => {
      count += 1;
      if (inputs[key]) {
        param.push(`sub=${key}&`);
      }
    });
    const char = param.join("").toString();
    const params = char.slice(0, -1);
    if (params) {
      const res = await axios
        .get(`http://192.168.60.200:8001/count/create/?base=select&${params}`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
      if (res?.status === 200) {
        setToken(res?.data);

        history.push("/path1");
      }
    } else {
      history.push("/path1");
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

  const data = [
    {
      id: 1,
      name: "Option 1",
      value: "Option1",
    },
    {
      id: 1,
      name: "Option 2",
      value: "Option2",
    },
    {
      id: 1,
      name: "Option 3",
      value: "Option3",
    },
    {
      id: 1,
      name: "Option 4",
      value: "Option4",
    },
    {
      id: 1,
      name: "Option 5",
      value: "Option5",
    },
  ];
  return (
    <div>
      <div className="rContainer">
        {/* <div className="header">
          <img
            className="logo"
            src="http://192.168.60.200:8001/dekstop/logo/read/logo.png"
            alt=""
            width="300px"
          />
        </div> */}

        <form className="retestForm" onSubmit={handleSubmit}>
          {/* <label class="">One
          <input type="checkbox" checked="checked" />
          <span class="checkmark"></span>
        </label> */}
          {/* {data?.map(item => (
              <>
              <input className="box" type="checkbox" id={item?.value} name={item?.value} 
                  value={inputs.item?.value || ""} 
                  onChange={handleChange} />
                  <label for={item?.name}><span className="label">{item?.name} </span></label>
                  <br />
                  <br />
              </>
            ))} */}
          {fields?.map((item) => (
            <label className="icontainer">
              {item?.name}
              <input
                className="checkbox"
                type="checkbox"
                name="check"
                id={item?.value}
                value={inputs.item?.value || ""}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
            </label>
          ))}
          <br />
          <br />
          {fields && (
            <button className="rbtn" type="submit">
              Ok
            </button>
          )}
        </form>

        <br />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            marginLeft: "1vw",
          }}
        >
          <img src="./qbot.png" style={{ width: "150px" }} alt="Logo" />
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
    </div>
  );
};

export default ReTest;
