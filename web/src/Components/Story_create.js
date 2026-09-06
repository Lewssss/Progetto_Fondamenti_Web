import { addStory } from "endpoints/rest/userInteractions";
import { useRef, useState } from "react";

function Story_create({onClose, onCreated}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const File_upload = useRef(null);
    function handleFile(file) {
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
        const content = e.target.content.value;
        await addStory(file, content);
        onCreated?.();
        onClose();
    }
    return (
        <div className="story-creation">
            <h1>Crea Storia</h1>
            <form onSubmit={handleSubmit}>
                <div className="media-upload" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => File_upload.current.click()}>
                    <input ref={File_upload} type="file" name="media" accept="image/*,video/*" hidden onChange={(e) => handleFile(e.target.files[0])} required />
                    {preview ? (
                        mediaType === 'video' ? <video className="uploaded-video" src={preview} controls/> : <img className="uploaded-img" src={preview}/>
                    ) : (
                        <p>Trascina o sfoglia<br />per importare foto o video</p>
                    )}
                </div>
                <div className="story-content">
                    <label>Descrizione (opzionale)</label>
                    <input id="content" type="text" name="content" />
                </div>
                <div className="creation-interact">
                    <button className="action" type="button" onClick={onClose}>Cancella</button>
                    <button className="action" type="submit">Pubblica</button>
                </div>
            </form>
        </div>
    )
}
export default Story_create