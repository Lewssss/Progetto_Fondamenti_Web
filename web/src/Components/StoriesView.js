import { useState } from "react"

function StoriesView({group, onClose}) {
    const [index, setIndex] = useState(0);
    const currentStory = group.stories[index];
    function next() {
        if(index < group.stories.length-1) {
            setIndex(i => i+1);
        } else {
            onClose();
        }
    }
    function prev() {
        if(index > 0) {
            setIndex(i => i-1);
        }
    }
    return (
        <div className="story-view">
            <button onClick={onClose}>X</button>
            <button onClick={prev}></button>
            {currentStory.mediaType === 'video'
                ? <video src={currentStory.mediaUrl} onEnded={next} autoPlay controls={false} />
                : <img src={currentStory.mediaUrl} />}
            <button onClick={next}></button>
        </div>
    )
}
export default StoriesView