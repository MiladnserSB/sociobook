import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import { request } from "../lib/service";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const Posts = () => {
  const { userId } = useContext(userContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (userId === -1) return;

    const getPosts = async () => {
      const data = await request(`posts?userId=${userId}`);
      setPosts(data);
    };

    getPosts();
  }, [userId]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">All Posts</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.id} className="rounded-lg border bg-card p-5">
            <h2 className="mb-2 text-lg font-semibold capitalize">
              {post.title}
            </h2>

            <p className="text-sm leading-6 text-muted-foreground">
              {post.body}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Posts;
