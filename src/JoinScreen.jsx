import { useState } from 'react';

export function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    onJoin(username.trim());
  };


  return (
    <form onSubmit={handleSubmit}>
    <div className="max-w-sm mx-auto mt-20 flex gap-2">
      <input
        className="border rounded px-3 py-2 flex-1"
        placeholder="Choose a username"
        minLength="3"
        maxLength="20"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded" type='submit'
      >
        Join
      </button>
    </div>
    </form>
  );
}