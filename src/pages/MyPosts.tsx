import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import { request } from "../lib/service";

import { Button } from "../components/ui/button";
import PostCard from "../components/posts/PostCard";
import CreatePostDialog from "../components/posts/CreatePostDialog";
import EditPostDialog from "../components/posts/EditPostDialog";
import DeleteDialog from "../components/posts/DeletePostDialog";
import EditCommentDialog from "../components/comments/EditCommentDialog";

const MyPosts = () => {
  const { userId } = useContext(userContext);

  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [commentDrafts, setCommentDrafts] = useState({});

  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);

  const [editingComment, setEditingComment] = useState(null);
  const [deletingComment, setDeletingComment] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (userId === -1) return;

      setLoading(true);

      const user = await request(`users/${userId}`);
      const userPosts = await request(`posts?userId=${userId}`);
      const allComments = await request("comments");

      const postIds = userPosts.map((post) => Number(post.id));

      const userPostComments = allComments.filter((comment) =>
        postIds.includes(Number(comment.postId)),
      );

      setCurrentUser(user);
      setPosts(userPosts);
      setComments(userPostComments);

      setLoading(false);
    };

    getData();
  }, [userId]);

  const refreshData = async () => {
    const user = await request(`users/${userId}`);
    const userPosts = await request(`posts?userId=${userId}`);
    const allComments = await request("comments");

    const postIds = userPosts.map((post) => Number(post.id));

    const userPostComments = allComments.filter((comment) =>
      postIds.includes(Number(comment.postId)),
    );

    setCurrentUser(user);
    setPosts(userPosts);
    setComments(userPostComments);
  };

  const createPost = async (title, body) => {
    if (!currentUser) return;

    setLoading(true);

    await request("posts", "POST", {
      userId: currentUser.id,
      title: title,
      body: body,
    });

    setCreatePostOpen(false);

    await refreshData();

    setLoading(false);
  };

  const editPost = async (title, body) => {
    if (!editingPost) return;

    setLoading(true);

    await request(`posts/${editingPost.id}`, "PATCH", {
      title: title,
      body: body,
    });

    setEditingPost(null);

    await refreshData();

    setLoading(false);
  };

  const deletePost = async () => {
    if (!deletingPost) return;

    setLoading(true);

    const postComments = comments.filter(
      (comment) => Number(comment.postId) === Number(deletingPost.id),
    );

    for (const comment of postComments) {
      await request(`comments/${comment.id}`, "DELETE");
    }

    await request(`posts/${deletingPost.id}`, "DELETE");

    setDeletingPost(null);

    await refreshData();

    setLoading(false);
  };

  const createComment = async (postId) => {
    if (!currentUser) return;

    const body = commentDrafts[postId]?.trim();

    if (!body) return;

    setLoading(true);

    await request("comments", "POST", {
      postId: postId,
      name: currentUser.name,
      email: currentUser.email,
      body: body,
    });

    setCommentDrafts({
      ...commentDrafts,
      [postId]: "",
    });

    await refreshData();

    setLoading(false);
  };

  const editComment = async (body) => {
    if (!editingComment || !currentUser) return;

    if (editingComment.email !== currentUser.email) return;

    setLoading(true);

    await request(`comments/${editingComment.id}`, "PATCH", {
      body: body,
    });

    setEditingComment(null);

    await refreshData();

    setLoading(false);
  };

  const deleteComment = async () => {
    if (!deletingComment || !currentUser) return;

    if (deletingComment.email !== currentUser.email) return;

    setLoading(true);

    await request(`comments/${deletingComment.id}`, "DELETE");

    setDeletingComment(null);

    await refreshData();

    setLoading(false);
  };

  if (userId === -1) {
    return (
      <main className="container mx-auto max-w-2xl p-6">
        <p className="text-center text-muted-foreground">
          Please select a user first.
        </p>
      </main>
    );
  }

  if (loading && !currentUser) {
    return (
      <main className="container mx-auto max-w-2xl p-6">
        <p className="text-center text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
     

        <Button
          className="justify-end bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setCreatePostOpen(true)}
        >
          Create Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-blue-100 bg-white py-12 text-center shadow-sm">
          <p className="text-muted-foreground">
            You have no posts yet.
          </p>

          <Button
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setCreatePostOpen(true)}
          >
            Create Your First Post
          </Button>
        </div>
      ) : (
        posts.map((post) => {
          const postComments = comments.filter(
            (comment) =>
              Number(comment.postId) === Number(post.id),
          );

          return (
            <PostCard
              key={post.id}
              post={post}
              author={currentUser}
              comments={postComments}
              currentUser={currentUser}
              commentValue={commentDrafts[post.id] ?? ""}
              onCommentChange={(value) =>
                setCommentDrafts({
                  ...commentDrafts,
                  [post.id]: value,
                })
              }
              onAddComment={() => createComment(post.id)}
              onEditPost={() => setEditingPost(post)}
              onDeletePost={() => setDeletingPost(post)}
              onEditComment={(comment) => setEditingComment(comment)}
              onDeleteComment={(comment) => setDeletingComment(comment)}
              saving={loading}
            />
          );
        })
      )}

      <CreatePostDialog
        open={createPostOpen}
        onOpenChange={setCreatePostOpen}
        onSubmit={createPost}
        loading={loading}
      />

      <EditPostDialog
        post={editingPost}
        open={!!editingPost}
        onOpenChange={(open) => {
          if (!open) {
            setEditingPost(null);
          }
        }}
        onSubmit={editPost}
        loading={loading}
      />

      <DeleteDialog
        open={!!deletingPost}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingPost(null);
          }
        }}
        title="Delete post?"
        description="This will permanently delete this post and all of its comments."
        onConfirm={deletePost}
        loading={loading}
      />

      <EditCommentDialog
        comment={editingComment}
        open={!!editingComment}
        onOpenChange={(open) => {
          if (!open) {
            setEditingComment(null);
          }
        }}
        onSubmit={editComment}
        loading={loading}
      />

      <DeleteDialog
        open={!!deletingComment}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingComment(null);
          }
        }}
        title="Delete comment?"
        description="This action cannot be undone."
        onConfirm={deleteComment}
        loading={loading}
      />
    </main>
  );
};

export default MyPosts;
