import { Edit2, Trash2 } from "lucide-react";
import { Memo, Reply } from "../types";

type ContentBodyProps = {
  content: Memo | Reply;
  type: "memo" | "reply";
  onDelete: (id: number) => void;
  startEdit: (contentId: number, type: "memo" | "reply") => void;
};

const ContentBody = (props: ContentBodyProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{props.content.timestamp}</p>

        <div className="flex space-x-2">
          <button
            onClick={() => props.startEdit(props.content.id, props.type)}
            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => props.onDelete(props.content.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-gray-700">{props.content.text}</p>
    </>
  );
};

export default ContentBody;
