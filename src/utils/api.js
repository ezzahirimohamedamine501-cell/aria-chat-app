export async function sendMessage(messages, signal) {
  const response = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!response.ok) {
    let errMsg = `Server error: ${response.status}`;
    try {
      const data = await response.json();
      errMsg = data.error || data.message || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data.reply || "No response received.";
}