import api from '../../api/interceptor.js'

export async function UserLikedPost(userId,postId){
    const data = await api.post('/post/addLike',{userId:userId,postId:postId})
    return data;
}