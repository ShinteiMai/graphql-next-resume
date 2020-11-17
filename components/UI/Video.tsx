import clsx from "clsx";
import React, { useState } from "react";
import { TComponent } from "..";

interface Props extends TComponent {
  src: string;
  width?: number;
  height?: number;
}

const Video = ({ src, className }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <video
      className={clsx("w-full lg:w-96 cursor-pointer", className)}
      src={src}
      loop
      onMouseOver={(e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
        e.currentTarget.play()
      }
      onMouseOut={(e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
        e.currentTarget.pause()
      }
      onClick={(e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        if (isPlaying) {
          setIsPlaying(false);
          e.currentTarget.pause();
        } else {
          setIsPlaying(true);
          e.currentTarget.play();
        }
      }}
    />
  );
};
export default Video;
