import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table, Image } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Thomas from "../assets/img/team/thomas.jpg";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default () => {

    const history = useHistory();
    const  [usersList, setusersList] = useState([]);
  
    useEffect(() => {
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            history.push("/sign-in");
        } else {
            fetchusersList();
        }
    }, []);
  
    const fetchusersList = () => {
        axios.get('/users')
        .then(function (response) {
            setusersList(response.data.users);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="mb-4 mb-lg-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Interview</Breadcrumb.Item>
                        <Breadcrumb.Item active>Users List</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Users List</h4>
                    {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    {/* <Button variant="primary" size="sm">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New User
                    </Button>
                    <ButtonGroup className="ms-3">
                        <Button variant="outline-primary" size="sm">Share</Button>
                        <Button variant="outline-primary" size="sm">Export</Button>
                    </ButtonGroup> */}
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
                            <Dropdown.Menu className="dropdown-menu-right">
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
                                <th className="border-bottom">Name</th>
                                <th className="border-bottom">Email</th>
                                <th className="border-bottom">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
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