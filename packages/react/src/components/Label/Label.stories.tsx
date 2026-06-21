import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta = {
  title: "Forms/Label",
  component: Label,
  args: { children: "Email" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = { args: { required: true } };

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email" required>
        Email
      </Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="h-10 rounded-md border border-line bg-canvas px-3 text-sm text-fg"
      />
    </div>
  ),
};
