import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useHttp} from "../../hooks/http.hook";
import {loginRequest} from "../../shared/requests";

export function Login() {
    const {loading, request, error, clearError} = useHttp();
    const [formData, setFormData] = React.useState({
        login: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data, formData);

        await request(loginRequest, 'POST', formData);
    };

    return (
        <Form onSubmit={onSubmit}>
            <h2>Добавить аккаунт в рейд систему</h2>
            <Form.Group>
                <Form.Label>Логин</Form.Label>
                <Form.Control type="login" name="login" onChange={handleChange} placeholder="Введите логин"/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} placeholder="Введите пароль"/>
            </Form.Group>

            <Button variant="primary" type="submit"> Отправить </Button>
        </Form>
    );
}
