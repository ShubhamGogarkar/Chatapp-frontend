export function ChatScreen({ connected, messages, users, typingUser, onSend, onTyping }) {
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Chat</h1>
        <span className={`text-xs px-2 py-1 rounded-full ${connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {connected ? 'connected' : 'disconnected'}
        </span>
      </div>

      <div className="text-sm text-gray-500 mb-2">Online: {users.join(', ')}</div>

      <div className="border rounded h-72 overflow-y-auto p-3 space-y-1">
        {messages.map((m, i) =>
          m.system ? (
            <div key={i} className="text-gray-400 italic text-sm">{m.text}</div>
          ) : (
            <div key={i}><span className="font-bold">{m.username}</span>: {m.text}</div>
          )
        )}
      </div>

      <div className="h-4 text-xs text-gray-400">{typingUser ? `${typingUser} is typing...` : ''}</div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.elements.message;
          if (input.value.trim()) {
            onSend(input.value.trim());
            input.value = '';
          }
        }}
      >
        <input name="message" className="border rounded px-3 py-2 flex-1" onChange={onTyping} placeholder="Type a message..." autoComplete="off" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}