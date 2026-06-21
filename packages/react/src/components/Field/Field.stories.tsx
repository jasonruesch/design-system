import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Input } from "../Input";

const meta = {
  title: "Forms/Field",
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field label="Email" description="We'll never share your email.">
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field label="Full name" required>
      <Input placeholder="Jane Doe" />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field
      label="Email"
      description="We'll never share your email."
      error="Please enter a valid email address."
    >
      <Input type="email" defaultValue="not-an-email" />
    </Field>
  ),
};
