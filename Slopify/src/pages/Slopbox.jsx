import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function SlopboxPage() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialCode = async () => {
      const { data, error } = await supabase
        .from("slopbox")
        .select("html, css, js")
        .eq("id", 1)
        .single();

      if (data) {
        setHtml(data.html || "");
        setCss(data.css || "");
        setJs(data.js || "");
      }

      if (error) {
        console.error("Error fetching initial code:", error.message);
      }

      setLoading(false);
    };

    const subscribeToRealtime = () => {
      const channel = supabase
        .channel("realtime:slopbox")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "slopbox" },
          (payload) => {
            const { html, css, js } = payload.new;
            setHtml(html || "");
            setCss(css || "");
            setJs(js || "");
          },
        )
        .subscribe();

      return () => channel.unsubscribe();
    };

    fetchInitialCode();
    const unsubscribe = subscribeToRealtime();

    return () => unsubscribe();
  }, []);

  const updateCode = async (field, value) => {
    try {
      await supabase
        .from("slopbox")
        .update({ [field]: value })
        .eq("id", 1);
    } catch (error) {
      console.error(`Error updating ${field}:`, error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const navToChat = async (e) => {
    e.preventDefault();
    navigate("/chat");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <iframe
        title="Live Viewer"
        sandbox="allow-scripts allow-same-origin"
        style={{
          flexGrow: 1,
          border: "1px solid #ccc",
        }}
        srcDoc={`
          <!DOCTYPE html>
          <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
          </html>
        `}
      />

      <div style={{ display: "flex", flex: "0 0 300px", gap: "10px" }}>
        <textarea
          value={html}
          onChange={(e) => {
            setHtml(e.target.value);
            updateCode("html", e.target.value);
          }}
          style={{ flex: 1, padding: 10 }}
          placeholder="Write HTML here..."
        />

        <textarea
          value={css}
          onChange={(e) => {
            setCss(e.target.value);
            updateCode("css", e.target.value);
          }}
          style={{ flex: 1, padding: 10 }}
          placeholder="Write CSS here..."
        />

        <textarea
          value={js}
          onChange={(e) => {
            setJs(e.target.value);
            updateCode("js", e.target.value);
          }}
          style={{ flex: 1, padding: 10 }}
          placeholder="Write JavaScript here..."
        />
      </div>
      <form onSubmit={navToChat}>
        <Button
          action="submit"
          content="return to chat"
          background="#FF00FF"
          color="black"
        />
      </form>
    </div>
  );
}
