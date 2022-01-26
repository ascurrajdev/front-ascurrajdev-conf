import api from './api'
const restReunionGenerate = async() => {
    try{
        const response = await api.get("api/reuniones/generate",{withCredentials: true})
        return response.data.data
    }catch(err){
        return err.response.data
    }
}
export default restReunionGenerate