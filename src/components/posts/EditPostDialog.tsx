import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const EditPostDialog = ({ post, open, onOpenChange, onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;

    onSubmit(title.trim(), body.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-blue-100 bg-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-blue-700">
            Edit Post
          </DialogTitle>

          <DialogDescription>
            Update your post title and content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input
            placeholder="Post title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="border-blue-200 focus-visible:ring-blue-500"
          />

          <Textarea
            placeholder="Write your post..."
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="min-h-32 border-blue-200 focus-visible:ring-blue-500"
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={loading || !title.trim() || !body.trim()}
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
