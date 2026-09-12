import { useState } from 'react';

export function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    onJoin(username.trim());
  };


  return (
   <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
            Welcome
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Join the chat
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
              placeholder="Choose a username"
              minLength={3}
              maxLength={20}
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}