import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./StoriesView.css";
import { deleteStory } from "endpoints/rest/userInteractions";
import { LucideTrash2 } from "lucide-react";
import Modal from "./Modal";

function StoriesView({ group, onClose, refreshStories }) {
  const [index, setIndex] = useState(0);
  const currentStory = group.stories[index];
  const [confirm, setAskconfirm] = useState(false);

  function next() {
    if (index < group.stories.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onClose();
    }
  }
  function prev() {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  }

    function handleDelete(storyId) {
        console.log("storyid:", storyId);
        deleteStory(storyId)
        .then(
            (data) => {
                setAskconfirm(false);
            }
        );
    }
    function onCloseModal(e) {
        setAskconfirm(false);
    }
    return (
    <>
      <div className="story-view">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        <button
          className="left-right-btn prev-btn"
          onClick={prev}
          disabled={index === 0}
        >
          <ChevronLeft size={26} />
        </button>
        <div className="trash-button" onClick={(e) => e.stopPropagation()}>
          <LucideTrash2 stroke="red" onClick={() => setAskconfirm(true)} />
        </div>
        <div className="media-container">
          {currentStory.mediaType === "video" ? (
            <video
              className="media"
              src={`/${currentStory.mediaUrl.replace(/\\/g, "/")}`}
              autoPlay
              onEnded={next}
              controls={false}
            />
          ) : (
            <img
              className="media"
              src={`/${currentStory.mediaUrl.replace(/\\/g, "/")}`}
            />
          )}
        </div>
        <button className="left-right-btn next-btn" onClick={next}>
          <ChevronRight size={26} />
        </button>
      </div>
      <Modal
        ask={true}
        confirmAction={() => handleDelete(currentStory._id)}
        open={confirm}
        onClose={onCloseModal}
      />
    </>
  );
}
export default StoriesView;
