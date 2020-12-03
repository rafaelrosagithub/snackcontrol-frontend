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
    qtd: number;
    unid_medida: string;
    lote: string;
    escola: string;
    id_stock: string;
}

const Tasks: React.FC = () => {

    const history = useHistory()
    const id = JSON.parse(JSON.stringify(useParams())).id;
    const [model, setModel] = useState<ITask>({
        id: id,
        title: '',
        qtd: 0,
        unid_medida: '',
        lote: '',
        escola: '',
        id_stock: ''
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
            console.log("order id: " + id)
            console.log("model.id_stock: " + model.id_stock)
            const order = await api.get(`order/${id}`);
            const stock = await api.get(`/stock/${model.id_stock}`)
            console.log("stock.qtd: " + stock.data.qtd);
            console.log("order.qtd: " + order.data.qtd);
            console.log("model.qtd: " + model.qtd);
            const response = await api.put(`/order/${id}`, model)
            model.qtd = stock.data.qtd + (order.data.qtd - model.qtd); 
            console.log("model.qtd result: " + model.qtd)
            const responseSotck = await api.put(`/stock/${model.id_stock}`, model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Pedido editado com sucesso!',
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
            const stock = await api.get(`/stock/${model.id}`)
            console.log("post order..." + model.id);
            model.title = stock.data.title;
            const qtd = stock.data.qtd;
            model.unid_medida = stock.data.unid_medida;
            model.escola = model.escola;
            const year = new Date().getFullYear();
            model.lote = year.toString().substring(2, 4);
            console.log("model: " + model.escola)
            const response = await api.post('/order', model)
            model.qtd = qtd - model.qtd;
            const responseSotck = await api.put(`/stock/${model.id}`, model)
            
        }
        back()

    }

    async function findTask(id: string) {
        console.log("OrderForm findTask()");
        const response = await api.get(`order/${id}`);
        console.log(response);
        setModel({
            id: response.data.id,
            title: response.data.title,
            qtd: response.data.qtd,
            unid_medida: response.data.unid_medida,
            lote: response.data.lote,
            escola: response.data.escola,
            id_stock: response.data.id_stock
        })
    }

    const [stocks, setStocks] = useState<ITask[]>([])

    useEffect(() => {
        fetchStocks()
    }, [])

    async function fetchStocks() {
        const response = await api.get('/stock')
        console.log(response)
        setStocks(response.data)
    }

    const [schools, setSchools] = useState<ITask[]>([])

    useEffect(() => {
        fetchSchools()
    }, [])

    async function fetchSchools() {
        const response = await api.get('/school')
        console.log(response)
        setSchools(response.data)
    }

    function back() {
        history.goBack()
    }

    const current_url = window.location.href;
    var label;
    if (current_url.indexOf("order-edit") !== -1) {
        console.log("ok");
        label = "Editar";
    }
    if (current_url.indexOf("order-create") !== -1) {
        console.log("ok");
        label = "Inserir";
    }
    console.log(current_url.indexOf('order-edit'));

    return (
        <>
            <Header />
            <br />
            <div className="container order-form">
                <h3 className="mr-auto navbar-nav">{label} Pedido</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Produto</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            disabled
                        />

                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col xs={4}>
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
                        <Form.Label>Escola</Form.Label>
                        <Form.Control
                            type="text"
                            name="escola"
                            value={model.escola}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            as="select"
                        >
                            <option value="">{model.escola}</option>
                            {
                                schools.map(school => (
                                    <option key={school.id} value={school.escola}>
                                        {school.escola}
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