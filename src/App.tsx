import Layout from "./components/Layout";
import { useState } from "react";
import { Memo } from "./types";
import Editor from "./components/Editor";

const initialMemo = {
  id: Date.now(),
  text: "思いついたことを、サッとメモ。\n作業に集中するための、シンプルなメモアプリです！",
  timestamp: new Date().toLocaleString("ja-JP"),
};

function App(): JSX.Element {
  const [memos, setMemos] = useState<Memo[]>([initialMemo]);

  const addMemo = (inputText: string) => {
    if (inputText.trim()) {
      const memo: Memo = {
        id: Date.now(),
        text: inputText,
        timestamp: new Date().toLocaleString("ja-JP"),
      };
      setMemos([memo, ...memos]);
    }
  };

  return (
    <Layout>
      <div className="w-3/4 flex-col space-y-4">
        <Editor
          placeholder="新しいメモを入力.."
          type="shadow"
          onSubmit={addMemo}
        />
      </div>
      {memos.map((memo) => (
        <p key={memo.id}>{memo.text}</p>
      ))}
    </Layout>
  );
}

export default App;
