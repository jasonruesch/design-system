import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";

const meta = {
  title: "Layout/Stack",
  component: Stack,
  argTypes: {
    gap: { control: "select", options: [0, 1, 2, 3, 4, 6, 8] },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md bg-muted p-3">{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
};

export const LargeGap: Story = {
  render: () => (
    <Stack gap={8}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
};

export const Centered: Story = {
  render: () => (
    <Stack align="center" gap={2}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
};
