import React, { useState, useEffect } from 'react';
import { Heart, X, Star, MessageCircle, User, Flame, Sparkles } from 'lucide-react';

const CouchMate = () => {
  // Add swipe gesture support
  const cardRef = React.useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
      }
    };
    const onTouchMove = (e) => {
      // Optionally, you could add visual feedback here
    };
    const onTouchEnd = (e) => {
      if (!isSwiping) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX;
      const dy = endY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          handleSwipe('right');
        } else {
          handleSwipe('left');
        }
      } else if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx)) {
        if (dy < 0) {
          handleSwipe('up');
        }
      }
      isSwiping = false;
    };
    card.addEventListener('touchstart', onTouchStart);
    card.addEventListener('touchmove', onTouchMove);
    card.addEventListener('touchend', onTouchEnd);
    // Mouse events for desktop
    let mouseDown = false;
    let mouseStartX = 0;
    let mouseStartY = 0;
    const onMouseDown = (e) => {
      mouseDown = true;
      mouseStartX = e.clientX;
      mouseStartY = e.clientY;
    };
    const onMouseUp = (e) => {
      if (!mouseDown) return;
      const dx = e.clientX - mouseStartX;
      const dy = e.clientY - mouseStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          handleSwipe('right');
        } else {
          handleSwipe('left');
        }
      } else if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx)) {
        if (dy < 0) {
          handleSwipe('up');
        }
      }
      mouseDown = false;
    };
    card.addEventListener('mousedown', onMouseDown);
    card.addEventListener('mouseup', onMouseUp);
    return () => {
      card.removeEventListener('touchstart', onTouchStart);
      card.removeEventListener('touchmove', onTouchMove);
      card.removeEventListener('touchend', onTouchEnd);
      card.removeEventListener('mousedown', onMouseDown);
      card.removeEventListener('mouseup', onMouseUp);
    };
  }, [currentIndex, swipeDirection]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [currentView, setCurrentView] = useState('swipe');
  const [swipeDirection, setSwipeDirection] = useState(null);

  const profiles = [
    {
      id: 1,
      name: "Chesterfield",
      age: "3 years old",
      material: "Genuine Leather",
      location: "Downtown Executive Tower",
      tags: ["Executive Suite", "Stain Resistant", "CEO Approved"],
      bio: "Looking for a VP who appreciates the finer things. I've supported many successful mergers & acquisitions. No startup founders please - I need someone established.",
      image: "🛋️",
      color: "#8B4513",
      verified: true
    },
    {
      id: 2,
      name: "Madison",
      age: "6 months old",
      material: "Performance Velvet",
      location: "Penthouse Office",
      tags: ["Modern", "Eco-Friendly", "Power Naps"],
      bio: "Sleek, sophisticated, and ready for long strategy sessions. I'm that contemporary piece that says 'I've made it' without being too loud about it.",
      image: "🛋️",
      color: "#4B0082",
      verified: true
    },
    {
      id: 3,
      name: "Wellington",
      age: "15 years old",
      material: "Heritage Tweed",
      location: "Private Club",
      tags: ["Old Money", "Scotch Resistant", "Board Meetings"],
      bio: "Distinguished gentleman's couch seeking VP with appreciation for tradition. I've hosted senators, CEOs, and even a few hostile takeovers.",
      image: "🪑",
      color: "#2F4F4F",
      verified: true
    },
    {
      id: 4,
      name: "Scarlett",
      age: "2 years old",
      material: "Italian Leather",
      location: "Corner Office",
      tags: ["Statement Piece", "Red Power", "Intimidating"],
      bio: "Bold, confident, and impossible to ignore. Looking for a VP who isn't afraid to make bold decisions. Weak sitters need not apply.",
      image: "🛋️",
      color: "#DC143C",
      verified: true
    },
    {
      id: 5,
      name: "Oakley",
      age: "8 years old",
      material: "Reclaimed Wood & Canvas",
      location: "Tech Campus",
      tags: ["Sustainable", "Standing Desk Compatible", "IPO Ready"],
      bio: "Not your typical corporate furniture. I bring that Silicon Valley energy to traditional spaces. Seeking a VP who thinks outside the boardroom.",
      image: "🪑",
      color: "#DEB887",
      verified: false
    },
    {
      id: 6,
      name: "Zabuton-san",
      age: "12 years old",
      material: "Traditional Cotton & Tatami",
      location: "Tokyo Office, 47th Floor",
      tags: ["Minimalist", "Tea Ceremony Ready", "Zen Meetings"],
      bio: "Ground-level executive seating from Japan. I believe in humble leadership and mindful sitting. Perfect for VPs who practice 'kaizen' in quarterly reviews.",
      image: "🪑",
      color: "#4A5568",
      verified: true
    },
    {
      id: 7,
      name: "Majlis",
      age: "5 years old",
      material: "Damascus Silk & Gold Thread",
      location: "Dubai Financial District",
      tags: ["Oil Money", "24/7 Deals", "Hookah Compatible"],
      bio: "Arabian nights meet corporate flights. I've hosted midnight merger discussions and dawn IPO celebrations. Seeking a VP who knows true hospitality.",
      image: "🛋️",
      color: "#FFD700",
      verified: true
    },
    {
      id: 8,
      name: "Ming",
      age: "400 years old (replica)",
      material: "Rosewood & Mother of Pearl",
      location: "Hong Kong Trade Center",
      tags: ["Ancient Wisdom", "Feng Shui Approved", "Dragon Energy"],
      bio: "Classic Chinese craftsmanship meets modern commerce. My ancestors seated emperors; now I seek a VP worthy of building empires. No sitting with shoes on!",
      image: "🪑",
      color: "#8B0000",
      verified: true
    },
    {
      id: 9,
      name: "Sedari",
      age: "7 years old",
      material: "Moroccan Wool & Cedar",
      location: "Casablanca Business Hub",
      tags: ["Exotic Meetings", "Mint Tea Included", "Desert Chic"],
      bio: "North African elegance for transcontinental deals. Low profile, high impact. I make every board meeting feel like a diplomatic summit in a riad.",
      image: "🛋️",
      color: "#CD853F",
      verified: true
    },
    {
      id: 10,
      name: "Gustav",
      age: "4 years old",
      material: "Swedish Pine & Sheepskin",
      location: "Stockholm Innovation Park",
      tags: ["Hygge Approved", "Work-Life Balance", "Nobel Prize Sat Here"],
      bio: "Scandinavian simplicity meets C-suite functionality. I believe meetings should end by 4pm and include fika. IKEA could never.",
      image: "🪑",
      color: "#87CEEB",
      verified: true
    },
    {
      id: 11,
      name: "Ashanti",
      age: "10 years old",
      material: "Kente Cloth & Mahogany",
      location: "Lagos Tech Quarter",
      tags: ["Afrofuturism", "Diaspora Connected", "Royal Heritage"],
      bio: "West African royalty meets modern entrepreneurship. My patterns tell stories of kingdoms while supporting your startup unicorn dreams.",
      image: "🛋️",
      color: "#DAA520",
      verified: true
    },
    {
      id: 12,
      name: "Tatami Lounge",
      age: "1 year old",
      material: "Bamboo & Organic Linen",
      location: "Kyoto Satellite Office",
      tags: ["Remote Work Ready", "Meditation Mode", "Shoes Off Policy"],
      bio: "Modern Japanese floor seating for the flexible VP. I lower your ego while elevating your mindfulness. Best paired with a standing desk.",
      image: "🪑",
      color: "#8FBC8F",
      verified: false
    },
    {
      id: 13,
      name: "Dmitri Divanovich",
      age: "45 years old (Soviet Era)",
      material: "Crimson Velvet & Birch",
      location: "Moscow Financial District",
      tags: ["Oligarch Tested", "Vodka Proof", "Chess Ready"],
      bio: "Classic Russian divan with stories from the Soviet boardrooms. I've hosted late-night negotiations and survived more regime changes than your startup pivots. Looking for VP who appreciates history and doesn't fear bears or markets.",
      image: "🛋️",
      color: "#8B0000",
      verified: true
    },
    {
      id: 14,
      name: "Oksana",
      age: "6 years old",
      material: "Hand-carved Oak & Embroidered Linen",
      location: "Kyiv Tech Hub",
      tags: ["Resilient", "Sunflower Soul", "Victory Meetings"],
      bio: "Ukrainian bench with geometric soul and floral heart. My carved patterns tell stories of strength and beauty. Seeking VP who values craftsmanship, courage, and believes in building better futures. Slava productivity!",
      image: "🪑",
      color: "#0057B7",
      verified: true
    }
  ];

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction) => {
    if (!currentProfile) return;
    
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === 'right' || direction === 'up') {
        const newMatch = {
          ...currentProfile,
          matchedAt: new Date().toLocaleTimeString()
        };
        setMatches([...matches, newMatch]);
        if (direction === 'up') {
          setShowMatch(true);
          setTimeout(() => setShowMatch(false), 2000);
        }
      }
      
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const ProfileCard = ({ profile, isAnimating, direction }) => {
    const animationClass = isAnimating ? 
      direction === 'left' ? 'animate-swipe-left' : 
      direction === 'right' ? 'animate-swipe-right' : 
      direction === 'up' ? 'animate-swipe-up' : '' 
      : '';

    return (
      <div className={`absolute inset-0 ${animationClass}`}>
        <div className="bg-gray-900 rounded-2xl overflow-hidden h-full shadow-2xl">
          <div 
            className="h-96 flex items-center justify-center relative"
            style={{ backgroundColor: profile.color }}
          >
            <div className="text-8xl filter drop-shadow-lg">{profile.image}</div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {profile.name}
                {profile.verified && (
                  <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">✓ VP</span>
                )}
              </h2>
              <p className="text-gray-300">{profile.age} • {profile.material} • {profile.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.tags.map((tag, i) => (
                  <span key={i} className="bg-amber-600/30 border border-amber-600 px-3 py-1 rounded-full text-xs text-amber-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-800">
            <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
          </div>
        </div>
      </div>
    );
  };

  const MatchesList = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-amber-500 mb-4">Your Matches</h2>
      {matches.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No matches yet. Keep swiping!</p>
      ) : (
        <div className="space-y-3">
          {matches.map((match, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: match.color }}
              >
                {match.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{match.name}</h3>
                <p className="text-gray-400 text-sm">{match.material} • Matched at {match.matchedAt}</p>
              </div>
              <MessageCircle className="text-amber-500" size={24} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style jsx>{`
        @keyframes swipeLeft {
          to { transform: translateX(-150%) rotate(-20deg); opacity: 0; }
        }
        @keyframes swipeRight {
          to { transform: translateX(150%) rotate(20deg); opacity: 0; }
        }
        @keyframes swipeUp {
          to { transform: translateY(-150%) scale(0.8); opacity: 0; }
        }
        .animate-swipe-left { animation: swipeLeft 0.3s ease-out forwards; }
        .animate-swipe-right { animation: swipeRight 0.3s ease-out forwards; }
        .animate-swipe-up { animation: swipeUp 0.3s ease-out forwards; }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-b from-amber-900/30 to-transparent p-4">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
          CouchMate™
        </h1>
        <p className="text-center text-amber-600/70 text-sm italic">Where VPs find their perfect seat</p>
      </div>

      {/* Main Content */}
      <div className="relative h-[600px] px-4">
        {currentView === 'swipe' ? (
          <>
            {currentIndex < profiles.length ? (
              <div className="relative h-full max-w-sm mx-auto" ref={cardRef} style={{ touchAction: 'pan-y' }}>
                <ProfileCard 
                  profile={currentProfile} 
                  isAnimating={swipeDirection !== null}
                  direction={swipeDirection}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-2xl text-gray-500 mb-4">No more profiles!</p>
                  <p className="text-gray-600">Check your matches or come back later for more executive seating options.</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <MatchesList />
        )}
      </div>

      {/* Action Buttons */}
      {currentView === 'swipe' && currentIndex < profiles.length && (
        <div className="flex justify-center gap-8 py-6">
          <button 
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-transform"
          >
            <X size={24} />
          </button>
          <button 
            onClick={() => handleSwipe('up')}
            className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-blue-500 hover:scale-110 transition-transform"
          >
            <Star size={24} />
          </button>
          <button 
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-green-500 hover:scale-110 transition-transform"
          >
            <Heart size={28} />
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="flex justify-around py-4">
          <button 
            onClick={() => setCurrentView('swipe')}
            className={`${currentView === 'swipe' ? 'text-amber-500' : 'text-gray-500'}`}
          >
            <Flame size={24} />
          </button>
          <button className="text-gray-500">
            <Sparkles size={24} />
          </button>
          <button 
            onClick={() => setCurrentView('matches')}
            className={`${currentView === 'matches' ? 'text-amber-500' : 'text-gray-500'} relative`}
          >
            <MessageCircle size={24} />
            {matches.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {matches.length}
              </span>
            )}
          </button>
          <button className="text-gray-500">
            <User size={24} />
          </button>
        </div>
      </div>

      {/* Match Notification */}
      {showMatch && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-8 rounded-2xl text-center animate-bounce">
            <h2 className="text-4xl font-bold mb-2">It's a Match!</h2>
            <p className="text-xl">You and {profiles[currentIndex - 1]?.name} liked each other!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouchMate;