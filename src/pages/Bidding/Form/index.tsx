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
    id: string;
    title: string;
    name: string;
    qtd: number;
    provider: string;
    user_creation: string;
    email: string;
    unid_medida: string;
    lote: string;
}

const Tasks: React.FC = () => {

    const user = JSON.parse(JSON.stringify(localStorage.getItem('ControleMerendaUser')));
    const nameUser = JSON.parse(user).name;
    const email = JSON.parse(user).email;

    console.log(email);
    const history = useHistory()
    const id = JSON.parse(JSON.stringify(useParams())).id;
    const [model, setModel] = useState<ITask>({
        id: id,
        title: '',
        name: '',
        qtd: 0,
        provider: '',
        user_creation: nameUser,
        email: email,
        unid_medida: '',
        lote: ''
    })

    useEffect(() => {
        if (id !== undefined) {
            console.log(id);
            console.log(typeof id)
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
            const response = await api.put(`/bidding/${id}`, model)
        } else {
            console.log("post..." + model.id);
            const product = await api.get(`/product/${model.id}`)
            model.title = product.data.title;
            model.unid_medida = product.data.unid_medida;
            model.provider = model.name;
            const year  = new Date().getFullYear();
            model.lote = year.toString().substring(2,4);
            const response = await api.post('/bidding', model)
            const responseSotck = await api.post('/stock', model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Licitação inserido com sucesso!',
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

    const [products, setProducts] = useState<ITask[]>([])

    useEffect(() => {
        findProducts()
    }, [])

    async function findProducts() {
        const response = await api.get('/product')
        console.log(response)
        setProducts(response.data)
    }

    const [providers, setProviders] = useState<ITask[]>([])

    useEffect(() => {
        findProviders()
    }, [])

    async function findProviders() {
        const response = await api.get('/providers')
        console.log(response)
        setProviders(response.data)
    }

    function back() {
        history.goBack()
    }

    const current_url = window.location.href;
    var label;
    if (current_url.indexOf("bidding-create") !== -1) {
        console.log("ok");
        label = "Inserir";
    }
    console.log(current_url.indexOf('order-edit'));

    return (
        <>
            <Header />
            <br />
            <div className="container order-form">
                <h3 className="mr-auto navbar-nav">{label} Licitação</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Produto</Form.Label>
                        <Form.Control
                            type="text"
                            name="id"
                            value={model.id}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            as="select"
                        >
                            <option value="">Selecione</option>
                            {
                                products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.title}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col xs={2}>
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="qtd"
                                    value={model.qtd}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fornecedor</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={model.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            as="select"
                        >
                            <option value="">Selecione</option>
                            {
                                providers.map(provider => (
                                    <option key={provider.id} value={provider.name}>
                                        {provider.name}
                                    </option>
                                ))
                            }
                        </Form.Control>
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