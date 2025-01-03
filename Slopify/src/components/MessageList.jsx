import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Message from "./Message";

const PAGE_SIZE = 50;

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const messageBox = document.getElementById("message-box");
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  }, [messages])

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new;
          attachDisplayName(newMessage).then((msgWithDisplayName) => {
            setMessages((prev) => [...prev, msgWithDisplayName]);
          });
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const attachDisplayName = async (message) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("display_name, profile_color")
      .eq("id", message.user_id)
      .single();

    if (error) {
      console.error(
        "Error fetching display name and profile color:",
        error.message,
      );
      throw new Error("Unable to load user profile");
    }

    return {
      ...message,
      display_name: profile.display_name,
      profile_color: profile.profile_color,
    };
  };

  const fetchMessages = async (olderThan = null) => {
    if (scrolling) return;

    setScrolling(true);
    const query = supabase
      .from("messages")
      .select("id, user_id, content, created_at")
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE);

    if (olderThan) {
      query.lt("created_at", olderThan);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching messages:", error.message);
    } else {
      try {
        const messagesWithDisplayNames = await Promise.all(
          data.map(attachDisplayName),
        );
        setMessages((prev) => [...prev, ...messagesWithDisplayNames]);
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (e) {
        console.error("Failed to attach display names:", e);
      }
    }

    setLoading(false);
    setScrolling(false);
  };

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && hasMore) {
      const oldestMessage = messages[messages.length - 1];
      if (oldestMessage) {
        fetchMessages(oldestMessage.created_at);
      }
    }
  };

  return (
    <div
      id="message-box"
      style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
      }}
      onScroll={handleScroll}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        messages.slice().reverse().map((msg) => (
          <Message
            key={msg.id}
            name={msg.display_name}
            color={msg.profile_color}
            date={new Date(msg.created_at).toLocaleString()}
            message={msg.content}
          />
        ))
      )}
    </div>
  );
}
