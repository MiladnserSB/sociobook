import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import CommentItem from "../comments/CommentItem";

const PostCard = ({
  post,
  author,
  comments,
  currentUser,
  commentValue,
  onCommentChange,
  onAddComment,
  onEditPost,
  onDeletePost,
  onEditComment,
  onDeleteComment,
  saving,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-semibold">{author?.name}</p>

              <p className="text-sm text-muted-foreground">
                @{author?.username}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEditPost}>
              Edit
            </Button>

            <Button variant="destructive" size="sm" onClick={onDeletePost}>
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h2 className="text-lg font-semibold capitalize">{post.title}</h2>

        <p className="whitespace-pre-line leading-7">{post.body}</p>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-4 border-t pt-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Like
          </Button>

          <Button variant="ghost" size="sm">
            Comment
          </Button>

          <span className="text-sm text-muted-foreground">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </span>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              onEdit={() => onEditComment(comment)}
              onDelete={() => onDeleteComment(comment)}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              value={commentValue}
              onChange={(event) => onCommentChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onAddComment();
                }
              }}
              placeholder="Write a comment..."
              className="h-9 flex-1 rounded-full border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <Button
              size="sm"
              disabled={saving || !commentValue.trim()}
              onClick={onAddComment}
            >
              Post
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
