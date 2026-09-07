import { useState } from 'react';

export function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState('');

  return (
    <div className="max-w-sm mx-auto mt-20 flex gap-2">
      <input
        className="border rounded px-3 py-2 flex-1"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => username.trim() && onJoin(username.trim())}
      >
        Join
      </button>
    </div>
  );
}