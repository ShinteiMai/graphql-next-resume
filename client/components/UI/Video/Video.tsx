import { TComponent } from "@components/types";
import clsx from "clsx";
import React, { useState } from "react";

interface Props extends TComponent {
  src: string;
  width?: number;
  height?: number;
}

const Video = ({ src, className }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <video
      preload="metadata"
      className={clsx("w-full lg:w-84 cursor-pointer", className)}
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
    >
      <source src={`${src}#t=0.1`} type="video/mp4" />
    </video>
  );
};
export default Video;
