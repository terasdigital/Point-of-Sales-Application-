import { DarkmodeToggle } from "@/components/common/darkmode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Input placeholder="Enter text here" />
      <Button>Hello</Button>
      <DarkmodeToggle />
    </div>
  );
}
