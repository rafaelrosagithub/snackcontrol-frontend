import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Col, Form } from 'react-bootstrap';
import api from '../../../services/api'

import './index.css'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { CgChevronDoubleLeft } from 'react-icons/cg';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

interface IProfile {
    name: string;
    email: string;
    cpf: string;
    telephone: string;
}

const Profile: React.FC = () => {

    const user = JSON.parse(JSON.stringify(localStorage.getItem('ControleMerendaUser')));
    const user_id = JSON.parse(user).id
    console.log("user_id: " + user_id)

    const history = useHistory()

    const [model, setModel] = useState<IProfile>({
        name: '',
        email: '',
        cpf: '',
        telephone: ''
    })

    useEffect(() => {
        if (user_id !== undefined) {
            console.log(user_id);
            console.log(typeof user_id)
            findTask(user_id)
        }
    }, [user_id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (user_id !== undefined) {
            console.log("put... user");
            const response = await api.put(`/users/${user_id}`, model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Perfil editado com sucesso!',
                type: 'success',
                insert: 'top',
                container: 'top-center',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                  duration: 2000,
                },
              });
        } else {
            console.log("post... user");
            const response = await api.post('/users', model)
        }

        localStorage.setItem('name', model.name);
        findTask(user_id);

    }

    async function findTask(id: string) {
        console.log("findTask...");
        const response = await api.get(`users/${id}`);
        console.log(id);
        setModel({
            name: response.data.name,
            email: response.data.email,
            cpf: response.data.cpf,
            telephone: response.data.telephone
        })
    }

    function back() {
        history.goBack()
    }

    return (
        <>
            <Header />
            <br />
            <div className="container order-form">
                <h3 className="mr-auto navbar-nav">Perfil</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Row>
                            <Col xs={6}>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={model.name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Col>
                            <Col xs={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={model.email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={6}>
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    value={model.cpf}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Col>
                            <Col xs={6}>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="telephone"
                                    value={model.telephone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <div className="order-bottom">
                        <Button variant="outline-primary" className="btn btn-outline-primary" type="submit">
                            Salvar
                        </Button>
                        <Button variant="outline-primary" className="btn btn-outline-primary" onClick={back}>Voltar</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </>
    );
}

export default Profile;