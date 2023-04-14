import React, { useState } from "react";
import ReactPlayer from "react-player";

function YoutubeSection(props) {
  return (
    <div className="container-fluid">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${props.videoID}`}
        muted={false}
        playing={true}
        controls={true}
      />
    </div>
  );
}

export default YoutubeSection;
