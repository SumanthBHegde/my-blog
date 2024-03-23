import React, { useState } from "react";

const CommentForm = ({
  btnLable,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = "",
  loading = false,
}) => {
  const [value, setValue] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className={`flex flex-col items-end p-4 border rounded-lg border-r-slate-300 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ${
          btnLable !== "Submit" ? "bg-white" : ""
        }`}
      >
        <textarea
          className="w-full bg-transparent focus:outline-none"
          rows="5"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed "
          >
            {btnLable}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
