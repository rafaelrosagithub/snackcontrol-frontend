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
    title: string;
    unid_medida: string;
    product_category: string;
}

const Tasks: React.FC = () => {

    const history = useHistory()
    const id = JSON.parse(JSON.stringify(useParams())).id;
    const [model, setModel] = useState<ITask>({
        title: '',
        unid_medida: '',
        product_category: ''
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
            console.log("put...");
            const response = await api.put(`/product/${id}`, model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Produto editado com sucesso!',
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
            console.log("Product post()");
            console.log("model.unid_medida: " + model.unid_medida)
            const response = await api.post('/product', model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Produto inserido com sucesso!',
                type: 'success',
                insert: 'top',
                container: 'top-center',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                  duration: 2000,
                },
              });
        }
        back()

    }

    async function findTask(id: string) {
        console.log("Product findTask()");
        const response = await api.get(`product/${id}`);
        console.log(id);
        setModel({
            title: response.data.title,
            unid_medida: response.data.unid_medida,
            product_category: response.data.product_category
        })
    }

    function back() {
        history.goBack()
    }

    const current_url = window.location.href;
    var label;
    if (current_url.indexOf("product-create") !== -1) {
        console.log("ok");
        label = "Inserir";
    }
    if (current_url.indexOf("product-edit") !== -1) {
        console.log("ok");
        label = "Editar";
    }

    return (
        <>
            <Header />
            <br />
            <div className="container order-form">
                <h3 className="mr-auto navbar-nav">{label} Produto</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Produto</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col xs={2}>
                                <Form.Label>Unid. Medida</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="unid_medida"
                                    value={model.unid_medida}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                >
                                    <option value="">Selecione</option>
                                    <option value="kg">kg</option>
                                    <option value="mg">mg</option>
                                    <option value="L">L</option>
                                    <option value="un">un</option>
                                    <option value="ml">ml</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_category"
                            value={model.product_category}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
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