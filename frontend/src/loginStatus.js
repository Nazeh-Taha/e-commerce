
import Cookie from "js-cookie";

export default function LogingStatus(){

    const token = Cookie.getJSON("userInfo") || null
    let status = "notlogin"; 
    if(token){
        
        if(token.isAdmin === true){
            status = "admin";
        }else{
            status = "user"
        }
    }
    
 return status;  
};