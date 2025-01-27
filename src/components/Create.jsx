import { useState, useEffect } from "react"
import '../index.css'
const Create = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: "",
        nameErrMes: false,
        phoneErrMes: false,
        emailErrMes: false,
        isLoading: false,
        isNotEligibleToAdd: false
    })
    const { addUser, action, id } = props
    useEffect(() => {
        if (action === 'UPDATE') {
            const getUserDetails = async () => {
                const { id } = props;
                setState((prev) => ({ ...prev, isLoading: true }))
                const url = `https://jsonplaceholder.typicode.com/users/${id}`;
                const options = {
                    method: "GET"
                }
                fetch(url, options)
                    .then((response) => {
                        if (response.ok === true) {
                            setState((prev) => ({ ...prev, isLoading: false }))
                            return response.json()
                        } else {
                            return
                        }
                    })
                    .then((jsonData) => {
                        const { name, phone, email } = jsonData
                        setState((prev) => ({ ...prev, name: name, phone: phone, email: email }))
                    })
                    .catch((error) => {
                        setState((prev) => ({ ...prev, isLoading: false }))
                        console.log(error)
                    })
            }
            getUserDetails()
        }
    }, [props, action])
    const inputNameChange = (event) => {
        setState((prev) => ({ ...prev, name: event.target.value }))
    }
    const inputPhoneChange = (event) => {
        setState((prev) => ({ ...prev, phone: event.target.value }))
    }
    const inputEmailChange = (event) => {
        setState((prev) => ({ ...prev, email: event.target.value }))
    }
    const submitForm = (event) => {
        event.preventDefault()
        const { name, email, phone } = state;
        if (name !== "" && email !== "" && phone !== "") {
            setState((prev) => ({ ...prev, isLoading: true, isNotEligibleToAdd: false }))
            const user = {
                name,
                email,
                phone
            }
            const url = action === 'CREATE' ? 'https://jsonplaceholder.typicode.com/users' :
                `https://jsonplaceholder.typicode.com/users/${id}`;
            const options = {
                method: action === 'CREATE' ? "POST" : "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(user)
            }
            fetch(url, options)
                .then((response) => {
                    if (response.ok === true) {
                        return response.json()
                    }
                })
                .then((jsonData) => {
                    setState((prev) => ({ ...prev, isLoading: false }))
                    if (action === 'CREATE') {
                        addUser(jsonData, action, null)
                    } else if (action === 'UPDATE') {
                        addUser(jsonData, action, id)
                    }
                })
                .catch((error) => {
                    setState((prev) => ({ ...prev, isLoading: false }))
                    console.log(error)
                })
        } else {
            setState((prev) => ({ ...prev, isNotEligibleToAdd: true }))
        }
    }
    const goBackMethod = () => {
        addUser()
    }
    const validateName = (event) => {
        if (event.target.value === "") {
            setState((prev) => ({ ...prev, nameErrMes: true }))
        } else {
            setState((prev) => ({ ...prev, nameErrMes: false }))
        }
    }
    const validatePhone = (event) => {
        if (event.target.value === "") {
            setState((prev) => ({ ...prev, phoneErrMes: true }))
        } else {
            setState((prev) => ({ ...prev, phoneErrMes: false }))
        }
    }
    const validateEmail = (event) => {
        if (event.target.value === "") {
            setState((prev) => ({ ...prev, emailErrMes: true }))
        } else {
            setState((prev) => ({ ...prev, emailErrMes: false }))
        }
    }
    const { name, email, phone, isLoading, isNotEligibleToAdd, nameErrMes, phoneErrMes, emailErrMes } = state
    return (
        <div className="create-card" >
            <h3 className="create-user-header" >{action === 'CREATE' ? 'Create User' : 'Update User'}</h3>
            <form onSubmit={submitForm}>
                <label>Name :</label>  <input className="form-input" onBlur={validateName} value={name} type="text" placeholder="Name" onChange={inputNameChange} />
                <br />
                {nameErrMes && <p className="error-msg">* Name is Required</p>}
                <label>Phone :</label>  <input className="form-input" onBlur={validatePhone} value={phone} type="text" placeholder="Phone" onChange={inputPhoneChange} />
                <br />
                {phoneErrMes && <p className="error-msg">* Phone is Required</p>}
                <label>Email :</label>  <input className="form-input" onBlur={validateEmail} value={email} type="text" placeholder="Email" onChange={inputEmailChange} />
                <br />
                {emailErrMes && <p className="error-msg">* Email is Required</p>}
                <button type="submit" className="create-btn" >{action === 'CREATE' ? 'Create' : 'Update'}</button>
                <button type="button" className="back-btn" onClick={goBackMethod} >Back</button>
                {isNotEligibleToAdd && <p className="error-msg">* Fill all the Fields</p>}
            </form>
            {isLoading && <img src="./loader_new.gif" alt="loading" width={40} height={40} />}
        </div>
    )
}

export default Create