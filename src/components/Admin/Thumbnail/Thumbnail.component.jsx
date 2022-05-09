import React, { useState, useEffect } from "react";
import "./Thumbnail.component.scss";

export default function Thumbnail({ thumbnail, id }) {
  const [image, setImage] = useState();
  const [styles, setStyles] = useState();
  const customStyles = {
    width: "96px",
    height: "96px",
  };

  useEffect(() => {
    id === "tat" ? setStyles(customStyles) : setStyles({});
  }, [id]);

  useEffect(() => {
    !thumbnail ? setImage("/thumbnails/thmb00.jpg") : setImage(thumbnail);
  }, [thumbnail]);

  return (
    <div className="table-thumbnail" id={id}>
      <img src={image} alt="thumbnail" style={styles} />
    </div>
  );
}
