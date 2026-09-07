import { useState } from "react"
import {X, ChevronLeft, ChevronRight} from "lucide-react"
import "./StoriesView.css"

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
            <button className="close-btn" onClick={onClose}>
                <X size={20} />
            </button>
            <button className="left-right-btn prev-btn" onClick={prev} disabled={index === 0}>
                <ChevronLeft size={26} />
            </button>
            <div className="media-container">
                {currentStory.mediaType === 'video'
                ? <video className="media" src={`/${currentStory.mediaUrl.replace(/\\/g, '/')}`} autoPlay onEnded={next} controls={false} />
                : <img className="media" src={`/${currentStory.mediaUrl.replace(/\\/g, '/')}`} />}
            </div>
            <button className="left-right-btn next-btn" onClick={next}>
                <ChevronRight size={26} />
            </button>
        </div>
    )
}
export default StoriesView