import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./global.css";
import history from "./history";

const Other = () => {
  const [inputs, setInputs] = useState(null);
  const [fields, setFields] = useState(null);
  const [token, setToken] = useState("");
  const getFields = async () => {
    const res = await axios
      .get("http://192.168.60.200:8001/count/get/option?base=single")
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
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
    if (params) {
      const res = await axios
        .get(`http://192.168.60.200:8001/count/create/?base=single&${params}`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
      if (res?.status === 200) {
        setToken(res?.data);
        handlePrint();
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
        <div className="header">
          <img
            className="logo"
            src="http://192.168.60.200:8001/dekstop/logo/read/logo.png"
            alt=""
            width="300px"
          />
        </div>

        <form className="retestForm" onSubmit={handleSubmit}>
          {/* {fields?.map(item => (
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
            <label class="icontainer">
              {item?.name}
              <input
                type="checkbox"
                name="check"
                id={item?.value}
                value={inputs?.item?.value || ""}
                onChange={handleChange}
              />
              <span class="checkmark"></span>
            </label>
          ))}
          {/* <input type="submit" /> */}
          <br />
          <br />
          <button className="rbtn" type="submit">
            Ok
          </button>
        </form>

        <br />

        <img className="staticImg" src="assets/qbot.png" width="120px" />
        <h3 className="staticTxt">Queue Management Solution</h3>
        <marquee className="addv">
          A product of Transworld Mercantile Corporation. For more information
          please visit <strong>www.transworldbd.com</strong> or call{" "}
          <strong>+880 9613848484, +880 1860877300</strong>
        </marquee>
      </div>

      <div style={{ display: "none" }}>
        <div className="printContainer" ref={componentRef}>
          <img
            className="pImg"
            src="http://192.168.60.200:8001/dekstop/logo/read/logo.png"
            alt=""
          />
          <p className="pName">{localStorage.getItem("name")}</p>
          <p className="pToken">
            {token < 10
              ? "T-00" + token
              : token < 100
              ? "T-0" + token
              : "T-" + token}
          </p>
          <p className="pDate">{date()}</p>
        </div>
      </div>
    </div>
  );
};

export default Other;
