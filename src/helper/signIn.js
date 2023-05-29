import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React from 'react';

export function login1() {
    const navigate = useNavigate()

    // console.log("email", "dldlld", "password", "sls")
    axios.post('http://localhost:3005/api/v1/admin/auth/login',
        {
            "email": email,
            "password": password
        },
    ).then(function (response) {
        localStorage.setItem('token', response.data.token)
        if (response.data.code == 200) {
            navigate('/profile')
        }
        // push('/auth/profile');
    }).catch(function (error) {
        alert(error.response.data.message)
        console.log(error.message);
    });
}


// export default login1;