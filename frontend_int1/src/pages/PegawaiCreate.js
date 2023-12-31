import React, {useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Breadcrumb, Button, Card, Col, Form, Row } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../routes';
import defaultPlaceholder from '../assets/img/default-placeholder.png';

function PegawaiCreate() {
    const history = useHistory();
    const [nama, setNama] = useState('');
    const [tempat_lahir, setTempatLahir] = useState('');
    const [tanggal_lahir, setTanggalLahir] = useState('');
    const [jenis_kelamin, setJenisKelamin] = useState('');
    const [agama, setAgama] = useState('');
    const [nohp, setNohp] = useState('');
    const [photo, setPhoto] = useState('');
    const [preview, setPreview] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const loadImage = (e) => {
        const image = e.target.files[0];
        setPhoto(image);
        setPreview(URL.createObjectURL(image));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('tempat_lahir', tempat_lahir);
        formData.append('tanggal_lahir', tanggal_lahir);
        formData.append('jenis_kelamin', jenis_kelamin);
        formData.append('agama', agama);
        formData.append('nohp', nohp);
        formData.append('photo', photo);
        try {
            await axios.post('/pegawai', formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            }).then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Pegawai saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsSaving(false);
                setNama('');
                setTempatLahir('');
                setTanggalLahir('');
                setJenisKelamin('');
                setAgama('');
                setNohp('');
                setPhoto('');
                history.push('/pegawai');
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("Error Response:");
                    console.log("Data", error.response.data.messages);
                    var ul = '<ul>';
                    var closeul = '</ul>';
                    var message = '';
                    const messages = error.response.data.messages;
                    Object.keys(messages).map((key, index) => {
                        message += '<li>'+messages[key]+'</li>';
                    })
                    // error.response.data.messages.map(value=> {
                    //     message += '<li>'+value+'</li>';
                    // });
                    Swal.fire({
                        icon: 'error',
                        html: ul + message + closeul,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (error.request) {
                    console.log("Error Request");
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the 
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    console.log("Error Else");
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                setIsSaving(false);
            });
        } catch(error) {
            console.log("Error", error);
        }
    }

    return (
        <>
            <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="mb-4 mb-lg-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Interview</Breadcrumb.Item>
                        <Breadcrumb.Item>Pegawai</Breadcrumb.Item>
                        <Breadcrumb.Item active>Add New Pegawai</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Add New Pegawai</h4>
                    {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Button as={Link} to={Routes.Pegawai.path} variant="primary" size="sm">
                        <FontAwesomeIcon icon={faCaretLeft} className="me-2" /> Back
                    </Button>
                </div>
            </div>

            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body>
                    <Form onSubmit={handleSave}>
                        <Row className="justify-content-center align-items-center">
                            <Col lg={6} md={6} sm={12}>
                                <Row>
                                    <Col lg={4} md={6} sm={12}>
                                        {preview ? (
                                            <figure className="figure">
                                                <img src={preview} className="figure-img img-fluid rounded" alt="image"/>
                                            </figure>
                                        ) : (
                                            <figure className="figure">
                                                <img src={defaultPlaceholder} className="figure-img img-fluid rounded" alt="image"/>
                                            </figure>
                                        )}
                                    </Col>
                                    <Col lg={8} md={6} sm={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Photo</Form.Label>
                                            
                                            <Form.Control type="file" name='photo' onChange={loadImage}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" name='nama' placeholder="Nama" onChange={(event)=>{setNama(event.target.value)}}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jenis Kelamin</Form.Label>
                                    <Form.Select name='jenis_kelamin' onChange={(event)=>{setJenisKelamin(event.target.value)}}>
                                        <option defaultValue>Jenis Kelamin</option>
                                        <option value={'Laki-Laki'}>Laki-Laki</option>
                                        <option value={'Perempuan'}>Perempuan</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tempat Lahir</Form.Label>
                                    <Form.Control type="text" name='tempat_lahir' placeholder="Tempat Lahir" onChange={(event)=>{setTempatLahir(event.target.value)}}/>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Lahir</Form.Label>
                                    <Form.Control type="date" name='tanggal_lahir' placeholder="Tanggal Lahir" onChange={(event)=>{setTanggalLahir(event.target.value)}}/>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Agama</Form.Label>
                                    <Form.Control type="text" placeholder="Agama" name='agama' onChange={(event)=>{setAgama(event.target.value)}}/>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>No HP</Form.Label>
                                    <Form.Control type="text" placeholder="No HP" name='nohp' onChange={(event)=>{setNohp(event.target.value)}}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className='text-center mt-3'>
                            <Button disabled={isSaving} type='submit' variant="tertiary" className="m-1 w-50">Save Pegawai</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default PegawaiCreate;