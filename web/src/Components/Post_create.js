import React from 'react';
import {useState,useRef} from 'react';
import './Post_create.css'
function PostCreate({onClose}){
    const [ImgPreview,setPreview] = useState(null);
    const File_upload = useRef(null);
    function FileHandling(file){
        setPreview(URL.createObjectURL(file));
    }
    function DroppedFile(e){
        e.preventDefault();
        FileHandling(e.dataTransfer.files[0]);
    }
    function CreationHandling(e){

    }
    return(
        <div className="post-creation">
            <h1>Crea Post</h1>
            <form onSubmit={CreationHandling}>
                <div className="image-upload" onDragOver={(e) => e.preventDefault()} onDrop={DroppedFile} onClick = {() => File_upload.current.click()}>
                    <input ref={File_upload} type="file" hidden onChange={(e) => FileHandling(e.target.files[0])}></input>
                    {ImgPreview ? <img className="uploaded-img" src={ImgPreview}/> : (<p>Trascina o sfoglia <br></br>per importare un'immagine</p>)}
                </div>
                <div className="post-title">
                    <label>Titolo</label>
                    <input id="title"  type="text" ></input>
                </div>
                <div className="creation-interact">
                    <button className="action" onClick={onClose} id="Cancel" >Cancella</button>
                    <button className="action" type="submit" id="Create">Crea</button>
                </div>
            </form>
        </div>
    )
}
export default PostCreate;