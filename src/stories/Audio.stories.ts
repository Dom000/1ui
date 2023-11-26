import type { Meta, StoryObj } from "@storybook/react";
import { Audio } from "../../lib/main";
import { Source } from "@storybook/blocks";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Audio",
  component: Audio,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "centered",

    docs: {
      description: {
        component: `## Custom Audio Player

          A custom React audio player component with enhanced features.

          ### Features
          - Play, pause, and seek functionality.
          - Customizable appearance and styles.
          - Display of current playback time and total duration.
          - Additional controls for playback speed.



        `,
      },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Audio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    audioSrc: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",

    /**This a test */
    props: {
      /**This a test */

      style: {},
      className: "",
    },
    controlBox: {
      style: {},
      className: "",
    },
    waveBox: {
      style: {},
      className: "",
    },
    seekHandler: {
      style: {},
      className: "",
    },
    waves: {
      style: {},
    },
    autoPlay: true,
    waveColor: {},
    audioProps: {},
    speedBox: {
      style: {},
      className: "",
    },
  },
};
