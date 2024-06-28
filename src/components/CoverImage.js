import { useState, useEffect } from "react";
import { IMG_PLACEHOLDER } from "../constants/imgPlaceholder";

export default function CoverImage({ src, title, size }) {
  const [path, setPath] = useState("");

  useEffect(() => {
    if (src === "N/A") {
      setPath(IMG_PLACEHOLDER);
    } else if (src.startsWith("https")) {
      setPath(src);
    } else {
      setPath(`/img/covers/${title}.jpg`);
    }
  }, [src]);

  const handleImageError = () => {
    setPath(IMG_PLACEHOLDER);
  };

  return (
    <img
      className={`game_poster--${size}`}
      src={path}
      alt={`Cover of ${title} game`}
      onError={handleImageError}
    />
  );
}
