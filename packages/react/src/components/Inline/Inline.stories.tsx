import type { Meta, StoryObj } from "@storybook/react-vite";
import { Inline } from "./Inline";

const meta = {
  title: "Layout/Inline",
  component: Inline,
  argTypes: {
    gap: { control: "select", options: [0, 1, 2, 3, 4, 6, 8] },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
    wrap: { control: "boolean" },
  },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md bg-muted p-3">{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <Inline {...args}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Inline>
  ),
};

export const Wrapping: Story = {
  render: () => (
    <Inline wrap gap={2}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
      <Item>Four</Item>
      <Item>Five</Item>
    </Inline>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <Inline justify="between" className="w-96">
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Inline>
  ),
};
