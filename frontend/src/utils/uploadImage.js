import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) =>{
    const formData = new FormData();

    //append the image file to form data

    formData.append(("image", imageFile));

    try{
        const respone = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                'Content-Type' : 'multipart/form-data', //setting header for file upload
            },
        });

        return respone.data;
    }catch(error){
        console.error('Error uploading the image:', error);
        throw error; //rethowing error for handling
    }
};

export default uploadImage;