import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Col, Form } from 'react-bootstrap';
import api from '../../../services/api'

import './index.css'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

interface ITask {
    name: string;
    email: string;
    cnpj: string;
    telephone: string;
}

const Tasks: React.FC = () => {

    const history = useHistory()
    const id = JSON.parse(JSON.stringify(useParams())).id;
    const [model, setModel] = useState<ITask>({
        name: '',
        email: '',
        cnpj: '',
        telephone: ''
    })

    useEffect(() => {
        if (id !== undefined) {
            console.log(id);
            console.log(typeof id)
            findTask(id)
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            console.log("put... Provider");
            const response = await api.put(`/providers/${id}`, model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Fornecedor editado com sucesso!',
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
            console.log("post...");
            const response = await api.post('/providers', model)
        }
        back()

    }

    async function findTask(id: string) {
        console.log("findTask...");
        const response = await api.get(`providers/${id}`);
        console.log(id);
        setModel({
            name: response.data.name,
            email: response.data.email,
            cnpj: response.data.cnpj,
            telephone: response.data.telephone
        })
    }

    function back() {
        history.goBack()
    }

    const current_url = window.location.href;
    var label;
    if (current_url.indexOf("provider-edit") !== -1) {
        console.log("ok");
        label = "Editar";
    }

    console.log(current_url.indexOf('order-edit'));

    return (
        <>
            <Header />
            <br />
            <div className="container order-form">
                <h3 className="mr-auto navbar-nav">{label} Fornecedor</h3>
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
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cnpj"
                                    value={model.cnpj}
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

export default Tasks;