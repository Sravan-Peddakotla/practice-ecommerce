import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import '../index.css'

const Home = () => {
    const location = useLocation();
    const data = location.state
    console.log(data);
    const [state, setState] = useState({
        usersList: [],
        isLoading: true,
        name: "",
        phone: "",
        email: "",
        invalidName: false
    })
    useEffect(() => {
        callApi()
    }, [])
    const callApi = async () => {
        const url = 'https://jsonplaceholder.typicode.com/users';
        fetch(url)
            .then((response) => {
                if (response.ok === true) {
                    return response.json()
                } else {
                    return
                }
            })
            .then((jsonData) => {
                setState(() => ({ usersList: jsonData }))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const { usersList, isLoading } = state
    const handleDelete = (id) => {

        const confirm = window.confirm('Are you sure to delete ?')
        if (confirm) {
            const item = usersList.filter((item) => item.id !== id);
            setState(() => ({ usersList: item }))
        }
    }
    const inputName = (event) => {
        setState(() => ({ ...state, name: event.target.value }))
    }
    const inputPhone = (event) => {
        setState(() => ({ ...state, phone: event.target.value }))
    }
    const inputEmail = (event) => {
        setState(() => ({ ...state, email: event.target.value }))
    }
    const addUser = () => {
        const { name, phone, email, usersList } = state;
        const length = usersList.length - 1
        const lastItem = usersList[length];
        const lastId = lastItem.id
        const newId = lastId + 1
        const user = {
            name, phone, email, id: newId
        }
        const url = 'https://jsonplaceholder.typicode.com/users';
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        }
        axios.post(url, options)
            .then(response => {
                if (response.status !== 201) {
                    return
                } else {
                    return response
                }
            })
            .then((jsonData) => {
                const { data } = jsonData;
                const { body } = data
                const parsedData = JSON.parse(body)
                setState((prev) => ({
                    usersList: [...prev.usersList, parsedData],
                    phone: "", name: "", email: ""
                }))
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
    }
    const nameValidations = (event) => {
        if (event.target.value === '') {
            setState(() => ({ ...state, invalidName: true }))
        } else {
            setState(() => ({ ...state, invalidName: false }))
        }
    }
    const { name, phone, email, invalidName } = state
    return (
        <div>
            <h1>User Details</h1>
            <div>
                <div className="d-flex justify-content-center align-items-center bg-light vh-100">
                    <div>
                        <input
                            name="name"
                            value={name}
                            onBlur={nameValidations}
                            onChange={inputName}
                            placeholder="Name"
                        />
                        <br />
                        {invalidName && <p className="error" >* Required</p>}
                        <input
                            name="phone"
                            value={phone}
                            onChange={inputPhone}
                            placeholder="Phone"
                        />
                        <input
                            name="email"
                            value={email}
                            onChange={inputEmail}
                            placeholder="Email"
                        />
                        <button type="button" onClick={addUser} >Add User</button>
                    </div>
                    {isLoading ? <img src="./loader_new.gif" height={80} width={80} alt="Loading..." /> :
                        <table className='w-75 rounded bg-white border shadow p-4 table table-stripend '>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usersList.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <Link to={`/update/${item.id}`}> <button>Update</button></Link>
                                                <button type='button' onClick={e => handleDelete(item.id)} >Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home


//  create page 


import axios from "axios"
import {useS}
const inputName = (event) => {
    setState(() => ({ ...state, name: event.target.value }))
}
const inputPhone = (event) => {
    setState(() => ({ ...state, phone: event.target.value }))
}
const inputEmail = (event) => {
    setState(() => ({ ...state, email: event.target.value }))
}
const nameValidations = (event) => {
    if (event.target.value === '') {
        setState(() => ({ ...state, invalidName: true }))
    } else {
        setState(() => ({ ...state, invalidName: false }))
    }
}
const addUser = () => {
     const [state, setState] = useState({
            usersList: [],
            isLoading: true,
            name: "",
            phone: "",
            email: "",
            invalidName: false
        })
    const { name, phone, email, usersList } = state;
    const length = usersList.length - 1
    const lastItem = usersList[length];
    const lastId = lastItem.id
    const newId = lastId + 1
    const user = {
        name, phone, email, id: newId
    }
    const url = 'https://jsonplaceholder.typicode.com/users';
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(user),
    }
    axios.post(url, options)
        .then(response => {
            if (response.status !== 201) {
                return
            } else {
                return response
            }
        })
        .then((jsonData) => {
            const { data } = jsonData;
            const { body } = data
            const parsedData = JSON.parse(body)
            setState((prev) => ({
                usersList: [...prev.usersList, parsedData],
                phone: "", name: "", email: ""
            }))
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        })
}
const { name, phone, email, invalidName, currentView } = state
const Create = () => {


    return (
        <div>
            <h3>Create User</h3>
            <form onSubmit={addUser}>
                <input
                    name="name"
                    value={name}
                    onBlur={nameValidations}
                    onChange={inputName}
                    placeholder="Name"
                />
                <br />
                {invalidName && <p className="error" >* Required</p>}
                <input
                    name="phone"
                    value={phone}
                    onChange={inputPhone}
                    placeholder="Phone"
                />
                <input
                    name="email"
                    value={email}
                    onChange={inputEmail}
                    placeholder="Email"
                />
                <button type="submit" onClick={addUser} >Add User</button>
            </form>
        </div>
    )
}


export default Create


// import axios from "axios"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// const Create = () => {
//     const [state, setState] = useState({
//         name: '', phone: "", email: '', addedData: false
//     })
//     const navigate = useNavigate()
//     const addDataMethod = (event) => {
//         event.preventDefault()
//         const { name, phone, email, } = state;
//         const user = {
//             name,
//             phone,
//             email
//         }
//         const url = 'https://jsonplaceholder.typicode.com/users';
//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             },
//             body: JSON.stringify(user),
//         }
//         axios.post(url, options)
//             .then(response => {
//                 if (response.status !== 201) {
//                     return
//                 } else {
//                     const { name, phone, email } = state
//                     navigate('/', { state: { name, phone, email, addedData: true } })
//                 }
//             })
//             .catch((error) => {
//                 console.log(error)
//                 alert(error)
//             })
//     }
//     const inputName = (event) => {
//         setState(() => ({ state, name: event.target.value }))
//     }
//     const inputPhone = (event) => {
//         setState(() => ({ state, phone: event.target.value }))
//     }
//     const inputMail = (event) => {
//         setState(() => ({ state, email: event.target.value }))
//     }
//     const goBack = () => {
//         navigate('/')
//     }
//     return (
//         <div>
//             <form onSubmit={addDataMethod} >
//                 <input type="text" placeholder="Name" onChange={inputName} />
//                 <br />
//                 <input type="text" placeholder="Phone" onChange={inputPhone} />
//                 <br />
//                 <input type="text" placeholder="Email" onChange={inputMail} />
//                 <br />
//                 <button type="submit">Save</button>
//                 <button type="button" onClick={goBack} >Back</button>
//             </form>
//         </div>
//     )
// }

// export default Create


