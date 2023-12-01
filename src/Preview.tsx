import { Audio } from "../dist/components";

function Preview() {
  return (
    <div
      style={{
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
        width: "100vw",
        height:500,
      }}
    >
      <Audio audioSrc="https://samplelib.com/lib/preview/mp3/sample-15s.mp3" />
    </div>
  );
}

export default Preview;
