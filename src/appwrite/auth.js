import conf from '../conf/conf.js';  
import { Client, Account, ID } from "appwrite";  

export class AuthService {  
    client = new Client();  
    account;  

    constructor() {  
        this.client  
            .setEndpoint(conf.appwriteurl)  
            .setProject(conf.appwriteProjectId);  
        this.account = new Account(this.client);  
    }  

    async createAccount({ email, password, name }) {  
        try {  
            await this.account.create(ID.unique(), email, password, name);  
            // Call the login method after successful account creation  
            return this.login({ email, password });  
        } catch (error) {  
            throw error; // Consider logging the error here if needed  
        }  
    }  

    async login({ email, password }) {  
        try {  
            console.log('login successfuly...')
            return await this.account.createEmailPasswordSession(email, password); 
        } catch (error) {  
            console.log('login error...', error)
            throw error; // Consider logging the error here if needed  
        }  
    }  

    async getCurrentUser() {  
        try {  
            return await this.account.get();  
        } catch (error) {  
            console.error("Appwrite service :: getCurrentUser :: error", error);  
            return null; // Return null if an error occurs  
        }  
    }  

    async logout() {  
        try {  
            await this.account.deleteSessions();  
        } catch (error) {  
            console.error("Appwrite service :: logout :: error", error);  
            // Handle the error according to your application's needs  
        }  
    }  
}  

const authService = new AuthService();  
export default authService; 