const ErrorForm = ({ errorMessage }) => {
  return (
    <div className="flex justify-start items-center gap-2 p-2 my-2 text-sm  border border-red-600 rounded ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-red-500 ">{errorMessage}</p>
    </div>
  );
};
export default ErrorForm;
