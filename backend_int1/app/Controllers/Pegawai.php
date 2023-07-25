<?php

namespace App\Controllers;

use App\Models\Pegawai as ModelsPegawai;
use CodeIgniter\RESTful\ResourceController;

class Pegawai extends ResourceController
{
    private $pegawai;

    public function __construct()
    {
        $this->pegawai = new ModelsPegawai();
    }

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        $pegawais = $this->pegawai->findAll();
        return $this->respond($pegawais);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $pegawai = $this->pegawai->find($id);
        if ($pegawai) {
            return $this->respond($pegawai);
        }
        return $this->failNotFound('Pegawai not found!');
    }


    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $validation = $this->validate([
            'nama' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required',
            'jenis_kelamin' => 'required',
            'agama' => 'required',
            'nohp' => 'required',
            'photo' => 'required',
        ]);

        if (!$validation) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $pegawai = [
            'nama' => $this->request->getVar('nama'),
            'tempat_lahir' => $this->request->getVar('tempat_lahir'),
            'tanggal_lahir' => $this->request->getVar('tanggal_lahir'),
            'jenis_kelamin' => $this->request->getVar('jenis_kelamin'),
            'agama' => $this->request->getVar('agama'),
            'nohp' => $this->request->getVar('nohp'),
            'photo' => $this->request->getVar('photo'),
        ];

        $pegawaiId = $this->pegawai->insert($pegawai);
        if ($pegawaiId) {
            $pegawai['id'] = $pegawaiId;
            return $this->respondCreated($pegawai);
        }
        return $this->fail('Something went wrong, pegawai not created!');
    }


    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $pegawai = $this->pegawai->find($id);
        if ($pegawai) {

            $validation = $this->validate([
                'nama' => 'required',
                'tempat_lahir' => 'required',
                'tanggal_lahir' => 'required',
                'jenis_kelamin' => 'required',
                'agama' => 'required',
                'nohp' => 'required',
                'photo' => 'required',
            ]);

            if (!$validation) {
                return $this->failValidationErrors($this->validator->getErrors());
            }

            $pegawai = [
                'id' => $id,
                'nama' => $this->request->getVar('nama'),
                'tempat_lahir' => $this->request->getVar('tempat_lahir'),
                'tanggal_lahir' => $this->request->getVar('tanggal_lahir'),
                'jenis_kelamin' => $this->request->getVar('jenis_kelamin'),
                'agama' => $this->request->getVar('agama'),
                'nohp' => $this->request->getVar('nohp'),
                'photo' => $this->request->getVar('photo'),
            ];

            $response = $this->pegawai->save($pegawai);
            if ($response) {
                return $this->respond($pegawai);
            }
            return $this->fail('Something went wrong, pegawai not updated');
        }
        return $this->failNotFound('Pegawai not found!');
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $pegawai = $this->pegawai->find($id);
        if ($pegawai) {
            $response = $this->pegawai->delete($id);
            if ($response) {
                return $this->respond($pegawai);
            }
            return $this->fail('Something went wrong, pegawai cannot be deleted!');
        }
        return $this->failNotFound('Pegawai not found!');
    }
}
