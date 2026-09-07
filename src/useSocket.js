import { useEffect, useRef, useState } from 'react';

export function useSocket() {
  const socketRef = useRef(null);
  const usernameRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const typingTimeout = useRef(null);

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    connect();
    return () => socketRef.current?.close();
  }, []);

  function connect() {
    const socket = new WebSocket('ws://localhost:3006');
    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;

      if (usernameRef.current) {
        socket.send(JSON.stringify({ type: 'join', payload: { username: usernameRef.current } }));
      }
    };

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      if (type === 'message') {
        setMessages((prev) => [...prev, { username: payload.username, text: payload.text }]);
      } else if (type === 'system') {
        setMessages((prev) => [...prev, { system: true, text: payload.text }]);
      } else if (type === 'users') {
        setUsers(payload.users);
      } else if (type === 'error') {
        setError(payload.message);
      } else if (type === 'typing') {
        setTypingUser(payload.username);
        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => setTypingUser(null), 2000);
      }
    };

    socket.onclose = () => {
      setConnected(false);
      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 8000);
      reconnectAttempts.current++;
      setTimeout(connect, delay);
    };
  }

  function join(username) {
    usernameRef.current = username;
    socketRef.current.send(JSON.stringify({ type: 'join', payload: { username } }));
  }

  function sendMessage(text) {
    socketRef.current.send(JSON.stringify({ type: 'message', payload: { text } }));
  }

  function sendTyping() {
    socketRef.current.send(JSON.stringify({ type: 'typing', payload: { username: usernameRef.current } }));
  }

  return { connected, messages, users, typingUser, error, join, sendMessage, sendTyping };
}