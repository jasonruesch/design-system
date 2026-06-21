import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";

const meta = {
  title: "Actions/Link",
  component: Link,
  args: { href: "#", children: "Read the docs" },
  argTypes: {
    variant: { control: "select", options: ["default", "subtle", "quiet"] },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Subtle: Story = { args: { variant: "subtle" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Link href="#" variant="default">
        Default
      </Link>
      <Link href="#" variant="subtle">
        Subtle
      </Link>
      <Link href="#" variant="quiet">
        Quiet
      </Link>
    </div>
  ),
};
