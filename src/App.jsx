import React, { useState, useEffect } from 'react';
import { Heart, X, Star, MessageCircle, User, Flame, Sparkles } from 'lucide-react';

const CouchMate = () => {
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
              <div className="relative h-full max-w-sm mx-auto">
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