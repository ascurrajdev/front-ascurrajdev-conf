import api from './api'
const restRegisterApi = async (form) => {
    try{
        await api.get("sanctum/csrf-cookie",{withCredentials:true})
        const res = await api.post("register",form,{withCredentials:true})
        return res
    }catch(err){
        return err.response.data
    }
}
export default restRegisterApi