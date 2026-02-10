import axios from "axios"

export const axiosInstance = axios.create({});
const Base_Url = "http://localhost:8080/api/";
export const apiConnecter = (method, url, bodyData, headers, params) => {
    //console.log(Base_Url,url);
    const Token = localStorage.getItem("TOKEN");
    return axiosInstance({
        method:`${method}`,
        url:`${Base_Url}${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: {Authorization:`Bearer ${Token}`},
        params: params ? params : null,
    });
}