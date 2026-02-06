'use client';

import { useState } from 'react';

export default function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <div
      className="relative w-full max-w-[1180px] h-[520px] rounded-[32px] overflow-hidden flex justify-center items-center"
      style={
        play
          ? {}
          : {
              backgroundImage:
                "linear-gradient(180deg, rgba(0, 52, 89, 0) 0%, rgba(0, 52, 89, 0.2) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(0, 52, 89, 0.09), rgba(0, 52, 89, 0.09)), url('/images/about/why-video.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
      }
    >
      {/* YouTube iframe */}
      {play && (
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/wULLCy-newQ?autoplay=1&rel=0"
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

      {/* Play Button */}
      {!play && (
        <button
          onClick={() => setPlay(true)}
          className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-black/30 hover:bg-black/40 transition"
        >
          <svg
            width="35"
            height="38"
            viewBox="0 0 35 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.5548 20.899C33.673 24.2478 29.5072 26.6147 21.1763 31.3476C13.1223 35.9234 9.095 38.2109 5.8499 37.2909C4.50587 36.9094 3.2831 36.1874 2.29998 35.1947C-0.0849609 32.7882 -0.0849609 28.122 -0.0849609 18.789C-0.0849609 9.4566 -0.0849609 4.78973 2.29998 2.38321C3.28283 1.3904 4.50535 0.668154 5.8492 0.286389C9.095 -0.632929 13.1216 1.65458 21.1763 6.23029C29.5072 10.9633 33.673 13.3301 34.5548 16.6796C34.9185 18.0623 34.9185 19.5156 34.5548 20.8983V20.899Z"
              fill="white"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
