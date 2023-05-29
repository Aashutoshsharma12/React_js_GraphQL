import react, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Not_allowedSpace } from "../../helper/validation";
import { useMutation, useQuery } from "@apollo/client";
import {signIn} from "../../graphql/Mutation";

const Login = () => {
    const [loginVendor, { error1 }] = useMutation(signIn)
    console.log(error1,"slsl")
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailErr, setemailErr] = useState(false);
    const [emailErr1, setemailErr1] = useState(false);
    const [passwordErr, setpassowrdErr] = useState(false);
    const [passwordErr1, setpassowrdErr1] = useState(false);
    const email1 = (e) => {
        setemailErr1(false)
        e.preventDefault();
        //not for allow space
        Not_allowedSpace(e)
        setEmail(e.target.value);
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(e.target.value)) {
            setemailErr(true)
        } else {
            setemailErr(false)
        }
    }
    const password1 = (e) => {
        setpassowrdErr1(false);
        e.preventDefault();
        //not for allow space
        Not_allowedSpace(e)
        setPassword(e.target.value);
    }
    const login = async (e) => {
        e.preventDefault()
        try {
            if (!email) {
                setemailErr1(true)
            } else if (!password) {
                setpassowrdErr1(true)
            } else {
                //graphql mutation variable
                const res = await loginVendor({
                    variables: {
                        loginInput: {
                            email: email,
                            password: password
                        }
                    }
                });
                if (res.data.loginVendor.code == 200) {
                    localStorage.setItem('token', res.data.loginVendor.vendor.token);
                    navigate('/userList')
                } 
            }
        } catch (err) {
            alert(err)
        }
       
    }

    return (
        <>
            <div class="row">
                <div class="col-lg-6">
                    <div class="loginPageiImg_Container">
                        <img src="/Auth_Image/signupimage2.png" />
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="loginscreen animated fadeInDown loginPage">
                        <h2 class="text-center">Welcome Admin</h2>
                        <div class="form-group position-relative">
                            {emailErr ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Please Enter Valid Email</span> : ""}
                            {emailErr1 ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Please Enter Email</span> : ""}

                            <input type="email" class="form-control" placeholder="Enter Email" id="email" name="email" value={email} onChange={(e) => email1(e)} />
                        </div>
                        <div class="form-group position-relative">
                            {/* {passwordErr ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Please Enter Valid Password</span> : ""} */}
                            {passwordErr1 ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Please Enter Password</span> : ""}
                            <input type="password" class="form-control" placeholder="Enter Password" id="password" name="password" value={password} onChange={(e) => password1(e)} />
                        </div>
                        <button disabled={emailErr || passwordErr} class="btn block full-width m-b" id="btnId" onClick={(e) => login(e)} >
                            Signin
                        </button>
                    </div>
                </div>
            </div>

            {/* <form className="w-50 m-auto">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="email" value={email} onChange={(e) => handleInputChange(e)} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
                </div>
                <button onClick={() => handleSubmit()} type="button" class="btn btn-primary">Submit</button>
            </form> */}
        </>
    )
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Login />);
// ReactDOM.render(<Login />, document.getElementById('root'));

export default Login;