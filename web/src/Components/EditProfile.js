import react from 'react'
import { useState, useRef, useContext } from 'react'
import { userContext } from '../Context/UserContext'
import { updateUserImage } from '../endpoints/rest/userInteractions'
import { updateUserBio } from '../endpoints/rest/userInteractions'
import './EditProfile.css'

function EditProfile({ onClose, onUpdated, userdata }) {
    const { user, setUser } = useContext(userContext);
    const [file, setFile] = useState(null);
    const [img, imgPreview] = useState(userdata?.profilepicture || null);
    const [bio, setBio] = useState(userdata?.bio || "");
    const fileInput = useRef(null);

    function handleFile(e) {
        imgPreview(URL.createObjectURL(e));
        setFile(e)
    }
    async function handleSubmit(e) {
    e.preventDefault();
    let updatedUser = { ...user };
    if (file) {
      const imgRes = await updateUserImage(user.id, file);
      updatedUser.profilePicture = imgRes.data.profilePicture;
    }
    if (bio !== userdata.bio) {
        const bioRes = await updateUserBio(bio);
        updatedUser.bio = bioRes.bio;
    }
    setUser(updatedUser);
    onUpdated?.(updatedUser); 
    onClose();
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="image-upload" onClick={() => fileInput.current.click()}>
        <input
          ref={fileInput}
          type="file"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {img ? <img className="uploaded-img" src={img} /> : <p>Cambia foto</p>}
      </div>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Scrivi una bio..."
        maxLength={150}
      />
      <div className="creation-interact">
        <button type="button" onClick={onClose}>Annulla</button>
        <button type="submit">Salva</button>
      </div>
    </form>
  );
}

export default EditProfile