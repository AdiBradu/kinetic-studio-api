import React from "react";
import "./Slectimage.component.scss";
import Thumbnail from "../../Admin/Thumbnail/Thumbnail.component";

export default function SelectImage({ id }) {
  return (
    <div className="select-image">
      <Thumbnail id={id} />
      <p>upload</p>
    </div>
  );
}
