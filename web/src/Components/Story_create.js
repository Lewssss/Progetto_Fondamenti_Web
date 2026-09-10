import { addStory } from "endpoints/rest/userInteractions";
import { useRef, useState } from "react";
import "./Post_create.css";

function Story_create({onClose, onCreated}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const File_upload = useRef(null);
    function handleFile(file) {
        if (!file) return;
        const isVideo = file.type.startsWith('video');
        const isImg = file.type.startsWith('image');
        if (!isVideo && !isImg) return;
        setMediaType(isVideo ? 'video' : 'image');
        setFile(file);
        setPreview(URL.createObjectURL(file));
    }
    function handleDrop(e) {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await addStory(file);
        onCreated?.();
        onClose();
    }
    return (
        <div className="post-creation">
            <h1>Crea Storia</h1>
            <form onSubmit={handleSubmit}>
                <div className="image-upload" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => File_upload.current.click()}>
                    <input ref={File_upload} type="file" name="media" accept="image/*,video/*" hidden onChange={(e) => handleFile(e.target.files[0])} required />
                    {preview ? (
                        mediaType === 'video'
                            ? <video className="uploaded-img" src={preview} muted />
                            : <img className="uploaded-img" src={preview} alt="" />
                    ) : (
                        <p>Trascina o sfoglia <br />per importare un'immagine o un video</p>
                    )}
                </div>
                <div className="creation-interact">
                    <button type="button" className="action" onClick={onClose} id="Cancel">Cancella</button>
                    <button className="action" type="submit" id="Create">Crea</button>
                </div>
            </form>
        </div>
    )
}
export default Story_create
