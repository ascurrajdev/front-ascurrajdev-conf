import {useState} from 'react'
const useForm = (state = {}) => {
    const [form,setForm] = useState(state)
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    return {
        form,
        onChange,
    }
}
export default useForm