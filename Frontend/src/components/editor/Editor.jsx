import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import { extensions } from "../../constants/tiptapExtensions";

const Editor = ({ onDataChange, content, editable }) => {
  // Initialize the editor instance using useEditor hook
  const editor = useEditor({
    editable, // Set whether the editor is editable or not
    extensions: extensions, // Pass extensions to configure editor features
    editorProps: {
      // Customize editor attributes, such as classes for styling
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base max-w-none mt-7 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
      },
    },
    onUpdate: ({ editor }) => {
      // Handle editor content update
      const json = editor.getJSON();
      onDataChange(json); // Call onDataChange prop with updated content
    },
    content: content, // Set initial content of the editor
  });

  return (
    <div className="relative w-full">
      {editable && <MenuBar editor={editor} />}{" "}
      {/* Render MenuBar if editable */}
      <EditorContent editor={editor} /> {/* Render editor content */}
    </div>
  );
};

export default Editor;
