import axios from "axios";

export default {
    async login(credentials: string) {
        
        // Perform login request to your backend server
        const result = await axios.post('http://localhost:4033/user/login', credentials)
        
        if ( result.data?.token ) {
            
            localStorage.setItem('token', result.data?.token );
            
            return true
        } else {
            return false
        }
        
    },
    
    async verifyToken( token: string ) {
        const result = await axios.get('http://localhost:4033/user/verifytoken',
        {
            headers:{
                'Authorization': token
            }
        })
    },

    logout() {
        localStorage.removeItem('token');
    },
    
    async isAuthenticated() {
        const token = localStorage.getItem('token')

        if ( token?.length === 141 ) {
            return true
        } else {
            return false
        }
        
    },
};