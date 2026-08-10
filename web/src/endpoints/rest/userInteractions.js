import api from '../../api/interceptor.js'
import {mapPost} from '../mappers/userMapper.js'

export async function CreatePost(author,file,content) {
    const formData = new FormData(); //utilizziamo formdata principalmente per il file, che non possiamo jsonnarlo quindi lo dobbiamo serializzare, unico modo
    formData.append("author",author);
    formData.append("img",file);
    formData.append("content",content);
    const data = await api.post('/post/addPost',formData);
    return data;
}
export async function deletePost(id) {
    const data = await api.delete(`/post/delete/${id}`);
    return data;
}
export async function UserLikedPost(userId,postId){
    const data = await api.post('/post/addLike',{userId:userId,postId:postId})
    return data;
}
export async function addPostComment(postId) {
    const {data} = await api.post(`/post/addPostComment/`,{postId})
    return data;
}