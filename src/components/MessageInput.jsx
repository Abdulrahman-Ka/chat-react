import { useForm } from "react-hook-form";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

const MessageInput = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      body: "",
    },
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex mx-auto items-end gap-1 md:w-1/2 space-x-3 mt-4"
    >
      <div className="grow">
        <textarea
          {...register("body", {
            required: "Message cannot be empty",
            minLength: {
              value: 1,
              message: "Message must contain at least 1 character.",
            },
          })}
          name="body"
          id="body"
          rows="1"
          placeholder="Type your message here..."
          className="w-full p-4 rounded-lg resize-none 
            focus:ring-2 focus:ring-[var(--themeColorMain)] focus:border-transparent 
            text-[var(--textColorMain)] border-[var(--borderColor2)] bg-(--secondaryBgColor)"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-400">{errors.body.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="p-4 rounded-lg h-full my-auto transition-colors duration-200 
          hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: "var(--themeColorMain)" }}
      >
        {isSubmitting ? (
          <span className="text-white">Sending...</span>
        ) : (
          <HiOutlinePaperAirplane className="h-6 w-6 p-0 max-w-fit  text-white transform rotate-240 -mt-1 -mr-1" />
        )}
      </button>
    </form>
  );
};
export default MessageInput;
