import React from "react";
import { TComponent } from "..";

interface Props extends TComponent {
  src: string;
  width?: number;
  height?: number;
}

const Video = ({ src }: Props) => {
  return (
    <video
      className="w-full md:w-84 lg:w-120 rounded-sm"
      src={src}
      loop
      onMouseOver={(e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
        e.currentTarget.play()
      }
      onMouseOut={(e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
        e.currentTarget.pause()
      }
    />
  );
};
export default Video;
