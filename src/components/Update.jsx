import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
// import axios from "axios"

const Update = (props) => {
    console.log(props)

    const { id } = useParams()
    const navigate = useNavigate()
    const [state, setState] = useState({
        name: "",
        phone: "",
        email: "",
        isLoading: true
    })
    useEffect(() => {
        const callApi = async () => {
            const url = `https://jsonplaceholder.typicode.com/users/${id}`;
            fetch(url)
                .then((response) => {
                    if (response.ok === true) {
                        return response.json()
                    }
                })
                .then((jsonData) => {
                    setState(() => ({ name: jsonData.name, phone: jsonData.phone, email: jsonData.email, isLoading: false }))
                })
                .catch((error) => {
                    console.log(error)
                    alert(error)
                })
        };
        callApi();
    }, [id]);
    const submitForm = (event) => {
        event.preventDefault()
        const { name, email, phone } = state
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
        const user = {
            name,
            email,
            phone
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        }
        fetch(url, options)
            .then(function (response) {
                console.log(response)
                if (response.status !== 201) {
                    return
                } else {
                    return response.json();
                }
            })
            .then(function (jsonData) {
                console.log(jsonData, 'json data')
                // this.setState(() => ({ user: jsonData }))
                navigate('/')
                // this.setState(() => ({ isLoading: false }))
            })
            .catch((err) => {
                console.log(err, 'error')
                this.setState(() => ({ isLoading: false }))
            })
    }
    const goBack = () => {
        navigate('/')
    }
    const nameInput = (event) => {
        event.preventDefault()
        setState(() => ({ ...state, name: event.target.value }))
    }
    const phoneInput = (event) => {
        event.preventDefault()
        setState(() => ({ ...state, phone: event.target.value }))
    }
    const emailInput = (event) => {
        event.preventDefault()
        setState(() => ({ ...state, email: event.target.value }))
    }
    const { name, phone, email, isLoading } = state
    return (
        <div>
            <h1>Update Page</h1>
            {isLoading ? <img src="./loader_new.gif" height={80} width={80} alt="Loading..." />
                :
                <form onSubmit={submitForm}>
                    <label>Name :</label>
                    <input type="text" value={name} onChange={nameInput} placeholder="Name" />
                    <br />
                    <label>Phone :</label>
                    <input type="text" onChange={phoneInput} value={phone} placeholder="Phone" />
                    <br />
                    <label>Email :</label>
                    <input type="text" onChange={emailInput} value={email} placeholder="Email" />
                    <button type="submit">Save</button>
                    <button type="button" onClick={goBack}>Back</button>
                </form>

            }

        </div>
    )
}

export default Update