import { useState } from "react";

export default function LazyLoading(props) {
  const [isLoadedBig, setIsLoadedBig] = useState(false);
  return (
    <div style={{ ...props.boxStyle, position: "relative" }}>
      <img
        src={props.bigImg}
        alt="big img"
        style={{
          ...props.imgStyle,
          width: "100%",
          height: "100%",
          opacity: isLoadedBig ? "1" : "0"
        }}
        onLoad={() => {
          if(isLoadedBig) return
          setIsLoadedBig(true);
        }}
      />
          <img
        src={props.previewImg}
        alt="preview"
        style={{
          ...props.imgStyle,
          position: "absolute",
          display: isLoadedBig ? "none" : "",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}
