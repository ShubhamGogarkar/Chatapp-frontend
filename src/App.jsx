import { useRef } from 'react';
import { useSocket } from './useSocket';
import { JoinScreen } from './JoinScreen';
import { ChatScreen } from './ChatScreen';

export default function App() {
  const { connected, messages, users, typingUser, join, sendMessage, sendTyping } = useSocket();
  const [joined, setJoined] = useState(false);
  const lastTypingSent = useRef(0);

  function handleJoin(username) {
    join(username);
    setJoined(true);
  }

  function handleTyping() {
    const now = Date.now();
    if (now - lastTypingSent.current > 1000) {
      sendTyping();
      lastTypingSent.current = now;
    }
  }


  if (!joined) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  return (
    <ChatScreen
      connected={connected}
      messages={messages}
      users={users}
      typingUser={typingUser}
      onSend={sendMessage}
      onTyping={handleTyping}
    />
  );
}