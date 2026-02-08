import React from 'react';
import styles from '../../styles/Chat.module.css';
import Navigation from '../../components/Navigation';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FiSend, FiPaperclip, FiPhone, FiVideo } from 'react-icons/fi';

const ChatPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'Hey! How was your weekend?',
      time: '2 min ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'Thanks for the coffee recommendation!',
      time: '1 hour ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Emma Williams',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'See you at yoga tomorrow?',
      time: '3 hours ago',
      unread: 1,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 'other',
      content: 'Hey! How was your weekend?',
      time: '2:30 PM'
    },
    {
      id: 2,
      senderId: 'me',
      content: 'It was great! Went hiking with friends.',
      time: '2:32 PM'
    },
    {
      id: 3,
      senderId: 'other',
      content: 'That sounds amazing! Where did you go?',
      time: '2:33 PM'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.chat}>
        <div className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.hearts}>
              <span className={`${styles.heart} ${styles.heart1}`}>💕</span>
              <span className={`${styles.heart} ${styles.heart2}`}>💖</span>
              <span className={`${styles.heart} ${styles.heart3}`}>💗</span>
              <span className={`${styles.heart} ${styles.heart4}`}>❤️</span>
            </div>
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Connect with <span className={styles.highlight}>Your Matches</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Start meaningful conversations and build real connections
            </p>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.chatContainer}>
          <div className={styles.conversationsList}>
            <div className={styles.conversationsHeader}>
              <h3>Messages</h3>
              <span className={styles.onlineCount}>3 online</span>
            </div>
            
            <div className={styles.conversations}>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`${styles.conversation} ${
                    selectedConversation === conv.id ? styles.active : ''
                  }`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className={styles.conversationAvatar}
                  />
                  <div className={styles.conversationInfo}>
                    <div className={styles.conversationHeader}>
                      <span className={styles.conversationName}>{conv.name}</span>
                      <span className={styles.conversationTime}>{conv.time}</span>
                    </div>
                    <p className={styles.conversationMessage}>{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className={styles.unreadBadge}>{conv.unread}</span>
                  )}
                  {conv.online && (
                    <span className={styles.onlineIndicator}></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chatArea}>
            {selectedConversation ? (
              <>
                <div className={styles.chatHeader}>
                  <img
                    src="/api/placeholder/50/50"
                    alt="Sarah Johnson"
                    className={styles.chatAvatar}
                  />
                  <div className={styles.chatInfo}>
                    <h4>Sarah Johnson</h4>
                    <span className={styles.chatStatus}>Online</span>
                  </div>
                  <div className={styles.chatActions}>
                    <Button variant="ghost" size="small">
                      <FiPhone />
                    </Button>
                    <Button variant="ghost" size="small">
                      <FiVideo />
                    </Button>
                  </div>
                </div>

                <div className={styles.messagesContainer}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.message} ${
                        msg.senderId === 'me' ? styles.sent : styles.received
                      }`}
                    >
                      <div className={styles.messageContent}>
                        {msg.content}
                      </div>
                      <span className={styles.messageTime}>{msg.time}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.messageInput}>
                  <div className={styles.inputContainer}>
                    <Button variant="ghost" size="small">
                      <FiPaperclip />
                    </Button>
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={setMessage}
                    />
                    <Button onClick={handleSendMessage}>
                      <FiSend />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.noConversation}>
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
