import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Breadcrumb, Button, Card, Col, Form, Row } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Routes } from '../routes';

function PegawaiEdit() {
    const history = useHistory();
    const [id, setId] = useState(useParams().id)
    const [nama, setNama] = useState('');
    const [tempat_lahir, setTempatLahir] = useState('');
    const [tanggal_lahir, setTanggalLahir] = useState('');
    const [jenis_kelamin, setJenisKelamin] = useState('');
    const [agama, setAgama] = useState('');
    const [nohp, setNohp] = useState('');
    const [photo, setPhoto] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get(`/pegawai/${id}`)
        .then(function (response) {
            let pegawai = response.data;
            setNama(pegawai.nama);
            setTempatLahir(pegawai.tempat_lahir);
            setTanggalLahir(pegawai.tanggal_lahir);
            setJenisKelamin(pegawai.jenis_kelamin);
            setAgama(pegawai.agama);
            setNohp(pegawai.nohp);
            setPhoto(pegawai.photo);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
    }, [])

    const handleUpdate = () => {
        setIsSaving(true);
        axios.put(`/pegawai/${id}`, {
            nama: nama,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            jenis_kelamin: jenis_kelamin,
            agama: agama,
            nohp: nohp,
            photo: photo,
        })
        .then(function (response) {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Pegawai updated successfully!',
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
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("Error Response:");
                console.log("Data", error.response.data);
                console.log("Status", error.response.status);
            } else if (error.request) {
                console.log("Error Request");
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the 
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                console.log("Error Else");
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            // console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        });
    }

    return (
        <>
            <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="mb-4 mb-lg-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Interview</Breadcrumb.Item>
                        <Breadcrumb.Item>Pegawai</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit Pegawai</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Edit Pegawai</h4>
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
                    <Form>
                        <Row className="justify-content-center align-items-center">
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control type="file" name='photo' onChange={(event)=>{setPhoto(event.target.value)}}/>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" name='nama' placeholder="Nama" onChange={(event)=>{setNama(event.target.value)}} value={nama}/>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tempat Lahir</Form.Label>
                                    <Form.Control type="text" name='tempat_lahir' placeholder="Tempat Lahir" onChange={(event)=>{setTempatLahir(event.target.value)}} value={tempat_lahir}/>
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal Lahir</Form.Label>
                                    <Form.Control type="date" name='tanggal_lahir' placeholder="Tanggal Lahir" onChange={(event)=>{setTanggalLahir(event.target.value)}} value={tanggal_lahir}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jenis Kelamin</Form.Label>
                                    <Form.Select name='jenis_kelamin' onChange={(event)=>{setJenisKelamin(event.target.value)}} value={jenis_kelamin}>
                                        <option defaultValue>Jenis Kelamin</option>
                                        <option value={'Laki-Laki'}>Laki-Laki</option>
                                        <option value={'Perempuan'}>Perempuan</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Agama</Form.Label>
                                    <Form.Control type="text" placeholder="Agama" name='agama' onChange={(event)=>{setAgama(event.target.value)}} value={agama}/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>No HP</Form.Label>
                                    <Form.Control type="text" placeholder="No HP" name='nohp' onChange={(event)=>{setNohp(event.target.value)}} value={nohp}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className='text-center mt-3'>
                            <Button disabled={isSaving} onClick={handleUpdate} variant="tertiary" className="m-1 w-50">Update Pegawai</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default PegawaiEdit;