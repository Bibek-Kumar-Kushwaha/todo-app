import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <UserProfile routing="hash" />
    </div>
  );
}