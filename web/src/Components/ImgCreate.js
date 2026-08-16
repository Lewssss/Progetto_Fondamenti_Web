import React from 'react'
import './ImgCreate.css'
import {useState,useRef, useContext} from 'react';
import {userContext} from '../Context/UserContext';
import {updateUserImage} from '../endpoints/rest/userInteractions'

function ImgCreate({onClose}) {
    const [file,setFile] = useState(null);
    const [ImgPreview,setPreview] = useState(null);
    const File_upload = useRef(null);
    const { user, setUser } = useContext(userContext);
    function FileHandling(file){
        setPreview(URL.createObjectURL(file));
        setFile(file)
    }
    function DroppedFile(e){
        e.preventDefault();
        FileHandling(e.dataTransfer.files[0]);
    }
    function UpdateHandling(e) {
        e.preventDefault();
        updateUserImage(user.id, file).then(
            (data) => {
                console.log(data);
                setUser(prev => ({...prev, profilePicture: data.data.profilePicture}));
                onClose();
            }
        ) 
    }
  return (
    <div className="img-creation">
            <h1>Cambia foto profilo</h1>
            <form onSubmit={UpdateHandling}>
                <div className="image-upload" onDragOver={(e) => e.preventDefault()} onDrop={DroppedFile} onClick = {() => File_upload.current.click()}>
                    <input ref={File_upload} type="file" name="image" hidden onChange={(e) => FileHandling(e.target.files[0])} required></input>
                    {ImgPreview ? <img className="uploaded-img" src={ImgPreview}/> : (<p>Trascina o sfoglia <br></br>per importare un'immagine</p>)}
                </div>
                <div className="creation-interact">
                    <button type="button" className="action" onClick={onClose} id="Cancel" >Cancella</button>
                    <button className="action" type="submit" id="Create">Salva</button>
                </div>
            </form>
        </div>
  )
}

export default ImgCreate