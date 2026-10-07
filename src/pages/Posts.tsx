import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
type User = { id: number; name: string; username: string };
type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  author: User;
  comments: Comment[];
};
const posts: Post[] = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    author: { id: 1, name: "Leanne Graham", username: "Bret" },
    comments: [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        name: "quo vero reiciendis velit similique earum",
        email: "Jayne_Kuhic@sydney.com",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      },
    ],
  },
  {
    userId: 2,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    author: { id: 2, name: "Ervin Howell", username: "Antonette" },
    comments: [
      {
        postId: 2,
        id: 3,
        name: "odio adipisci rerum aut animi",
        email: "Nikita@garfield.biz",
        body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
      },
    ],
  },
];
const Posts = () => {
  return (
    <main className="container mx-auto max-w-2xl space-y-6 p-6">
      
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          

          <CardHeader className="pb-3">
            
            <div className="flex items-center gap-3">
              
              <Avatar>
                
                <AvatarFallback>
                  
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  
                  {post.author.username}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            
            <h2 className="text-lg font-semibold capitalize">
              
              {post.title}
            </h2>
            <p className="whitespace-pre-line leading-7"> {post.body} </p>
          </CardContent>
          {/* Actions + Comments */}
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
              
              {post.comments.map((comment) => (
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
                  </div>
                </div>
              ))}
            </div>
            {/* Add Comment */}
            <div className="flex items-center gap-3">
              
              <Avatar className="h-8 w-8">
                
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center gap-2">
                
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="h-9 flex-1 rounded-full border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="sm">Post</Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};
export default Posts;
