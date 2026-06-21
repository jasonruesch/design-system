import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../Label";

const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="one" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="one" id="d1" />
        <Label htmlFor="d1">Option one</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="two" id="d2" />
        <Label htmlFor="d2">Option two</Label>
      </div>
    </RadioGroup>
  ),
};
