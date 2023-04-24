import axios from "axios";

const LogUserRole = () => {

    axios.get('http://localhost:4000/api/me',{
        withCredentials : true
    }).then(function (response) {  
        if (response.status == 200) {
            return 'tes';
        }        
    })
    
}

export default LogUserRole;