import React from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table, Image } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Thomas from "../assets/img/team/thomas.jpg";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../routes";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Profile1 from "../assets/img/team/profile-picture-1.jpg";

export default () => {
    const history = useHistory();
    const  [pegawaiList, setpegawaiList] = useState([]);
  
    useEffect(() => {
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            history.push("/sign-in");
        } else {
              fetchpegawaiList();
        }
    }, [])
  
    const fetchpegawaiList = () => {
        axios.get('/pegawai')
        .then(function (response) {
          setpegawaiList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/pegawai/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Pegawai deleted!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchpegawaiList();
                })
                .catch(function (error) {
                    Swal.fire({
                         icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }

    return (
        <>
            <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="mb-4 mb-lg-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Interview</Breadcrumb.Item>
                        <Breadcrumb.Item active>Pegawai List</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Pegawai List</h4>
                    {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Button as={Link} to={Routes.PegawaiCreate.path} variant="primary" size="sm">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Pegawai
                    </Button>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={9} lg={4} className="d-flex">
                        <InputGroup className="me-2 me-lg-3">
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search" />
                        </InputGroup>
                    </Col>
                    <Col xs={3} lg={8} className="text-end">
                        <Dropdown as={ButtonGroup} className="me-2">
                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm icon-gray">
                                    <FontAwesomeIcon icon={faSlidersH} />
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="custom-dropdown-menu" style={{ right: 'unset!important' }}>
                                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold">
                                    10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                                </Dropdown.Item>
                                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>

            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body>
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Foto</th>
                                <th className="border-bottom">Nama</th>
                                <th className="border-bottom">Tempat, Tanggal Lahir</th>
                                <th className="border-bottom">Jenis Kelamin</th>
                                <th className="border-bottom">Agama</th>
                                <th className="border-bottom">No HP</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pegawaiList.map((pegawai, key) => {
                                return (
                                    <tr key={key}>
                                        <td><img src={`http://localhost:8080/uploads/foto_pegawai/${pegawai.photo}`} height={150}/></td>
                                        <td>{pegawai.nama}</td>
                                        <td>{pegawai.tempat_lahir}, {pegawai.tanggal_lahir}</td>
                                        <td>{pegawai.jenis_kelamin}</td>
                                        <td>{pegawai.agama}</td>
                                        <td>{pegawai.nohp}</td>
                                        <td>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/pegawai/edit/${pegawai.id}`}>
                                                Edit
                                            </Link>
                                            <Button variant='outline-danger' onClick={()=>handleDelete(pegawai.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};