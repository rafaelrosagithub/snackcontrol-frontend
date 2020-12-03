import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api'

import './index.css'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

interface ITask {
    escola: string;
    school_category: string;
}

const Tasks: React.FC = () => {

    const history = useHistory()
    const id = JSON.parse(JSON.stringify(useParams())).id;
    const [model, setModel] = useState<ITask>({
        escola: '',
        school_category: ''
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
            const response = await api.put(`/school/${id}`, model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Escola editado com sucesso!',
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
            console.log("post... school");
            const response = await api.post('/school', model)
            store.addNotification({
                title: 'Sucesso!',
                message: 'Escola inserido com sucesso!',
                type: 'success',
                insert: 'top',
                container: 'top-right',
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
        console.log("findSchool...");
        const response = await api.get(`school/${id}`);
        console.log(id);
        setModel({
            escola: response.data.escola,
            school_category: response.data.school_category
        })
    }

    function back() {
        history.goBack()
    }

    const current_url = window.location.href;
    var label;
    if (current_url.indexOf("school-create") !== -1) {
        console.log("ok");
         label = "Inserir";
    }
    if (current_url.indexOf("school-edit") !== -1) {
        console.log("ok");
         label = "Editar";
    }
    console.log(current_url.indexOf('order-edit'));

    return (
        <>
            <Header />
            <br />
            <div className="container order-form">
                <h3 className="mr-auto navbar-nav">{label} Escola</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="escola"
                            value={model.escola}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            name="school_category"
                            value={model.school_category}
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