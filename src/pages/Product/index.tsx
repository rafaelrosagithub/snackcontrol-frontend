import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, FormControl, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import moment from 'moment'

import './index.css'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';

interface ITask {
    id: number;
    title: string;
    qtd: number;
    unid_medida: string;
    lote: string;
    escola: string;
    product_category: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useHistory()

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {

        const response = await api.get('/product')
        console.log(response)
        setTasks(response.data)
    }

    async function activeProduct(id: number) {
        await api.patch(`/product/${id}`)
        loadTasks()
    }

    async function deleteTask(id: number) {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

    function newTask() {
        history.push('/snackcontrol/product-create')
    }

    function editTask(id: number) {
        history.push(`/snackcontrol/product-edit/${id}`)
    }

    async function search() {
        const element = (document.getElementById("search") as unknown as HTMLInputElement).value;

        const response = await api.get(`/product/search?title=${element}`)
        console.log(response)
        setTasks(response.data)
    }

    return (
        <>
            <Header />
            <div className="container">
                <br />
                <div className="order-header">
                    <h3 className="mr-auto navbar-nav">Produtos</h3>
                    <div className="form-inline">
                        <input id="search" placeholder="Pesquisa" type="text" className="mr-sm-2 form-control" />
                        <button type="button" className="btn btn-outline-primary" onClick={() => search()}>Buscar</button>
                        <Button variant="outline-primary" className="btn btn-outline-primary button-product" onClick={newTask}>Inserir Produto</Button>
                    </div>
                </div>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Data Atualização</th>
                            <th>Status</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.product_category}</td>
                                    <td>{formateDate(task.updated_at)}</td>
                                    <td>
                                        <Button className="button-table" size="sm" variant={task.active ? "success" : "danger"} onClick={() => activeProduct(task.id)}>{task.active ? "Ativo" : "Desativado"}</Button>{' '}
                                    </td>
                                    <td>
                                        <Button className="button-table" size="sm" disabled={!task.active} onClick={() => editTask(task.id)}>Editar</Button>{' '}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            </div>
            <Footer />
        </>
    );
}

export default Tasks;