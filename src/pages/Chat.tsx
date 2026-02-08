import React, { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { 
  FiSend, 
  FiPhone, 
  FiVideo, 
  FiMoreVertical,
  FiPaperclip,
  FiImage,
  FiSmile,
  FiCheck,
  FiCheckCircle
} from 'react-icons/fi';

interface Message {
  id: string;
  content: string;
  sender: 'me' | 'other';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  isTyping?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/50/50',
    lastMessage: 'Hey! How was your day?',
    timestamp: '2 min ago',
    unreadCount: 2,
    isOnline: true,
    isTyping: true
  },
  {
    id: '2',
    name: 'Emily Chen',
    avatar: '/api/placeholder/50/50',
    lastMessage: 'That sounds amazing! 😊',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: '3',
    name: 'Jessica Williams',
    avatar: '/api/placeholder/50/50',
    lastMessage: 'See you tomorrow!',
    timestamp: '3 hours ago',
    unreadCount: 1,
    isOnline: true
  },
  {
    id: '4',
    name: 'Amanda Davis',
    avatar: '/api/placeholder/50/50',
    lastMessage: 'Thanks for the coffee ☕',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: '5',
    name: 'Rachel Martinez',
    avatar: '/api/placeholder/50/50',
    lastMessage: 'Had a great time!',
    timestamp: '2 days ago',
    unreadCount: 0,
    isOnline: false
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey! How are you doing?',
    sender: 'other',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read'
  },
  {
    id: '2',
    content: "I'm doing great! Just got back from the gym. How about you?",
    sender: 'me',
    timestamp: new Date(Date.now() - 3000000),
    status: 'read'
  },
  {
    id: '3',
    content: 'That\'s awesome! I\'ve been thinking about trying that new cafe downtown',
    sender: 'other',
    timestamp: new Date(Date.now() - 2400000),
    status: 'read'
  },
  {
    id: '4',
    content: 'Oh really? Which one? The one with the amazing pastries?',
    sender: 'me',
    timestamp: new Date(Date.now() - 1800000),
    status: 'read'
  },
  {
    id: '5',
    content: 'Yes! That\'s the one. Want to go this weekend?',
    sender: 'other',
    timestamp: new Date(Date.now() - 1200000),
    status: 'read'
  },
  {
    id: '6',
    content: 'I\'d love to! How about Saturday afternoon?',
    sender: 'me',
    timestamp: new Date(Date.now() - 600000),
    status: 'delivered'
  },
  {
    id: '7',
    content: 'Perfect! See you then 😊',
    sender: 'other',
    timestamp: new Date(Date.now() - 300000),
    status: 'read'
  },
  {
    id: '8',
    content: 'Hey! How was your day?',
    sender: 'other',
    timestamp: new Date(Date.now() - 120000),
    status: 'read'
  }
];

const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage.trim(),
        sender: 'me',
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' as const }
              : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'read' as const }
              : msg
          )
        );
      }, 2000);

      // Simulate typing indicator and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: 'That sounds great! 😊',
          sender: 'other',
          timestamp: new Date(),
          status: 'read'
        };
        setMessages(prev => [...prev, response]);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageStatusIcon = ({ status }: { status?: 'sent' | 'delivered' | 'read' }) => {
    switch (status) {
      case 'sent':
        return <FiCheck size={12} />;
      case 'delivered':
        return <FiCheckCircle size={12} />;
      case 'read':
        return <FiCheckCircle size={12} color="var(--primary-red)" />;
      default:
        return null;
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [date: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Layout title="Messages" showBottomNav={false}>
      <div className={styles.chat}>
        <div className={styles.conversationsList}>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`${styles.conversationItem} ${
                selectedConversation === conversation.id ? styles.active : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className={styles.conversationHeader}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className={styles.conversationAvatar}
                  />
                  {conversation.isOnline && (
                    <div className={styles.onlineIndicator} />
                  )}
                </div>
                <div className={styles.conversationInfo}>
                  <div className={styles.conversationName}>
                    {conversation.name}
                  </div>
                  <div className={styles.conversationTime}>
                    {conversation.timestamp}
                  </div>
                </div>
                {conversation.unreadCount && conversation.unreadCount > 0 && (
                  <div className={styles.unreadBadge}>
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
              <div className={styles.conversationMessage}>
                {conversation.isTyping ? (
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDot} />
                    <div className={styles.typingDot} />
                    <div className={styles.typingDot} />
                  </div>
                ) : (
                  conversation.lastMessage
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chatArea}>
          {selectedConv ? (
            <>
              <div className={styles.chatHeader}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={selectedConv.avatar}
                    alt={selectedConv.name}
                    className={styles.chatHeaderAvatar}
                  />
                  {selectedConv.isOnline && (
                    <div className={styles.onlineIndicator} />
                  )}
                </div>
                <div className={styles.chatHeaderInfo}>
                  <div className={styles.chatHeaderName}>
                    {selectedConv.name}
                  </div>
                  <div className={styles.chatHeaderStatus}>
                    {selectedConv.isOnline ? 'Active now' : 'Offline'}
                  </div>
                </div>
                <div className={styles.chatActions}>
                  <button className={styles.chatActionButton}>
                    <FiPhone size={18} />
                  </button>
                  <button className={styles.chatActionButton}>
                    <FiVideo size={18} />
                  </button>
                  <button className={styles.chatActionButton}>
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              </div>

              <div className={styles.messagesContainer}>
                {Object.entries(messageGroups).map(([date, dateMessages]) => (
                  <div key={date}>
                    <div className={styles.dateSeparator}>
                      <span className={styles.dateText}>{date}</span>
                    </div>
                    {dateMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`${styles.message} ${styles[message.sender]}`}
                      >
                        {message.sender === 'other' && (
                          <img
                            src={selectedConv.avatar}
                            alt={selectedConv.name}
                            className={styles.messageAvatar}
                          />
                        )}
                        <div className={styles.messageContent}>
                          <div className={styles.messageBubble}>
                            {message.content}
                          </div>
                          <div className={styles.messageTime}>
                            {formatTime(message.timestamp)}
                            {message.sender === 'me' && (
                              <span className={styles.messageStatus}>
                                <MessageStatusIcon status={message.status} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className={`${styles.message} ${styles.received}`}>
                        <img
                          src={selectedConv.avatar}
                          alt={selectedConv.name}
                          className={styles.messageAvatar}
                        />
                        <div className={styles.messageContent}>
                          <div className={styles.typingIndicator}>
                            <div className={styles.typingDot} />
                            <div className={styles.typingDot} />
                            <div className={styles.typingDot} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className={styles.messageInput}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputWrapper}>
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className={styles.messageInputField}
                      rows={1}
                    />
                  </div>
                  <div className={styles.inputActions}>
                    <button className={styles.inputButton}>
                      <FiPaperclip size={18} />
                    </button>
                    <button className={styles.inputButton}>
                      <FiImage size={18} />
                    </button>
                    <button className={styles.inputButton}>
                      <FiSmile size={18} />
                    </button>
                    <button
                      className={`${styles.inputButton} ${styles.sendButton}`}
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                    >
                      <FiSend size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💬</div>
              <h3 className={styles.emptyTitle}>Select a conversation</h3>
              <p className={styles.emptyDescription}>
                Choose a conversation from the list to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
