import { AvatarUser } from "./avatar";

export const UserProfile = () => {
  return (
    <section className="flex flex-row gap-2 items-center">
      <AvatarUser />
      <span>Ryan O.</span>
    </section>
  );
};
