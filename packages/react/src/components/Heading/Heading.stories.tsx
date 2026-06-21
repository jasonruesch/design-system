import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";

const meta = {
  title: "Typography/Heading",
  component: Heading,
  args: { children: "Section heading" },
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Level1: Story = { args: { level: 1 } };

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Heading level={1}>Level 1</Heading>
      <Heading level={2}>Level 2</Heading>
      <Heading level={3}>Level 3</Heading>
      <Heading level={4}>Level 4</Heading>
      <Heading level={5}>Level 5</Heading>
      <Heading level={6}>Level 6</Heading>
    </div>
  ),
};
