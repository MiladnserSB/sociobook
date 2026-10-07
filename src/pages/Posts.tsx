import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { request } from "../lib/service";
import { userContext } from "../context/UserContext";
import EditCommentDialog from "../components/comments/EditCommentDialog";

const Posts = () => {
  const { userId } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  const [commentText, setCommentText] = useState({});
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      const data = await request("posts");
      setPosts(data);
    };

    const getComments = async () => {
      const data = await request("comments");
      setComments(data);
    };

    const getUsers = async () => {
      const data = await request("users");
      setUsers(data);
    };

    getPosts();
    getComments();
    getUsers();
  }, []);

  const postComment = async (postId, name, email, body) => {
    await request("comments", "POST", {
      postId: postId,
      name: name,
      email: email,
      body: body,
    });

    const data = await request("comments");
    setComments(data);

    setCommentText({
      ...commentText,
      [postId]: "",
    });
  };

  const deleteComment = async (commentId) => {
    await request(`comments/${commentId}`, "DELETE");

    const data = await request("comments");
    setComments(data);
  };

  const editComment = async (commentId, body) => {
    await request(`comments/${commentId}`, "PATCH", {
      body: body,
    });

    const data = await request("comments");
    setComments(data);
  };

  const handleEditComment = async (body) => {
    await editComment(editingComment.id, body);
    setEditingComment(null);
  };

  const currentUser = users.find((user) => user.id == userId);

  return (
    <main className="container mx-auto max-w-2xl space-y-6 p-6">
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.userId);

        return (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold">{author?.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {author?.username}
                  </p>
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
              </div>

              <div className="space-y-4">
                {comments
                  .filter(
                    (comment) => Number(comment.postId) === Number(post.id),
                  )
                  .map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {comment.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="rounded-2xl bg-muted px-4 py-2">
                          <p className="text-sm font-semibold">
                            {comment.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {comment.email}
                          </p>

                          <p className="mt-1 whitespace-pre-line text-sm">
                            {comment.body}
                          </p>
                        </div>

                        <div className="mt-1 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => setEditingComment(comment)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => deleteComment(comment.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    onChange={(e) => {
                      setCommentText({
                        ...commentText,
                        [post.id]: e.target.value,
                      });
                    }}
                    className="h-9 flex-1 rounded-full border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />

                  <Button
                    size="sm"
                    onClick={() => {
                      if (!currentUser) return;

                      postComment(
                        post.id,
                        currentUser.name,
                        currentUser.email,
                        commentText[post.id],
                      );
                    }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        );
      })}

      <EditCommentDialog
        comment={editingComment}
        open={!!editingComment}
        onOpenChange={(open) => {
          if (!open) {
            setEditingComment(null);
          }
        }}
        onSubmit={handleEditComment}
      />
    </main>
  );
};

export default Posts;
