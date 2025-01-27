import { useEffect, useState } from "react";
import Create from './Create.jsx'
import Read from './Read.jsx'
import '../index.css'

const Home = () => {
    const [state, setState] = useState({
        isLoading: false,
        usersList: [],
        currentView: 'LIST',
        errorOccured: false
    })
    useEffect(() => {
        const getUsersListFromApi = async () => {
            setState((prev) => ({ ...prev, isLoading: true }))
            const url = 'https://jsonplaceholder.typicode.com/users'
            fetch(url)
                .then((response) => {
                    if (response.ok === true) {
                        return response.json()
                    } else {
                        setState((prev) => ({ ...prev, errorOccured: true }))
                        return
                    }
                })
                .then((jsonData) => {
                    setState((prev) => ({ ...prev, usersList: jsonData, isLoading: false, errorOccured: false }))
                })
                .catch((error) => {
                    setState((prev) => ({ ...prev, isLoading: true, errorOccured: true }))
                    console.log('Error :', error)
                })
        }
        getUsersListFromApi()
    }, [])
    const handleCreateUser = () => {
        setState((prev) => ({ ...prev, currentView: 'CREATE' }))
    }
    const handleUpdate = (id) => {
        setState((prev) => ({ ...prev, currentView: "UPDATE", id }))
    }
    const handleRead = (id) => {
        setState((prev) => ({...prev, currentView : "READ",id }))
    }
    const handleDelete = async (id) => {
        const { usersList } = state
        const confirm = window.confirm('Are you sure to delete ?')
        if (confirm) {
            setState((prev) => ({ ...prev, isLoading: true }))
            const url = `https://jsonplaceholder.typicode.com/users/${id}`
            const options = {
                method: "DELETE",
            }
            fetch(url, options)
                .then((response) => {
                    if (response.ok === true) {
                        const filterdData = usersList.filter((item) => item.id !== id);
                        setState((prev) => ({ ...prev, usersList: filterdData }))
                    }
                    setState((prev) => ({ ...prev, isLoading: false }))
                })
                .catch((error) => {
                    console.log(error)
                    setState((prev) => ({ ...prev, isLoading: false }))
                })
        }
    }
    const renderData = () => {
        const { currentView, usersList, errorOccured } = state;
        if (errorOccured !== true) {
            if (currentView === 'LIST') {
                return (
                    <div>
                        <h2>Users List</h2>
                        <button type="button" className="create-btn" onClick={handleCreateUser} >+ Add User</button>
                        <table className="table">
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
                                {usersList.map((item, i) =>
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button type="button" className="read-btn" onClick={e => handleRead(item.id)}>Read</button>
                                            <button type="button" className="create-btn" onClick={e => handleUpdate(item.id)} >
                                                Update
                                            </button>
                                            <button type="button" className="back-btn" onClick={e => handleDelete(item.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            } else if (currentView === 'CREATE') {
                return <Create addUser={addUser} action="CREATE" id={null} />
            } else if (currentView === 'UPDATE') {
                return <Create addUser={addUser} action="UPDATE" id={state.id} />
            } else if (currentView === 'READ') {
                return <Read id={state.id} />
            }
        } else {
            return (
                // Error Handling 
                <div>
                    <h1>Something went wrong, please try again</h1>
                </div>
            )
        }
    }
    const renderOverlay = () => {
        return (
            <div className="laoding-data">
                <div>
                    <img src="./loader_new.gif" alt="loading" height={80} width={80} />
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }
    const addUser = (userData, action, id) => {
        if (userData !== undefined) {
            const { usersList } = state
            if (action === 'CREATE') {
                setState((prev) => ({ ...prev, currentView: "LIST", usersList: [...prev.usersList, userData] }))
            } else if (action === 'UPDATE') {
                const index = usersList.findIndex((item) => item.id === id)
                usersList.splice(index, 1, userData);
                setState((prev) => ({ ...prev, currentView: "LIST", usersList }))
            }
        } else {
            setState((prev) => ({ ...prev, currentView: "LIST" }))
        }
    }
    const { isLoading } = state
    return (
        <div className="data">
            {isLoading ? renderOverlay() :
                renderData()
            }
        </div>
    )
}

export default Home