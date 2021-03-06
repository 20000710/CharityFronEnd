import React, { useState, useEffect } from "react";
import { withRouter, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import swal from "sweetalert";
import { Navbar, Nav, Button, Modal, Form } from "react-bootstrap";
import jwt from "jwt-decode";

function Header(props) {
  var querystring = require("querystring");
  const history = useHistory();
  const isLogged = useSelector((state) => state.user);

  const [Target, setTarget] = useState();
  var decode;
  var id;
  const handleChangeTarget = (e) => {
    setTarget(e.target.value);
  };
  console.log(Target, "target");
  if (localStorage.getItem("token") != null) {
    decode = jwt(localStorage.getItem("token"));
    id = decode.id;
  } else {
    console.log("cek gk login");
  }
  console.log(isLogged);
  const [Img, setImg] = useState("");
  const [judulEvent, setJudulEvent] = useState("");
  const [deskripsiEvent, setDeskripsiEvent] = useState("");
  const [Expire, setExpire] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => {
    {
      isLogged.isLogged == false ? history.push("/login") : setShow(true);
    }
  };
  const handleClose = () => setShow(false);
  const handleLogoff = () => {
    window.location.reload();
    props.history.push("/");
    localStorage.removeItem("token");
  };
  const handleChangeImg = (e) => {
    setImg(e.target.value);
  };
  const handleChangeJudul = (e) => {
    setJudulEvent(e.target.value);
  };
  const handleChangeDesc = (e) => {
    setDeskripsiEvent(e.target.value);
  };

  const handleChangeExpire = (e) => {
    setExpire(e.target.value);
  };

  const handlePostEvent = (e) => {
    const id_user = id;
    const img = Img;
    const name = judulEvent;
    const deskripsi = deskripsiEvent;
    const target_donasi = Target;
    const event_type = 2;
    const tanggal = Date.now();
    const expire = Expire;
    const status = 2;
    const success = Axios.post(
      `https://gobekenapi.herokuapp.com/events`,
      querystring.stringify({
        id_user,
        img,
        name,
        deskripsi,
        target_donasi,
        event_type,
        tanggal,
        expire,

        status,
      })
    ).then((response) => {
      console.log(response.data);
    });

    {
      success
        ? swal("Terimakasih", "Buat Event Berhasil!", "success")
        : swal("Gagal", "Harap Buat ulang", "error");
    }
    history.push("/");
    setShow(false);
    setImg("");
    setJudulEvent("");
    setDeskripsiEvent("");
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="py-3">
        <Navbar.Brand href="/">
          <img
            src="https://charity.w3itexperts.com/images/logo.png"
            alt="img"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link
              href="#"
              className="mx-2"
              onClick={() => props.history.push("/")}
            >
              Beranda
            </Nav.Link>
            <Nav.Link
              href="#"
              className="mx-2"
              onClick={() => props.history.push("/events")}
            >
              Acara
            </Nav.Link>
            <Nav.Link
              href="#"
              className="mx-2"
              onClick={() => props.history.push("/history")}
            >
              Riwayat
            </Nav.Link>
            <Nav.Link
              href="#"
              className="mx-2"
              onClick={() => props.history.push("/about")}
            >
              Tentang
            </Nav.Link>
            <Nav.Link
              href="#"
              className="mx-2"
              onClick={() => props.history.push("/contact")}
            >
              Hubungi
            </Nav.Link>
            <Nav.Link
              href="#"
              className="mx-2"
              onClick={() => props.history.push("/profile")}
            >
              Profil
            </Nav.Link>
            {localStorage.getItem("token") === null ? (
              <Nav.Link
                href="#"
                className="mx-2"
                onClick={() => props.history.push("/login")}
              >
                Masuk
              </Nav.Link>
            ) : (
              <Nav.Link href="#" className="mx-2" onClick={handleLogoff}>
                Keluar
              </Nav.Link>
            )}
            {/* <Button
              variant="dark"
              className="ml-5 mr-1"
              onClick={() => props.history.push("/login")}
            >
              Login
            </Button> */}
            <Button
              onClick={handleShow}
              style={{ backgroundColor: "#F75D08", border: "none" }}
              className="mx-5"
            >
              Galang Dana
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* modal event */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Buat Event Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="my-0">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Upload Image :</Form.Label>
              <Form.Control
                name="Img"
                placeholder="Upload gambar"
                value={Img}
                onChange={handleChangeImg}
              />
              <Form.Label>Judul Event :</Form.Label>
              <Form.Control
                name="judul_event"
                placeholder="Judul Event"
                value={judulEvent}
                onChange={handleChangeJudul}
              />
            </Form.Group>
            <Form.Label>Target Donasi:</Form.Label>
            <select
              name="target"
              className="form-control"
              value={Target}
              onChange={handleChangeTarget}
              as="select"
            >
              <option value="1000000">1000000</option>
              <option value="5000000">5000000</option>
              <option value="10000000">10000000</option>
              <option value="15000000">15000000</option>
              <option value="20000000">20000000</option>
            </select>
            <Form.Label>Deskripsi Event :</Form.Label>
            <textarea
              className="form-control"
              name="deskripsi_event"
              placeholder="Deskripsi Event"
              value={deskripsiEvent}
              onChange={handleChangeDesc}
            />

            <Button
              type="submit"
              onClick={handlePostEvent}
              style={{ backgroundColor: "#F75D08", border: "none" }}
              className="my-5"
            >
              Buat Acara
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default withRouter(Header);
