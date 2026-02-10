import { apiConnecter }  from "./apiConnector"      ;

export async function signup(data) {
    try{
      const response = await apiConnecter("POST","auth/signup/",data);
      return response.data.result;

    }catch(err){
        console.log("getting error while signup ",err.message);

    }
}
export async function login(data) {
    try{
      const response = await apiConnecter("POST","auth/login/",data);
      return response.data.result;

    }catch(err){
        console.log("getting error while login ",err.message);

    }
}
export async function getAllpost() {
    try{
      const token = localStorage.getItem("TOKEN");

      const response = await apiConnecter("GET","post/allpost",{token});
      return response.data.result;

    }catch(err){
        console.log("getting error while login ",err.message);

    }
}