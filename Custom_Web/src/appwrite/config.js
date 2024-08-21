import conf from '../conf/conf.js'
import { Client ,ID, Databases, Storage, Query } from "appwrite"

export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        }
        catch(error){
            console.log("Appwrite service :: createpost :: error", error);
        }
    } 
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        }
        catch(error){
            console.log("Appwrite service :: updatepost :: error", error);
        }


    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }
        catch(error){
            console.log("Appwrite service :: deletepost :: error", error);
            return false;
        }

    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log("Appwrite service :: getpost :: error", error);
            return false;
        }
    }
    async getPosts(){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        }
        catch(error){
            console.log("Appwrite service :: getposts :: error", error);
            return false;
        }
    }

    // file upload services

    async uploadFile(file){
        try{
            console.log("Appwrite service :: uploadfile :: file", file);
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite service :: uploadfile :: error", error);
            return false;
        }
    }
    async deleteFile(fileId){
        try{
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch(error){
            console.log("Appwrite service :: delete :: error", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
          return await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);

        } catch (error) {
          console.error(error);
          return null;
        }
    }
}

const service = new Service()
export default service
