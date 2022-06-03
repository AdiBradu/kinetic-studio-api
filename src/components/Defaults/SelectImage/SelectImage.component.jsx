import React, { useCallback, useEffect, useState } from "react";
import "./Slectimage.component.scss";
import Thumbnail from "../../Admin/Thumbnail/Thumbnail.component";
import {useDropzone} from 'react-dropzone';
export default function SelectImage({ id, src, handleChange }) {
  const [imgSrc, setImgSrc] = useState(src + ``);
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {      
      const reader = new FileReader()     
      reader.onload = () => {
        const binaryStr = reader.result;
        handleChange(binaryStr);
        setImgSrc(binaryStr);
      }
      reader.readAsDataURL(file)
    })
  };
  const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({onDrop, accept: 'image/*', maxFiles: 1});
  
  return (
      <div className="select-image" {...getRootProps()}>    
          <Thumbnail id={id} thumbnail={imgSrc?.length & imgSrc !== `null` ? imgSrc : false} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>
                upload
              </p>
          }
          <input {...getInputProps()} />
      </div>
  );
}
