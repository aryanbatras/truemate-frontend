import React, { useState } from 'react';
import styles from './Gifts.module.css';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { GiftCard } from '../components/Card';
import { 
  FiHeart, 
  FiStar, 
  FiGift,
  FiTrendingUp,
  FiSend,
  FiShoppingCart
} from 'react-icons/fi';

interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number;
  description: string;
  category: string;
  isPopular?: boolean;
}

interface Recipient {
  id: string;
  name: string;
  avatar: string;
}

const mockGifts: Gift[] = [
  {
    id: '1',
    name: 'Rose',
    icon: '🌹',
    price: 10,
    description: 'A classic red rose to show your affection',
    category: 'flowers',
    isPopular: true
  },
  {
    id: '2',
    name: 'Heart',
    icon: '❤️',
    price: 15,
    description: 'Send a heart to express your love',
    category: 'hearts',
    isPopular: true
  },
  {
    id: '3',
    name: 'Diamond Ring',
    icon: '💍',
    price: 100,
    description: 'A symbol of eternal commitment',
    category: 'luxury',
    isPopular: true
  },
  {
    id: '4',
    name: 'Chocolate',
    icon: '🍫',
    description: 'Sweet treat for your sweetie',
    price: 20,
    category: 'fun'
  },
  {
    id: '5',
    name: 'Teddy Bear',
    icon: '🧸',
    price: 25,
    description: 'Cuddly companion for warm feelings',
    category: 'fun'
  },
  {
    id: '6',
    name: 'Perfume',
    icon: '👃',
    price: 50,
    description: 'Elegant fragrance for special moments',
    category: 'luxury'
  },
  {
    id: '7',
    name: 'Love Letter',
    icon: '💌',
    price: 5,
    description: 'Handwritten message from the heart',
    category: 'special'
  },
  {
    id: '8',
    name: 'Champagne',
    icon: '🍾',
    price: 75,
    description: 'Celebrate special moments together',
    category: 'luxury'
  },
  {
    id: '9',
    name: 'Music Box',
    icon: '🎵',
    price: 30,
    description: 'Melody that speaks to the soul',
    category: 'special'
  },
  {
    id: '10',
    name: 'Photo Frame',
    icon: '🖼️',
    price: 35,
    description: 'Capture your precious memories',
    category: 'special'
  },
  {
    id: '11',
    name: 'Sunflower',
    icon: '🌻',
    price: 12,
    description: 'Bright and beautiful like your smile',
    category: 'flowers'
  },
  {
    id: '12',
    name: 'Cake',
    icon: '🎂',
    price: 40,
    description: 'Sweet celebration of your connection',
    category: 'fun'
  }
];

const mockRecipients: Recipient[] = [
  { id: '1', name: 'Sarah', avatar: '/api/placeholder/60/60' },
  { id: '2', name: 'Emily', avatar: '/api/placeholder/60/60' },
  { id: '3', name: 'Jessica', avatar: '/api/placeholder/60/60' },
  { id: '4', name: 'Amanda', avatar: '/api/placeholder/60/60' },
  { id: '5', name: 'Rachel', avatar: '/api/placeholder/60/60' },
  { id: '6', name: 'Olivia', avatar: '/api/placeholder/60/60' }
];

const mockHistory = [
  {
    id: '1',
    giftName: 'Rose',
    giftIcon: '🌹',
    recipient: 'Sarah Johnson',
    date: '2 hours ago',
    price: 10
  },
  {
    id: '2',
    giftName: 'Heart',
    giftIcon: '❤️',
    recipient: 'Emily Chen',
    date: 'Yesterday',
    price: 15
  },
  {
    id: '3',
    giftName: 'Diamond Ring',
    giftIcon: '💍',
    recipient: 'Jessica Williams',
    date: '3 days ago',
    price: 100
  }
];

