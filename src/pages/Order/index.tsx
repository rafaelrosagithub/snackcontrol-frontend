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
    description: string;
    finished: boolean;
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

        const response = await api.get('/order')
        console.log(response)
        setTasks(response.data)
    }

    async function finishedTask(id: number) {
        await api.patch(`/tasks/${id}`)
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
        history.push('/snackcontrol/order-create')
    }

    function editTask(id: number) {
        console.log("OrderForm editTask() id: " + id)
        history.push(`/snackcontrol/order-edit/${id}`)
    }

    async function search() {
        const element =  (document.getElementById("search") as unknown as HTMLInputElement).value;

        const response = await api.get(`/order/search?title=${element}`)
        console.log(response)
        setTasks(response.data)
    }

    return (
        <>
            <Header />
            <div className="container">
                <br />
                <div className="order-header">
                    <h3 className="mr-auto navbar-nav">Pedidos</h3>
                    <div className="form-inline">
                        <input id="search" placeholder="Pesquisa" type="text" className="mr-sm-2 form-control" />
                        <button type="button" className="btn btn-outline-primary" onClick={() => search()}>Buscar</button>
                        <Button variant="outline-primary" className="btn btn-outline-primary button-order" onClick={newTask}>Inserir Pedido</Button>
                    </div>
                </div>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Qtd</th>
                            <th>Un. Medida</th>
                            <th>Lote</th>
                            <th>Escola</th>
                            <th>Data Criação</th>
                            <th>Data Atualização</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.qtd}</td>
                                    <td>{task.unid_medida}</td>
                                    <td>{task.lote}</td>
                                    <td>{task.escola}</td>
                                    <td>{formateDate(task.created_at)}</td>
                                    <td>{formateDate(task.updated_at)}</td>
                                    {/*<td>
                                        <Badge variant={task.finished ? "success" : "warning"}>
                                            {task.finished ? "FINALIZADO" : "PENDENTE"}
                                        </Badge>
                                    </td>*/}
                                    <td>
                                        <Button className="button-table" size="sm" disabled={task.finished} onClick={() => editTask(task.id)}>Editar</Button>{' '}
                                        {/*} <Button size="sm" disabled={task.finished} variant="success" onClick={() => finishedTask(task.id)}>Finalizar</Button>{' '}
                                        <Button size="sm" variant="info" onClick={() => viewTask(task.id)}>Visualizar</Button>{' '}
                                        <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>Remover</Button>{' '}*/}
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