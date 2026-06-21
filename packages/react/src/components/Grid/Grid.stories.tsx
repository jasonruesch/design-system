import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./Grid";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  argTypes: {
    cols: { control: "select", options: [1, 2, 3, 4, 6, 12] },
    gap: { control: "select", options: [0, 1, 2, 3, 4, 6, 8] },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md bg-muted p-3 text-center">{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
      <Item>Four</Item>
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Grid cols={3} gap={2}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
      <Item>Four</Item>
      <Item>Five</Item>
      <Item>Six</Item>
    </Grid>
  ),
};
