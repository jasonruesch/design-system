import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";

const meta = {
  title: "Layout/Box",
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "rounded-md bg-muted p-4",
    children: "Box content",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    className: "rounded-md border border-line p-4",
    children: "Rendered as a <section>",
  },
};
