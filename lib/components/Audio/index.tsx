import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./Icon";
import styles from "./styles.module.css";


export function Audio({
  audioSrc,
  audioProps,
  props,
  controlBox,
  waveBox,
  seekHandler,
  waveColor,
  autoPlay,
  speedBox,
}: {
  /**
   * All audio API props are available here
   */
  audioProps?: React.AudioHTMLAttributes<HTMLAudioElement>;

  /**
   * Audio src link | string, can be a relative path
   */
  audioSrc: string;

  /**
   * All props for the parent wrapper component are available here, including styling
   */
  props?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * All props for the parent wrapper component are available here, including styling
   */
  controlBox?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * All props for the wave wrapper component are available here, including styling
   */
  waveBox?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Style and class props for the wave handle
   */
  seekHandler?: React.HTMLAttributes<HTMLSpanElement>;

  /**
   * Style and class props for the waves
   */
  waves?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Wavecolor object, wave colors can be controlled here
   */
  waveColor?: { before?: string; after?: string };

  /**
       All props for the playback wrapper component are available here, including styling
   */
  speedBox?: React.HTMLAttributes<HTMLSpanElement>;

  /**
       autoplay audio
   */
  autoPlay?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isplayback, setisplayback] = useState(true);
  const [seekControlpercent, setControlPercent] = useState(1);
  const [waves_] = useState(Array(70).fill(""));
  const [maxCleintX, setmaxCleintX] = useState(428);
  const [minCleintX, setminCleintX] = useState(227);

  const { className, ...mainDivProps } = props || {};
  const { className: controlDivClass, ...controlDivProps } = controlBox || {};
  const { className: waveDivClass, ...waveDivProps } = waveBox || {};
  const { className: seekBoxClass, style: seekStyle } = seekHandler || {};
  const { className: speedBoxClass, ...speedProps } = speedBox || {};

  const myDivRef = useRef<HTMLDivElement>(null);
  const str_pad_left = (
    string: string | number,
    pad: string | undefined,
    length: number
  ) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };

  useEffect(() => {
    if (myDivRef.current) {
      const rect = myDivRef.current.getBoundingClientRect();
      const maxClientX = rect.left + rect.width;
      const minClientX = rect.right - rect.width;
      setmaxCleintX(+maxClientX.toFixed());
      setminCleintX(+minClientX.toFixed());
    }

    if (audioRef.current?.duration) {
      const sec = audioRef.current.duration;

      function secondsToMinutesAndSeconds(seconds: number) {
        const min = Math.floor(seconds / 60);
        const hour = Math.floor(min / 60);
        const remainingSec = Math.floor(seconds % 60);
        return { hour, min, remainingSec };
      }
      const { min, remainingSec } = secondsToMinutesAndSeconds(sec);

      const currentTime =
        str_pad_left(min, "0", 2) + ":" + str_pad_left(remainingSec, "0", 2);
      setCurrentTime(currentTime);

      setPlaybackRate(audioRef.current.playbackRate);
    }
  }, [audioRef, audioRef.current?.duration]);

  function numberToPercentage(number: number, min: number, max: number) {
    // Ensure the number is within the specified range
    const clampedNumber = Math.min(Math.max(number, min), max);

    // Normalize the clampedNumber within the range [min, max] to a percentage
    const percentage = (((clampedNumber - min) / (max - min)) * 100).toFixed();

    return +percentage;
  }

  const timeUpdate = (event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audioElement = event.target as HTMLAudioElement;
    const audioCurrentTime = audioElement.currentTime;
    const audioDuration = audioElement.duration;
    const minutes = Math.floor(audioCurrentTime / 60);
    const seconds = Math.floor(audioCurrentTime - minutes * 60);

    const currentTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    setCurrentTime(currentTime);

    // updating seek level with audio time
    const newSeekControlPerc = numberToPercentage(
      audioCurrentTime,
      0,
      audioDuration
    );
    setControlPercent(newSeekControlPerc);
    if (audioCurrentTime >= audioDuration) {
      setIsPaused(true);
    }
  };

  const randomNumber = () => {
    return Math.random() * 16;
  };

  const handleSeek = (e: { clientX: number }) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
      // Calculate the percentage based on the mouse position
      const perc = numberToPercentage(e.clientX, minCleintX, maxCleintX);

      // Update the state with the new percentage
      setControlPercent(perc);

      // Calculate the new audio position based on the percentage
      const audioDuration = audioRef.current.duration;
      const audiopercentage_equal = (audioDuration / 100) * perc;

      // Set the new audio position
      audioRef.current.currentTime = audiopercentage_equal;
    }
  };

  const handleTogglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }

      setIsPaused(audioRef.current.paused);
    }
  };

  const handlePlayBackRate = () => {
    setisplayback(!isplayback);
    if (audioRef.current) {
      if (isplayback) {
        audioRef.current.playbackRate = 2;
        setPlaybackRate(2);
      } else {
        audioRef.current.playbackRate = 1;
        setPlaybackRate(1);
      }
    }
  };
  return (
    <div>
      <div className={`${styles.mainDivStyle} ${className} `} {...mainDivProps}>
        <div
          className={`${styles.controlDiv} ${controlDivClass}`}
          {...controlDivProps}
          onClick={handleTogglePlayPause}
        >
          {!isPaused ? <PauseIcon /> : <PlayIcon />}
        </div>

        <div
          // onTouchStart={handleSwipe}
          ref={myDivRef}
          onMouseMoveCapture={handleSeek}
          className={`${styles.waveDiv} ${waveDivClass}`}
          {...waveDivProps}
        >
          <span
            className={`${styles.animate} ${seekBoxClass} `}
            style={{
              borderRadius: 5,
              height: 10,
              width: 15,
              background: "#0c0b0b",
              opacity: 5,
              position: "absolute",
              zIndex: 5,
              cursor: "w-resize",
              left: `${seekControlpercent}%`,
              ...seekStyle,
            }}
          ></span>
          {waves_.map((_, index) => {
            return (
              <div
                className={` ${styles.animate}`}
                key={index}
                style={{
                  width: 2,
                  height: randomNumber(),
                  borderRadius: 5,
                  background:
                    seekControlpercent < index + 20
                      ? waveColor?.before !== undefined
                        ? waveColor.before
                        : "#797979"
                      : waveColor?.after !== undefined
                      ? waveColor.after
                      : "#dedede",
                }}
              ></div>
            );
          })}
        </div>
        <div
          style={{
            paddingLeft: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            onClick={handlePlayBackRate}
            className={`${styles.playbackBox} ${speedBoxClass}`}
            {...speedProps}
          >
            {`${playbackRate}x`}
          </span>
          <p
            style={{
              fontSize: 10,
              color: "#d8d8d8",
            }}
          >
            {currentTime}
          </p>
        </div>
      </div>
      <audio
        autoPlay={autoPlay}
        {...audioProps}
        hidden
        ref={audioRef}
        onTimeUpdate={timeUpdate}
      >
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
    </div>
  );
}
