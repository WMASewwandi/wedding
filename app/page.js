import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import InvitationExperience from "./components/InvitationExperience";

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Home() {
  return (
    <InvitationExperience
      scriptClassName={scriptFont.className}
      serifClassName={serifFont.className}
    />
  );
}
