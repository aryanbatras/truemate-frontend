import React from 'react';
import styles from '@/styles/pages/gifts/Gifts.module.css';
import { Navigation, Button, GiftCard } from '@/components';
import { FiGift, FiSend, FiHeart, FiStar } from 'react-icons/fi';

const GiftsPage: React.FC = () => {
  const [selectedGift, setSelectedGift] = React.useState<string | null>(null);
  const [recipient, setRecipient] = React.useState('');
  const [message, setMessage] = React.useState('');

  const gifts = [
    {
      id: '1',
      name: 'Red Rose',
      icon: '🌹',
      price: 10,
      category: 'romantic'
    },
    {
      id: '2',
      name: 'Heart Box',
      icon: '💝',
      price: 25,
      category: 'romantic'
    },
    {
      id: '3',
      name: 'Teddy Bear',
      icon: '🧸',
      price: 15,
      category: 'cute'
    },
    {
      id: '4',
      name: 'Diamond Ring',
      icon: '💍',
      price: 100,
      category: 'luxury'
    },
    {
      id: '5',
      name: 'Love Letter',
      icon: '💌',
      price: 5,
      category: 'romantic'
    },
    {
      id: '6',
      name: 'Chocolate Box',
      icon: '🍫',
      price: 20,
      category: 'food'
    },
    {
      id: '7',
      name: 'Perfume',
      icon: '👃',
      price: 30,
      category: 'luxury'
    },
    {
      id: '8',
      name: 'Photo Frame',
      icon: '🖼️',
      price: 12,
      category: 'personal'
    }
  ];

  const categories = ['All', 'Romantic', 'Cute', 'Luxury', 'Food', 'Personal'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredGifts = selectedCategory === 'All' 
    ? gifts 
    : gifts.filter(gift => gift.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleSendGift = () => {
    if (selectedGift && recipient) {
      setSelectedGift(null);
      setRecipient('');
      setMessage('');
    }
  };

  const userTokens = 500;
  const selectedGiftData = gifts.find(gift => gift.id === selectedGift);

  return (
    <>
      <Navigation />
      <div className={styles.gifts}>
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
              Send <span className={styles.highlight}>Virtual Gifts</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Express your feelings with beautiful virtual gifts
            </p>
          </div>
        </div>

        <div className={styles.contentSection}>
        <div className={styles.tokenBalance}>
          <div className={styles.balanceCard}>
            <FiHeart className={styles.tokenIcon} />
            <div className={styles.balanceInfo}>
              <span className={styles.balanceLabel}>Available Tokens</span>
              <span className={styles.balanceAmount}>{userTokens}</span>
            </div>
          </div>
        </div>

        <div className={styles.categories}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className={styles.giftsGrid}>
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onSelect={() => setSelectedGift(gift.id)}
            />
          ))}
        </div>

        {selectedGift && (
          <div className={styles.giftSending}>
            <div className={styles.sendingCard}>
              <h3>Send Gift</h3>
              
              {selectedGiftData && (
                <div className={styles.selectedGift}>
                  <div className={styles.giftPreview}>
                    <span className={styles.giftIcon}>{selectedGiftData.icon}</span>
                    <span className={styles.giftName}>{selectedGiftData.name}</span>
                  </div>
                  <div className={styles.giftPrice}>
                    {selectedGiftData.price} tokens
                  </div>
                </div>
              )}

              <div className={styles.recipientForm}>
                <div className={styles.formGroup}>
                  <label>Recipient</label>
                  <input
                    type="text"
                    placeholder="Enter username..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className={styles.recipientInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Message (optional)</label>
                  <textarea
                    placeholder="Add a personal message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.messageTextarea}
                    rows={3}
                  />
                </div>
              </div>

              <div className={styles.sendActions}>
                <div className={styles.tokenCost}>
                  {selectedGiftData && (
                    <>
                      <span>Cost: {selectedGiftData.price} tokens</span>
                      <span>Balance after: {userTokens - selectedGiftData.price} tokens</span>
                    </>
                  )}
                </div>
                
                <Button
                  variant="primary"
                  onClick={handleSendGift}
                  disabled={!recipient || !selectedGift}
                >
                  <FiSend /> Send Gift
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.giftHistory}>
          <h3>Recent Gifts</h3>
          <div className={styles.historyList}>
            {[
              { id: 1, gift: 'Red Rose', recipient: 'Sarah', time: '2 hours ago', status: 'delivered' },
              { id: 2, gift: 'Teddy Bear', recipient: 'Michael', time: '1 day ago', status: 'delivered' },
              { id: 3, gift: 'Diamond Ring', recipient: 'Emma', time: '3 days ago', status: 'pending' }
            ].map((item) => (
              <div key={item.id} className={styles.historyItem}>
                <div className={styles.historyInfo}>
                  <span className={styles.historyGift}>{item.gift}</span>
                  <span className={styles.historyRecipient}>to {item.recipient}</span>
                  <span className={styles.historyTime}>{item.time}</span>
                </div>
                <span className={`${styles.historyStatus} ${styles[item.status]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default GiftsPage;
