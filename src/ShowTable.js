/** @format */

import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Card } from 'react-bootstrap/';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Modal from 'react-modal';

function ShowTable() {
  const [data, setData] = useState([]);
  const [modalInfo, setModlaInfo] = useState([]);
  const [modalDodajInfo, setModalDodajInfo] = useState({ a: '', b: '', c: '' });
  const [openModal, setOpenModal] = useState(false);
  const [openDodaj, setOpenDodaj] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  const [addUser, setAddUser] = useState({
    name: '',
    surname: '',
    gender: '',
    DOB: '',
    start: '',
    contractType: '',
    contractTime: '',
    department: '',
    picture: '',
  });

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    axios.get(`http://localhost:3004/posts`).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  const DodajContent = (e) => {
    ModalContent(e);
    axios.get(`http://localhost:3004/dani/${e}`).then((res) => {
      setModalDodajInfo(res.data);

      console.log('modal data', res.data);
    });
  };

  const ModalContent = (e) => {
    axios.get(`http://localhost:3004/posts/${e}`).then((res) => {
      setModlaInfo(res.data);
      console.log('modal data', res.data);
    });
  };

  const postDodajInfo = () => {
    axios.post(`http://localhost:3004/dani`, modalDodajInfo).then((res) => {
      console.log('tu', res);
      window.location.reload(true);
    });
  };

  const postAddUser = () => {
    axios.post(`http://localhost:3004/posts`, addUser).then((res) => {
      console.log('user', res);
      window.location.reload(true);
    });
  };

  const handleDelete = (e) => {
    axios.delete(`http://localhost:3004/posts/${e}`).then((res) => {
      console.log('danie', res);
      handleDeleteAll(e);
      window.location.reload();
    }, []);
  };

  const handleDeleteAll = (e) => {
    axios.delete(`http://localhost:3004/dani/${e}`).then((res) => {
      console.log('danie', res);
    }, []);
  };

  return (
    <div>
      {/* Model za detalje zaposlenika */}
      <Modal style={customStyles} isOpen={openModal}>
        <Card style={{ width: '25rem' }}>
          <Card.Img variant='top' src={modalInfo.picture} />
          <Card.Body>
            <Card.Title>{modalInfo.name + ' ' + modalInfo.surname}</Card.Title>
            <Card.Text>{modalInfo.department}</Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>{modalInfo.gender}</ListGroupItem>
            <ListGroupItem>{modalInfo.DOB}</ListGroupItem>
            <ListGroupItem>{modalInfo.start}</ListGroupItem>
            <ListGroupItem>{modalInfo.contractType}.</ListGroupItem>
            <ListGroupItem>{modalInfo.contractTime}.</ListGroupItem>
            <ListGroupItem>{modalDodajInfo.a}.</ListGroupItem>
            <ListGroupItem>{modalDodajInfo.b}.</ListGroupItem>
            <ListGroupItem>{modalDodajInfo.c}.</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Button className='button' onClick={() => setOpenModal(false)}>
              Natrag na tablicu
            </Button>

            <Button
              variant='outline-info'
              className='button'
              onClick={() => setOpenDodaj(true)}>
              Dodatno
            </Button>
          </Card.Body>
        </Card>
      </Modal>

      {/* Modal za dodatno */}

      <Modal style={customStyles} isOpen={openDodaj}>
        <Card.Body>
          <Card.Title>DODAJ BROJ DANA GODIŠNJEG ODMORA:</Card.Title>
          <input
            className='modal_Add_Input'
            value={modalDodajInfo.a}
            onChange={(e) =>
              setModalDodajInfo({ ...modalDodajInfo, a: e.target.value })
            }
            placeholder='npr. 18'
            type='text'></input>
        </Card.Body>
        <Card.Body>
          <Card.Title>DODAJ BROJ SLOBODNIH DANA:</Card.Title>
          <input
            className='modal_Add_Input'
            value={modalDodajInfo.b}
            onChange={(e) =>
              setModalDodajInfo({ ...modalDodajInfo, b: e.target.value })
            }
            placeholder='npr. 10'
            type='text'></input>
        </Card.Body>
        <Card.Body>
          <Card.Title>DODAJ BROJ DANA PLAĆENOG DOPUSTA:</Card.Title>
          <input
            className='modal_Add_Input'
            value={modalDodajInfo.c}
            onChange={(e) =>
              setModalDodajInfo({ ...modalDodajInfo, c: e.target.value })
            }
            placeholder='npr. 7'
            type='text'></input>
        </Card.Body>
        <Button className='button' onClick={() => setOpenDodaj(false)}>
          Natrag na detalji
        </Button>
        <Button
          variant='outline-success'
          className='button'
          type='submit'
          onClick={() => postDodajInfo()}>
          Dodaj dane
        </Button>
      </Modal>

      {/* AddUser Modal */}
      <Modal style={customStyles} isOpen={openAddUser}>
        <Card.Body>
          <Card.Title>IME:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.name}
            onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
            placeholder='npr. Ivan'
            type='text'></input>
        </Card.Body>
        <Card.Body>
          <Card.Title>PREZIME:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.surname}
            onChange={(e) =>
              setAddUser({ ...addUser, surname: e.target.value })
            }
            placeholder='npr. Ivić'
            type='text'></input>
        </Card.Body>
        <Card.Body>
          <Card.Title>Spol:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.gender}
            onChange={(e) => setAddUser({ ...addUser, gender: e.target.value })}
            type='text'></input>

          <Card.Title>Godina rođenja:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.DOB}
            onChange={(e) => setAddUser({ ...addUser, DOB: e.target.value })}
            type='text'></input>
          <Card.Title>Početak rada:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.start}
            onChange={(e) => setAddUser({ ...addUser, start: e.target.value })}
            type='text'></input>
          <Card.Title>Ugovor:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.contractType}
            onChange={(e) =>
              setAddUser({ ...addUser, contractType: e.target.value })
            }
            type='text'></input>
          <Card.Title>Trajanje ugovora:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.contractTime}
            onChange={(e) =>
              setAddUser({ ...addUser, contractTime: e.target.value })
            }
            type='text'></input>
          <Card.Title>Odjel:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.department}
            onChange={(e) =>
              setAddUser({ ...addUser, department: e.target.value })
            }
            type='text'></input>
          <Card.Title>URL Slike:</Card.Title>
          <input
            className='modal_Add_Input'
            value={addUser.picture}
            onChange={(e) =>
              setAddUser({ ...addUser, picture: e.target.value })
            }
            type='text'></input>
        </Card.Body>

        <Card.Body>
          <Button className='button' onClick={() => setOpenAddUser(false)}>
            Natrag na tablicu
          </Button>
          <Button
            variant='outline-success'
            className='button'
            type='submit'
            onClick={postAddUser}>
            Dodaj korisnika
          </Button>
        </Card.Body>
      </Modal>

      {/* Početna tablica zaposlenika */}
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>IME</th>
            <th>PREZIME</th>
            <th>SLIKA</th>
            <th>DETALJI</th>
            <th>BRISANJE ZAPOSLENIKA</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.surname}</td>
              <th>
                <Button
                  onMouseDown={() => ModalContent(data.id)}
                  onMouseUp={() => setOpenModal(true)}>
                  {' '}
                  Prikaži sliku
                </Button>
              </th>
              <th>
                <Button
                  onMouseDown={() => DodajContent(data.id)}
                  onMouseUp={() => setOpenModal(true)}>
                  {' '}
                  Prikaži Detalje
                </Button>
              </th>
              <th>
                <Button
                  size='md'
                  variant='outline-danger'
                  className='button-delete'
                  onClick={() => handleDelete(data.id)}>
                  {' '}
                  Izbriši
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
        <div>
          <Button
            variant='outline-primary'
            onClick={() => setOpenAddUser(true)}
            className='button'>
            DODAJ ZAPOSLENIKA
          </Button>
        </div>
      </Table>
    </div>
  );
}
export default ShowTable;
