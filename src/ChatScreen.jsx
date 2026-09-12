export function ChatScreen({ connected, messages, users, typingUser, onSend, onTyping }) {
  return (
       <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col">
        <header className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Chat
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              Room
            </h1>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
              connected
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </header>

        <div className="mb-4 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <p className="text-xs text-slate-500">Online</p>
          <p className="mt-1 text-sm text-slate-700">
            {users.length ? users.join(', ') : 'No one else is online'}
          </p>
        </div>

        <main className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-4">
            <div className="space-y-2">
              {messages.map((m, i) =>
                m.system ? (
                  <div key={i} className="text-center text-xs italic text-slate-400">
                    {m.text}
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
                      <span className="mr-1.5 font-semibold text-slate-900">
                        {m.username}
                      </span>
                      <span className="break-words">{m.text}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 px-3 py-2 text-xs text-slate-400 sm:px-4">
            {typingUser ? `${typingUser} is typing...` : ' '}
          </div>

          <form
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 sm:p-4"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.elements.message;
              if (input.value.trim()) {
                onSend(input.value.trim());
                input.value = '';
              }
            }}
          >
            <input
              name="message"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
              onChange={onTyping}
              placeholder="Type a message..."
              maxLength={500}
              autoComplete="off"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Send
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}