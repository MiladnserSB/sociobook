import { useContext } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import UserCardContent from "./UserCardContent";
import type { User } from "./UserList";
import { userContext } from "../../context/UserContext";

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  const { setUserId } = useContext(userContext);

  return (
    <Link to="/posts" onClick={() => setUserId(user.id)} className="block">
      <Card className="overflow-hidden">
        <CardHeader>
          <UserCardContent user={user} />
        </CardHeader>

        <CardContent>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.address.city}</p>
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Works at {user.company.name}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default UserCard;
