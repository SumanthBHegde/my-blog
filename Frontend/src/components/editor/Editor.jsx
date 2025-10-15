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
      // Customize editor attributes with modern forest-themed styling
      attributes: {
        class:
          "!prose !prose-forest prose-sm sm:prose-base lg:prose-lg max-w-none mt-6 px-6 py-4 focus:outline-none min-h-[400px] prose-headings:text-forest-800 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-forest-600 prose-a:no-underline hover:prose-a:text-forest-700 hover:prose-a:underline prose-strong:text-forest-900 prose-code:text-forest-700 prose-code:bg-forest-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-forest-900 prose-pre:text-forest-50 prose-pre:border prose-pre:border-forest-700 prose-pre:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-forest-500 prose-blockquote:bg-forest-50 prose-blockquote:italic prose-li:text-gray-700 prose-img:rounded-lg prose-img:shadow-md",
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
      <div className="mt-4 border-2 border-forest-200 rounded-xl bg-white shadow-inner overflow-hidden">
        <EditorContent editor={editor} />{" "}
        {/* Render editor content with modern styling */}
      </div>
    </div>
  );
};

export default Editor;
