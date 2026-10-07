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
import { Textarea } from "../ui/textarea";

const EditCommentDialog = ({
  comment,
  open,
  onOpenChange,
  onSubmit,
  loading,
}) => {
  const [body, setBody] = useState("");

  useEffect(() => {
    if (comment) {
      setBody(comment.body);
    }
  }, [comment]);

  const handleSubmit = () => {
    if (!body.trim()) return;

    onSubmit(body.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-blue-100 bg-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-blue-700">Edit Comment</DialogTitle>

          <DialogDescription>Update your comment.</DialogDescription>
        </DialogHeader>

        <Textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="min-h-32 border-blue-200 focus-visible:ring-blue-500"
        />

        <DialogFooter>
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={loading || !body.trim()}
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

export default EditCommentDialog;
