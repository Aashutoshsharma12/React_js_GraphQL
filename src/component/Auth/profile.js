import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { NextRequest,NextResponse } from "next/server";
// import Cookies from 'cookies'
// import cookieCutter from 'cookie-cutter'
// import { getCookie } from 'cookies-next'
import { toast, ToastContainer } from 'react-toastify';
import { Not_allowedSpace } from "../../helper/validation";
import { editProfile } from "../../graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";

const Profile = () => {
    const [edit, { error1 }] = useMutation(editProfile)

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [vendorId, setvendorId] = useState('');
    const [phoneNumber, setphoneNumber] = useState(Number);
    const [nameErr, setNameErr] = useState(false)
    const [nameErrLength, setNameErrLength] = useState(false)
    const [phoneErr, setPhoneErr] = useState(false)
    const [phoneErr1, setPhoneErr1] = useState(false)

    useEffect(() => {
        setName(localStorage.getItem('name'));
        setphoneNumber(localStorage.getItem('phoneNumber'));
        setvendorId(localStorage.getItem('vendorId'))
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "name") {
            setNameErr(false)
            if (value.length < 3) {
                setNameErrLength(true)
                setName(value);
            } else {
                setNameErrLength(false)
                setName(value);
            }

        }
    }
    var phoneNumber1 = (e) => {
        const { id, value } = e.target;
        if (id === "phoneNumber") {
            setPhoneErr(false)
            if (value.length < 10) {
                setPhoneErr(true)
                setphoneNumber(value);
            } else {
                setPhoneErr(false)
                setphoneNumber(value);
            }

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameErrLength(false)
        try {
            if (!name) {
                setNameErr(true)
            } else {
                //graphql mutation variable
                const res = await edit({
                    variables: {
                        id: vendorId,
                        vendorInput: {
                            phoneNumber: Number(phoneNumber),
                            name: name
                        }
                    }
                });
                if (res.data.editVendor == true) {
                    navigate('/userList')
                }

            }
        } catch (err) {
            alert(err)
        }
    }
    const logout = ()=>{
        localStorage.clear();
        navigate('/')
    }
    return (
        <>
            <div class="row">
            <div style={{paddingLeft:"1750px"}}>
                    <button style={{backgroundColor:"red"}} onClick={() => logout()} id="button">Logout</button>
                </div>
                <div class="col-lg-6">
                    <div class="loginscreen animated fadeInDown loginPage">
                        <div class="form-group position-relative">
                            <label for="exampleInputPassword1">PhoneNumber</label>
                            {phoneErr ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Please Enter Valid PhoneNumber</span> : ""}
                            {phoneErr1 ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Please Enter PhoneNumber</span> : ""}
                            <input type="phoneNumber" class="form-control" placeholder="Enter PhoneNumber" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => phoneNumber1(e)} />
                        </div>
                        <div class="form-group position-relative">
                            <label for="exampleInputPassword1">Name</label>
                            {nameErrLength ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Name length must be at least 3 characters long" </span> : ""}
                            {nameErr ? <span className="position-absolute text-danger" style={{ top: "-25px", left: "10px" }}>Please Enter Name</span> : ""}
                            <input type="name" class="form-control" placeholder="Enter Name" id="name" name="name" value={name.trimStart()} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <button disabled={nameErrLength || phoneErr} class="btn block full-width m-b" id="btnId" onClick={(e) => handleSubmit(e)} >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Profile
