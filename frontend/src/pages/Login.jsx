import React from 'react'
import { Form } from '../components/Form'

export const Login = () => {
    return (
        <Form
            route="/api/user/login"
            method={"Login"}
        />
    )
}
export default Login