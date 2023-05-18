import axios from 'axios'

const $api = axios.create({
    baseURL: 'http://localhost:8800/api',
    withCredentials: true,
})

export const uploadData = async (data, path)=>{
    try{
//const res = await axios.post(`http://localhost:8800/api/${path}`, data,  {withCredentials: true});
const res = await $api.post(`/${path}`, data)
console.log(res);
    }catch(err){}
}