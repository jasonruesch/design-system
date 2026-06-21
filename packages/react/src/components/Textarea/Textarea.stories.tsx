import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";
import { Field } from "../Field";

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  args: { placeholder: "Write something…" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const InField: Story = {
  render: () => (
    <Field label="Bio" description="A short description about yourself.">
      <Textarea placeholder="Tell us about yourself…" />
    </Field>
  ),
};

export const InvalidInField: Story = {
  render: () => (
    <Field label="Bio" error="Bio is required.">
      <Textarea />
    </Field>
  ),
};
