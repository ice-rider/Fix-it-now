import { useState } from "react";

export default function LazyLoading({ boxStyle, bigImg, previewImg, imgStyle, blur=1 }) {
  const [isLoadedBig, setIsLoadedBig] = useState(false);
  return (
    <div style={{ ...boxStyle, position: "relative" }}>
      <img
        src={bigImg}
        alt="big img"
        style={{
          ...imgStyle,
          width: "100%",
          height: "100%",
          opacity: isLoadedBig ? "1" : "0",
          borderRadius: "50%"
        }}
        onLoad={() => {
          if(isLoadedBig) return
          setIsLoadedBig(true);
        }}
      />
          <img
        src={previewImg}
        alt="preview"
        style={{
          ...imgStyle,
          position: "absolute",
          display: isLoadedBig ? "none" : "",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          filter: `blur(${blur}px)`,
          borderRadius: "50%"
        }}
      />
    </div>
  );
}
