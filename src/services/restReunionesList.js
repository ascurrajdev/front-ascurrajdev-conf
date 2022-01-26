import api from './api'
const restReunionesList = async() => {
    try{
        const response = await api.get("api/reuniones",{withCredentials:true})
        return response.data.data
    }catch(e){
        return e.response.data
    }
}
export default restReunionesList;