import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const PlusIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const meta = {
  title: "Actions/IconButton",
  component: IconButton,
  args: { "aria-label": "Add item", children: <PlusIcon /> },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: "primary" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Add (primary)" variant="primary">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Add (outline)" variant="outline">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Add (ghost)" variant="ghost">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Add (danger)" variant="danger">
        <PlusIcon />
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Add (small)" size="sm">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Add (medium)" size="md">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Add (large)" size="lg">
        <PlusIcon />
      </IconButton>
    </div>
  ),
};
