import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", "full"] },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="rounded-md bg-muted p-4 text-center">
        Centered, max-width content
      </div>
    </Container>
  ),
};

export const Small: Story = {
  render: () => (
    <Container size="sm">
      <div className="rounded-md bg-muted p-4 text-center">Small container</div>
    </Container>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Container size="full">
      <div className="rounded-md bg-muted p-4 text-center">Full width</div>
    </Container>
  ),
};
