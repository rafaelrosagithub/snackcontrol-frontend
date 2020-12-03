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
    escola: string;
    school_category: string;
    updated_at: Date;
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useHistory()

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {

        const response = await api.get('/school')
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
        history.push('/snackcontrol/school-create')
    }

    function editTask(id: number) {
        console.log("editSchool()");
        console.log("id: " + id);
        history.push(`/snackcontrol/school-edit/${id}`)
    }

    function viewTask(id: number) {
        history.push(`/tarefas/${id}`)
    }

    async function search() {
        const element =  (document.getElementById("search") as unknown as HTMLInputElement).value;

        const response = await api.get(`/school/search?escola=${element}`)
        console.log(response)
        setTasks(response.data)
    }

    return (
        <>
            <Header />
            <div className="container">
                <br />
                <div className="order-header">
                    <h3 className="mr-auto navbar-nav">Escolas</h3>
                    <div className="form-inline">
                        <input id="search" placeholder="Pesquisa" type="text" className="mr-sm-2 form-control" />
                        <button type="button" className="btn btn-outline-primary" onClick={() => search()}>Buscar</button>
                    </div>
                </div>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Data Atualização</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.escola}</td>
                                    <td>{task.school_category}</td>
                                    <td>{formateDate(task.updated_at)}</td>
                                 
                                    <td>
                                        <Button className="button-table" size="sm"  onClick={() => editTask(task.id)}>Editar</Button>{' '}
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