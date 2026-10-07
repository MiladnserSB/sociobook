import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type PostFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
};

const PostFormDialog = ({ open, onOpenChange, mode }: PostFormDialogProps) => {
  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Post" : "Create Post"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Post title"
            defaultValue={
              isEdit ? "sunt aut facere repellat provident occaecati" : ""
            }
          />

          <Textarea
            placeholder="Write your post..."
            className="min-h-32"
            defaultValue={isEdit ? "quia et suscipit..." : ""}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button>{isEdit ? "Save Changes" : "Create Post"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostFormDialog;
