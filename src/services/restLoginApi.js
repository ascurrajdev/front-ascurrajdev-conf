import api from './api'
const restLoginApi = async(form) => {
    try{
        await api.get("sanctum/csrf-cookie",{withCredentials:true})
        const res = await api.post("login",form,{withCredentials:true})
        return res
    }catch(err){
        return err.response.data
    }
}
export default restLoginApi