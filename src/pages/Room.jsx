import { useEffect, useState } from "react";
import { client, tablesDB } from "../lib/appwriteConfig";
import MessageSkeleton from "../components/MessageSkeleton";
import ErrorComponent from "../components/ErrorComponent";
import MessageInput from "../components/MessageInput";
import { ID, Query } from "appwrite";
import { FiTrash2 } from "react-icons/fi";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingError, setSendingError] = useState(null);
  const [deletingError, setDeletingError] = useState(null);

  const { user } = useAuth();

  const handleNewMessage = async (data) => {
    try {
      // let payload =

      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: "mesaages",
        rowId: ID.unique(),
        data: {
          body: data.body,
          username: user.name,
          user_id: user.$id,
        },
      });
    } catch (error) {
      console.error("Error sending message: ", error);
      setSendingError(`Error sending message. ${error}`);
    }
    setTimeout(() => {
      setSendingError(null);
    }, 5000);
  };

  const getMessages = async () => {
    try {
      const promise = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: "mesaages",
        queries: [Query.orderDesc("$createdAt"), Query.limit(10)],
      });
      setMessages(promise.rows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages: ", error);
      setError(`Failed to load messages.${error}`);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setDeletingError(null);
    }, 5000);
  };

  const deleteMessage = async (id) => {
    try {
      await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: "mesaages",
        rowId: id,
      });
    } catch (error) {
      console.error("Error delete message.", error);
      setDeletingError(`Failed to delete message.${error}`);
    }
    getMessages();
  };

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(`rows`, (response) => {
      if (response.events.includes("databases.*.tables.*.rows.*.create")) {
        setMessages((prevstate) => [response.payload, ...prevstate]);
      }
      if (response.events.includes("databases.*.tables.*.rows.*.delete")) {
        setMessages((prevstate) =>
          prevstate.filter((message) => message.$id !== response.payload.$id)
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="m-2 ">
      <Header />
      <div className="my-6">
        <MessageInput onSubmit={handleNewMessage} />
      </div>
      <div className="bg-(--secondaryBgColor) p-12 m-auto md:w-1/2 border-2 rounded border-(--borderColor1)">
        {loading ? (
          <MessageSkeleton />
        ) : error ? (
          <ErrorComponent message={error} />
        ) : messages.length === 0 ? (
          <div
            className="text-center p-10 text-xl"
            style={{ color: "var(--textColorSecondary)" }}
          >
            No messages yet. Say hi! 👋
          </div>
        ) : deletingError ? (
          <ErrorComponent message={deletingError} />
        ) : sendingError ? (
          <ErrorComponent message={sendingError} />
        ) : (
          <ol className="space-y-2  md:space-y-4">
            {messages.map((message) => (
              <li key={message.$id} className="text-lg">
                <div className="text-gray-500 flex justify-between pl-2 mb-2">
                  <p>
                    <small className="text-white mr-2">
                      {message?.username ? message.username : "Anonymous user"}
                    </small>
                    <small>
                      {new Date(message.$createdAt).toLocaleString()}
                    </small>
                  </p>
                  <button
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                    className="text-2xl focus:outline-none focus:text-red-600  hover:text-red-600"
                  >
                    <FiTrash2 className="focus:outline-none" />
                  </button>
                </div>

                <div className="bg-pink-600 rounded-2xl p-4 w-fit text-2xl">
                  <p>{message.body}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
};
export default Room;
