import { useEffect, useState } from "react";

export default function AdBlockNotice() {
  const [chaturbateBlocked, setChaturbateBlocked] = useState(false);

  useEffect(() => {
    // Try to fetch Chaturbate favicon (small, fast, and harmless)
    fetch("https://chaturbate.com/favicon.ico", { method: "HEAD", mode: "no-cors" })
      .then(() => {
        // If the request succeeds, do nothing
      })
      .catch(() => {
        // If the fetch fails due to adblocker/network error
        setChaturbateBlocked(true);
      });
  }, []);

  if (!chaturbateBlocked) return null;

  return (
    <div style={{
      backgroundColor: '#ffe5e5',
      color: '#900',
      padding: '1rem',
      margin: '1rem',
      border: '1px solid #f00',
      borderRadius: '8px',
      textAlign: 'center',
    }}>
      🙈 We noticed you're using an ad blocker.<br />
      Ads help us keep the content free — please consider whitelisting our site 💖
    </div>
  );
};

