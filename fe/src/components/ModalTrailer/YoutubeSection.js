import React, { useState } from "react";
import ReactPlayer from "react-player";

function YoutubeSection(props) {
  console.log(props.videoID);
  return (
    <div className="container-fluid">
      <ReactPlayer
        url={`${props.videoID}`}
        muted={false}
        playing={true}
        controls={true}
      />
    </div>
  );
}

export default YoutubeSection;
