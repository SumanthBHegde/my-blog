import React, { useState } from "react";

const CommentForm = ({
  btnLable,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = "",
}) => {
  const [value, setValue] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-r-slate-300 rounded-lg p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <textarea
          rows="5"
          className="w-full focus:outline-none bg-transparent"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-lg border-red-500 text-red-500 mt-2"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold mt-2"
          >
            {btnLable}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
