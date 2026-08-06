import React from 'react';
import {Flame,MessageCircle,Forward} from 'lucide-react';

function Post({id,userImg,username,ImgPost,likes,comments}){
    return(
        <div className="Posts" >
            <div className="Post">
                <div className="user">
                    <img className="userimg" alt="" />
                    <p className="username">{username}</p>
                </div>

                <img className="posted-image" alt="" />
                <div className="reactions">
                    <Flame size={40}/>
                    <MessageCircle size={35}/>
                    {/* per il like (che sara' il fuoco, vedere icona da lucid) */}
                    <Forward size={40}/>
                </div>
                <div className="comments">

                </div>
            </div>
        </div>
    )
}
export default Post;