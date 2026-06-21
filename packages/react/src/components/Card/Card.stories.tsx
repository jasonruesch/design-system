import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

const meta = {
  title: "Feedback/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Project Apollo</CardTitle>
        <CardDescription>An overview of the current sprint.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Everything is on track for the upcoming release.</p>
      </CardContent>
      <CardFooter>
        <span>Updated just now</span>
      </CardFooter>
    </Card>
  ),
};
