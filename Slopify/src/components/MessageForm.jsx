import { useState } from "react";
import { supabase } from "../supabaseClient";
import Button from "./Button";

export default function MessageForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const user = supabase.auth.getUser();
    const { data: userData, error: userError } = await user;

    if (userError || !userData.user) {
      console.error("Error retrieving user:", userError);
      return;
    }

    const { id: user_id } = userData.user;

    const { error } = await supabase
      .from("messages")
      .insert([{ content: message, user_id }]);

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: "0.5rem", width: "80%" }}
      />
      <Button action="submit" content="Send" background="#458588" color="white" />
    </form>
  );
}
