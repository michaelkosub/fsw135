import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localstorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || ""
    }

    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
        .then (res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getComment()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch (err => console.log(err))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then (res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch (err => console.log(err))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({ user: {}, token: "", issues: []})
    }

    function addComment(newComment) {
        userAxios.post('/api/todo', newComment)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                comments: [...prevState.comments, res.data]
            }))
        })
        .catch(err => console.log(err.resoibse.data.errMsg))
    }

    function getComment() {
        userAxios.post('/api/todo/user')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                comments: res.data
            }))
        })
        .catch(err => console.log(err.resoibse.data.errMsg))
    }

    return (
        <UserContext.Provider value = { {...userState, signup, login, logout, addComment} }>
            { props.children }
        </UserContext.Provider>
    )
}