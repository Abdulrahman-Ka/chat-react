import { HiExclamationTriangle } from "react-icons/hi2";

const ErrorComponent = ({ message }) => {
  return (
    <div
      className="
        flex items-start p-4 sm:p-6 rounded-xl shadow-lg border-t-4
        font-sans transition-all duration-300 ease-in-out
      "
      style={{
        backgroundColor: "var(--secondaryBgColor)",
        color: "var(--textColorMain)",
        borderTopColor: "var(--themeColorMain)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
      }}
      role="alert"
    >
      <HiExclamationTriangle
        className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 flex-shrink-0 mt-0.5"
        style={{ color: "var(--themeColorMain)" }}
      />

      <div className="flex-grow">
        <h3
          className="text-lg sm:text-xl font-bold tracking-wide mb-1"
          style={{ color: "var(--themeColorMain)" }}
        >
          Connection Error
        </h3>
        <p className="text-sm sm:text-base leading-relaxed break-words">
          {message}
        </p>
        <p
          className="text-xs sm:text-sm mt-2 opacity-80"
          style={{ color: "var(--textColorSecondary)" }}
        >
          Please check your network connection and retry.
        </p>
      </div>
    </div>
  );
};

export default ErrorComponent;
