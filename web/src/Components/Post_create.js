import React from 'react';
import {useState,useRef, useContext} from 'react';
import './Post_create.css'
import {userContext} from '../Context/UserContext';
import { postsContext } from 'Context/PostsContext';
import {CreatePost} from '../endpoints/rest/userInteractions'

function PostCreate({onClose}){
    const [file,setFile] = useState(null);
    const [ImgPreview,setPreview] = useState(null);
    const File_upload = useRef(null);
    const user = useContext(userContext);
    const {refreshPosts} = useContext(postsContext);
    function FileHandling(file){
        setPreview(URL.createObjectURL(file));
        setFile(file)
    }
    function DroppedFile(e){
        e.preventDefault();
        FileHandling(e.dataTransfer.files[0]);
    }
    function CreationHandling(e){
        e.preventDefault(); //altrimenti di default il form refresha la pag
        const content = e.target.content.value;
        CreatePost(user.user.id,file,content).then(
            (data) => {
                refreshPosts();
                onClose();
            }
        );
    }
    return(
        <div className="post-creation">
            <h1>Crea Post</h1>
            <form onSubmit={CreationHandling}>
                <div className="image-upload" onDragOver={(e) => e.preventDefault()} onDrop={DroppedFile} onClick = {() => File_upload.current.click()}>
                    <input ref={File_upload} type="file" name="image" hidden onChange={(e) => FileHandling(e.target.files[0])} required></input>
                    {ImgPreview ? <img className="uploaded-img" src={ImgPreview}/> : (<p>Trascina o sfoglia <br></br>per importare un'immagine</p>)}
                </div>
                <div className="post-content">
                    <label>Descrizione</label>
                    <input id="content" name="content" type="text" required></input>
                </div>
                <div className="creation-interact">
                    <button type="button" className="action" onClick={onClose} id="Cancel" >Cancella</button>
                    <button className="action" type="submit" id="Create">Crea</button>
                </div>
            </form>
        </div>
    )
}
export default PostCreate;