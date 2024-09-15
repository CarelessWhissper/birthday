import HomePage from "@/components/homepage";
import { Countdown } from "@/components/countdown";
import DeleteKeys from "@/components/deletebtn";
export default function Home() {
  return (
    <div>
      <Countdown />
      <DeleteKeys/>
      <HomePage />
    </div>
  );
}
