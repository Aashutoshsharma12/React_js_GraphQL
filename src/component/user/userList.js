import axios from "axios";
import moment from "moment";
import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import Pagination from "next-pagination";
import ReactPaginate from "react-paginate";
// import { getCookie, deleteCookie } from 'cookies-next'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

const UserList = () => {
    const navigate = useNavigate();
    function button(data) {
        localStorage.setItem('name', (data.name));
        localStorage.setItem('phoneNumber', (data.phoneNumber));
        localStorage.setItem('vendorId', (data._id));

        navigate('/Profile');
    }
    const [data1, setData1] = useState([])
    const options = {
        method: 'POST',
        url: 'https://node-graphql-five.vercel.app/graphql',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            query: `{
                vendor(page:${1},perPage:${20}) {
                  vendorList {
                    updatedAt
                    phoneNumber
                    name
                    image
                    createdAt
                    _id
                  }
                  message
                  code
                }
              }`
        }
    };

const logout = ()=>{
    localStorage.clear();
    navigate('/')
}
    const fetchUser = async () => {
        try {
            const data = await axios.request(options);
            if (data.data.data.vendor.code == 200) {
                setData1(data.data.data.vendor.vendorList)
            }
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])


    return (
        <>
            <section>
            <div style={{paddingLeft:"1750px"}}>
                    <button style={{backgroundColor:"red"}} onClick={() => logout()} id="button">Logout</button>
                </div>
                {/* <div class="search d-flex align-items-center w-100">
                    <div class="search_data">
                        <input type="text" class="form-control" placeholder="Search Something" id="search" name="search" />
                    </div>
                    <button class="btn" id="btnId" onClick={() => fetchUser('search')} > <img
                        src="/Auth-Image/icons8-search-50.png" /></button>
                </div> */}

                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">phone Number</th>
                            <th scope="col">CreatedAt</th>
                            <th scope="col">UpdatedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data1.map((data, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td onClick={() => button(data)}><h3 style={{ color: 'blue' }}>{data.name}</h3></td>
                                    <td>{data.phoneNumber ? data.phoneNumber : "phoneNumber"}</td>
                                    <td>20 Jan</td>
                                    <td>20 Jan</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <ToastContainer />

            </section>
        </>
    )
}
export default UserList
