const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full rounded-lg text-gray-800 bg-red-300 mx-auto px-4 py-2 max-w-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
