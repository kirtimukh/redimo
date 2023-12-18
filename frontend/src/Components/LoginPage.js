import React from 'react'
import { APIPointer } from '../Interceptors'

const LoginPage = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const response = await APIPointer.post('/ana/token', formData);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <label>
                <input type="hidden" name="grant_type" value="password" />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage