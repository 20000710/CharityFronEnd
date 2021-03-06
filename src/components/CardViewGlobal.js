/** @format */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import {
  getDataEvent,
  postDataEvent,
  deleteDataEvent,
} from "../Redux/Actions/HistoryActions";

import ProgressBar from "react-bootstrap/ProgressBar";

import { Card } from "react-bootstrap";
function CardView(props) {
  console.log("props awal", props);
  const [mainEvent, setMainEvent] = useState("");
  const getData = props.getDataEvent;
  const [histori, setHistori] = useState([]);
  const handleDesc = (Id) => {
    props.history.push(`/history/${Id}`);
  };

  useEffect(() => {
    Axios.get(`https://gobekenapi.herokuapp.com/histories`).then((response) => {
      setHistori(response.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        {histori.map((item, index) => (
          <div className="col-md-4 col-sm-12" key="index">
            <div
              className="card  rounded-lg border-0 cardhistory"
              key={item.Id}
            >
              <img src={item.Img} className="card-img-top" alt="..." />

              <div className="card-body">
                <div className="card-title">
                  <h4 className="text-dark my-0">{item.JudulEvent}</h4>
                  <p className="text-muted my-0 date">Berakhir {item.Expire}</p>
                  {/* <hr className="mt-0" /> */}
                </div>
                <p className="text-dark">{item.DeskripsiEvent}</p>
                <ProgressBar
                  style={{ height: "5px" }}
                  variant="danger"
                  now={100}
                />
                <p className="text-dark my-0">Total donasi</p>
                <div className="eventp">
                  <p className="text-dark">Rp.{item.TotalDonasi}</p>
                  <p className="text-dark">
                    Target Donasi Rp.{item.TargetDonasi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

// UNTUK MENGAMBIL STATE DARI STORE

export default withRouter(CardView);
