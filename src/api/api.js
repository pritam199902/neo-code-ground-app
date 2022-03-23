import axios from 'axios'

export const post_login = async (data) => {
    try {
        const res = await axios.post('/login', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}


export const post_signup = async (data) => {
    try {
        const res = await axios.post('/signup', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}


export const get_profile = async () => {
    try {
        const res = await axios.get('/user')
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const logout = async () => {
    try {
        const res = await axios.get('/logout')
        return true
    } catch (error) {
        return error.response.data
    }
}