import { Send } from "lucide-react";
import { useState } from "react";

type EditorProps = {
  initialValue?: string;
  placeholder?: string;
  type?: "border" | "shadow";
  onSubmit: (content: string) => void;
};

const Editor = (props: EditorProps): JSX.Element => {
  const { initialValue = "", placeholder = "", type = "border" } = props;
  const [inputText, setinputText] = useState(initialValue);

  return (
    <div className="space-y-2">
      <textarea
        value={inputText}
        onChange={(e) => setinputText(e.target.value)}
        placeholder={placeholder}
        className={
          type === "border"
            ? "w-full rounded-lg p-2 border"
            : "w-full rounded-lg p-4 shadow-lg"
        }
        rows={type === "border" ? 3 : 4}
      />
      <button
        onClick={() => {
          props.onSubmit(inputText);
          setinputText("");
        }}
        className="px-8 py-3 bg-emerald-600 text-sm text-white rounded-lg hover:bg-emerald-700"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Editor;