const Gifts: React.FC = () => {
  const [tokenBalance] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [showSendSection, setShowSendSection] = useState(false);

  const categories = [
    { id: 'all', name: 'All', icon: <FiGift /> },
    { id: 'flowers', name: 'Flowers', icon: '🌹' },
    { id: 'hearts', name: 'Hearts', icon: <FiHeart /> },
    { id: 'luxury', name: 'Luxury', icon: '💎' },
    { id: 'fun', name: 'Fun', icon: '🎉' },
    { id: 'special', name: 'Special', icon: <FiStar /> }
  ];

  const filteredGifts = selectedCategory === 'all' 
    ? mockGifts 
    : mockGifts.filter(gift => gift.category === selectedCategory);

  const handleGiftSelect = (gift: Gift) => {
    setSelectedGift(gift);
    setShowSendSection(true);
  };

  const handleRecipientSelect = (recipientId: string) => {
    setSelectedRecipient(recipientId);
  };

  const handleSendGift = () => {
    if (selectedGift && selectedRecipient) {
      console.log('Sending gift:', selectedGift, 'to:', selectedRecipient);
      // Reset selection
      setSelectedGift(null);
      setSelectedRecipient('');
      setShowSendSection(false);
    }
  };

  const handlePurchaseTokens = () => {
    console.log('Purchase tokens clicked');
  };

  return (
    <Layout title="Gifts" subtitle="Send virtual gifts to express your feelings">
      <div className={styles.gifts}>
        <div className={styles.tokenBalance}>
          <div className={styles.balanceContent}>
            <div className={styles.balanceLabel}>Current Token Balance</div>
            <div className={styles.balanceAmount}>{tokenBalance}</div>
            <div className={styles.balanceActions}>
              <Button onClick={handlePurchaseTokens}>
                <FiShoppingCart size={16} />
                Purchase Tokens
              </Button>
              <Button variant="secondary">
                <FiTrendingUp size={16} />
                View History
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.giftCategories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.giftsGrid}>
          {filteredGifts.map((gift) => (
            <div
              key={gift.id}
              className={`${styles.giftCard} ${
                selectedGift?.id === gift.id ? styles.selected : ''
              }`}
              onClick={() => handleGiftSelect(gift)}
            >
              {gift.isPopular && (
                <div className={styles.popularBadge}>Popular</div>
              )}
              <div className={styles.giftContent}>
                <div className={styles.giftIcon}>{gift.icon}</div>
                <div className={styles.giftName}>{gift.name}</div>
                <div className={styles.giftPrice}>{gift.price} tokens</div>
                <div className={styles.giftDescription}>{gift.description}</div>
              </div>
            </div>
          ))}
        </div>

        {showSendSection && selectedGift && (
          <div className={styles.sendSection}>
            <h3 className={styles.sendTitle}>Send Gift</h3>
            
            <div className={styles.recipientSelector}>
              <div className={styles.recipientGrid}>
                {mockRecipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    className={`${styles.recipientItem} ${
                      selectedRecipient === recipient.id ? styles.selected : ''
                    }`}
                    onClick={() => handleRecipientSelect(recipient.id)}
                  >
                    <img
                      src={recipient.avatar}
                      alt={recipient.name}
                      className={styles.recipientAvatar}
                    />
                    <div className={styles.recipientName}>{recipient.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedGift && (
              <div className={styles.selectedGift}>
                <div className={styles.selectedGiftIcon}>{selectedGift.icon}</div>
                <div className={styles.selectedGiftName}>{selectedGift.name}</div>
                <div className={styles.selectedGiftPrice}>{selectedGift.price} tokens</div>
              </div>
            )}

            <div className={styles.sendActions}>
              <Button
                onClick={handleSendGift}
                disabled={!selectedRecipient}
                fullWidth
              >
                <FiSend size={16} />
                Send Gift
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowSendSection(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className={styles.historySection}>
          <h3 className={styles.historyTitle}>Recent Gift History</h3>
          <div className={styles.historyList}>
            {mockHistory.map((item) => (
              <div key={item.id} className={styles.historyItem}>
                <div className={styles.historyGiftIcon}>{item.giftIcon}</div>
                <div className={styles.historyInfo}>
                  <div className={styles.historyGiftName}>{item.giftName}</div>
                  <div className={styles.historyRecipient}>To: {item.recipient}</div>
                  <div className={styles.historyDate}>{item.date}</div>
                </div>
                <div className={styles.historyPrice}>{item.price} tokens</div>
              </div>
            ))}
          </div>
        </div>

        {filteredGifts.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎁</div>
            <h3 className={styles.emptyTitle}>No gifts found</h3>
            <p className={styles.emptyDescription}>
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gifts;
