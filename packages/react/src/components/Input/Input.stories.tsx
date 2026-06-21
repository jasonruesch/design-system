import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Field } from "../Field";

const meta = {
  title: "Forms/Input",
  component: Input,
  args: { placeholder: "Enter text…" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["default", "invalid"] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const InField: Story = {
  render: () => (
    <Field label="Email" description="We'll never share your email.">
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
};

export const InvalidInField: Story = {
  render: () => (
    <Field label="Email" error="Please enter a valid email address.">
      <Input type="email" defaultValue="not-an-email" />
    </Field>
  ),
};
