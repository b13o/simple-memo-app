import { Memo, Reply } from "../types";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Editor from "./Editor";
import ContentBody from "./ContentBody";
import ReplyList from "./ReplyList";

type MemoListProps = {
  memos: Memo[];
  setMemos: React.Dispatch<React.SetStateAction<Memo[]>>;
};

const MemoList = (props: MemoListProps) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingTo, setEditingTo] = useState<{
    id: number;
    type: "memo" | "reply";
  } | null>(null);

  const updateMemo = (inputText: string) => {
    if (inputText.trim() && editingTo) {
      props.setMemos(
        props.memos.map((memo) =>
          memo.id === editingTo.id ? { ...memo, text: inputText } : memo
        )
      );
      setEditingTo(null);
    }
  };

  const deleteMemo = (id: number) => {
    props.setMemos(props.memos.filter((memo) => memo.id !== id));
    setReplies(replies.filter((reply) => reply.parentId !== id));
  };

  const startEdit = (id: number, type: "memo" | "reply") => {
    setEditingTo({ id: id, type: type });
  };

  const getRepliesForMemo = (memoId: number) => {
    return replies.filter((reply) => reply.parentId === memoId);
  };

  const addReply = (inputText: string) => {
    if (inputText.trim() && replyingTo) {
      const reply: Reply = {
        id: Date.now(),
        text: inputText,
        timestamp: new Date().toLocaleString("ja-JP"),
        parentId: replyingTo,
      };
      setReplies([reply, ...replies]);
      setReplyingTo(null);
    }
  };
  return (
    <>
      {props.memos.map((memo) => (
        <div
          key={memo.id}
          className="border border-gray-300 shadow bg-white rounded-lg p-4"
        >
          {editingTo?.id === memo.id && editingTo?.type === "memo" ? (
            <Editor initialValue={memo.text} onSubmit={updateMemo} />
          ) : (
            <div className="space-y-4">
              {/* ContentBody */}
              <ContentBody
                type="memo"
                content={memo}
                onDelete={deleteMemo}
                startEdit={startEdit}
              />
              <hr />
              <div className="ml-8 space-y-4">
                {/* ReplyList */}
                <ReplyList
                  replies={getRepliesForMemo(memo.id)}
                  setReplies={setReplies}
                  startEdit={startEdit}
                  editingTo={editingTo}
                  setEditingTo={setEditingTo}
                />
                {replyingTo === memo.id ? (
                  <Editor onSubmit={addReply} placeholder="リプライを入力..." />
                ) : (
                  <button
                    onClick={() => setReplyingTo(memo.id)}
                    className="-ml-8 text-emerald-600 hover:text-emerald-700"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default MemoList;
