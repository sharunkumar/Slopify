import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const [displayName, setDisplayName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (!session || !session.user) {
        navigate("/");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setDisplayName(profile.display_name);
      } else {
        setDisplayName("Unknown User");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Chat Page</h1>
      {displayName && <p>Welcome back, {displayName}!</p>}
    </div>
  );
}

