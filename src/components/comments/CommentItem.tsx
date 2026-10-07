import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const CommentItem = ({ comment, currentUser, onEdit, onDelete }) => {
  const isOwnComment = currentUser?.email === comment.email;

  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{comment.name?.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="rounded-2xl bg-muted px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{comment.name}</p>

              <p className="text-xs text-muted-foreground">{comment.email}</p>
            </div>

            {isOwnComment && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={onEdit}
                >
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-destructive hover:text-destructive"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <p className="mt-2 whitespace-pre-line text-sm">{comment.body}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
