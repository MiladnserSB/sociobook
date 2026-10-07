
import type { User } from "./UserList";
import { Avatar, AvatarFallback } from "../ui/avatar";

type UserCardContentProps = {
  user: User;
};

const UserCardContent = ({ user }: UserCardContentProps) => {
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div>
        <h2 className="font-semibold">{user.name}</h2>

        <p className="text-sm text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
};

export default UserCardContent;
