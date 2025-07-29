import { useState, useEffect } from 'react';
import { Rocket, MapPin, Phone, Globe, ArrowUp, Users, Calendar, Award, Menu, LogOut, Trophy, Gamepad2, Gift, Star, TrendingUp } from 'lucide-react';
import { BannerCarousel } from '@/components/BannerCarousel';
import { ChallengeCard } from '@/components/ChallengeCard';
import { RewardCard } from '@/components/RewardCard';
import { FriendCard } from '@/components/FriendCard';
import { ScrollableContainer } from '@/components/ScrollableContainer';

// Sample data
const challenges = {
  active: [
    { id: 1, title: "Morning Energy Boost", icon: "🌅", progress: 75, points: 45, role: "participant" as const, participants: 24 },
    { id: 2, title: "10K Steps Daily", icon: "👟", progress: 60, points: 30, role: "team-leader" as const, status: "Leading 12 astronauts" },
    { id: 3, title: "Weekend Warrior", icon: "🏃‍♂️", progress: 45, points: 22, role: "admin" as const, status: "Managing challenge" },
    { id: 4, title: "Yoga Mindfulness", icon: "🧘‍♀️", progress: 90, points: 67, role: "observer" as const, status: "Watching progress" },
    { id: 5, title: "Cycling Challenge", icon: "🚴‍♂️", progress: 30, points: 15, role: "participant" as const, status: "Just started!" },
  ],
  culinary: [
    { id: 6, title: "Healthy Lunch Week", icon: "🥗", progress: 80, points: 40, role: "participant" as const, participants: 18 },
    { id: 7, title: "No Takeout Challenge", icon: "🚫🥡", progress: 55, points: 27, role: "team-leader" as const, status: "Leading 8 astronauts" },
    { id: 8, title: "Meal Prep Master", icon: "📦", progress: 70, points: 35, role: "admin" as const, status: "Managing recipes" },
    { id: 9, title: "Hydration Station", icon: "💧", progress: 95, points: 47, role: "observer" as const, status: "Nearly complete!" },
    { id: 10, title: "Local Ingredients", icon: "🌽", progress: 40, points: 20, role: "participant" as const, status: "Exploring markets" },
  ],
  goGreen: [
    { id: 11, title: "Green Office Challenge", icon: "🏢", progress: 65, points: 32, role: "team-leader" as const, status: "Leading sustainability" },
    { id: 12, title: "Zero Waste Week", icon: "♻️", progress: 85, points: 42, role: "participant" as const, participants: 32 },
    { id: 13, title: "Plant a Tree", icon: "🌳", progress: 100, points: 50, role: "admin" as const, status: "Challenge completed!" },
    { id: 14, title: "Eco Transport", icon: "🚲", progress: 50, points: 25, role: "observer" as const, status: "Tracking progress" },
    { id: 15, title: "Plastic-Free Living", icon: "🚫🥤", progress: 35, points: 17, role: "participant" as const, status: "Learning alternatives" },
  ]
};

const friends = [
  { name: "Alex Chen", avatar: "👨‍💼", challenges: 12 },
  { name: "Sarah Kim", avatar: "👩‍💻", challenges: 8 },
  { name: "Mike Johnson", avatar: "👨‍🚀", challenges: 15 },
  { name: "Emily Davis", avatar: "👩‍🎨", challenges: 6 },
];

interface CommanderDashboardProps {
  onLogout: () => void;
}

const CommanderDashboard = ({ onLogout }: CommanderDashboardProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("active");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keyboard and body scroll handling
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    const handleBodyScroll = () => {
      if (sidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };

    document.addEventListener('keydown', handleEscKey);
    handleBodyScroll();

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const handleRoleClick = (challengeId: number, role: string) => {
    console.log(`Opening ${role} panel for challenge ${challengeId}`);
  };

  const handleInvite = () => {
    console.log("Opening invite modal");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-400 ease-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Overlay Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-[80vw] 
        bg-background border-r shadow-2xl z-50 
        transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Gamification Module */}
          <div className="rocket-card p-4">
            <h3 className="text-md font-bold mb-3 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-primary" />
              Gamification
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Leaderboard</span>
                </div>
                <span className="text-xs text-muted-foreground">#5</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Achievements</span>
                </div>
                <span className="text-xs text-muted-foreground">12/20</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Progress</span>
                </div>
                <span className="text-xs text-muted-foreground">85%</span>
              </div>
            </div>
          </div>

          {/* Rewards Module */}
          <div className="rocket-card p-4">
            <h3 className="text-md font-bold mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Rewards
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">💎</span>
                  <span className="text-sm font-medium">Premium Gems</span>
                </div>
                <p className="text-xs text-muted-foreground">You have 1,250 gems</p>
              </div>

              <div className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">⭐</span>
                  <span className="text-sm font-medium">Bonus Points</span>
                </div>
                <p className="text-xs text-muted-foreground">2,450 points available</p>
              </div>

              <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">🎟️</span>
                  <span className="text-sm font-medium">Vouchers</span>
                </div>
                <p className="text-xs text-muted-foreground">3 vouchers ready to claim</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Always Full Width, Never Shifts */}
      <div className="w-full min-h-screen transition-none">
        <div className="max-w-md mx-auto">
          {/* Top Bar */}
          <div className="top-bar">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="hover:bg-white/10 p-1 rounded transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">Challenge Commander</h1>
            <button 
              onClick={onLogout} 
              className="hover:bg-white/10 p-1 rounded transition-colors flex items-center gap-1"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-xs">Logout</span>
            </button>
          </div>

          <div className="space-y-6 p-4">
            {/* Header Section */}
            <div className="relative gradient-banner">
              <div className="network-pattern"></div>
              <div className="relative z-10 p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Network Rocket</h1>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Accelerating business connections through innovative networking solutions and gamified challenges
                  </p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Globe className="w-3 h-3" />
                    <span>www.networkrocket.com</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <MapPin className="w-3 h-3" />
                    <span>456 Business Hub Avenue, Singapore</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <Phone className="w-3 h-3" />
                    <span>+65 (555) 987-6543</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Carousel */}
            <BannerCarousel />

            {/* Friends Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span>👨‍🚀</span>
                    My Fellow Astronauts
                  </h2>
                  <p className="text-sm text-muted-foreground">Friends who joined Network Rocket's challenges</p>
                </div>
                <button
                  onClick={() => console.log("View all friends")}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  View All Friends
                </button>
              </div>
              <ScrollableContainer>
                {friends.map((friend, index) => (
                  <FriendCard key={index} {...friend} />
                ))}
                <div className="challenge-card min-w-[140px] text-center space-y-3 border-dashed border-2 border-muted">
                  <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center text-lg">
                    ➕
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Invite Friends</h4>
                    <p className="text-xs text-muted-foreground">Expand your network</p>
                  </div>
                  <button
                    onClick={handleInvite}
                    className="w-full bg-primary text-primary-foreground text-xs py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                  >
                    Invite Now
                  </button>
                </div>
              </ScrollableContainer>
            </div>

            {/* Special Rewards */}
            <div className="space-y-4">
              <div className="text-left">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span>✨</span>
                  Special Rewards
                </h2>
                <p className="text-sm text-muted-foreground">Win these amazing prizes in current challenges</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <RewardCard
                  icon="💎"
                  title="500 Premium Gems"
                  subtitle="Available in: Morning Energy Boost"
                  background="bg-gradient-to-br from-purple-50 to-purple-100"
                />
                <RewardCard
                  icon="⭐"
                  title="1000 Bonus Points"
                  subtitle="Available in: Green Office Challenge"
                  background="bg-gradient-to-br from-yellow-50 to-yellow-100"
                />
                <RewardCard
                  icon="🎟️"
                  title="$50 Shopping Voucher"
                  subtitle="Available in: Healthy Lunch Week"
                  background="bg-gradient-to-br from-green-50 to-green-100"
                />
              </div>
            </div>

            {/* Current Challenges */}
            <div className="space-y-4">
              <div className="text-left">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span>🎯</span>
                  Current Challenges
                </h2>
                <p className="text-sm text-muted-foreground">Join the adventure today!</p>
              </div>

              {/* Challenge Categories */}
              {Object.entries(challenges).map(([key, challengeList]) => (
                <div key={key} className="rocket-card">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
                    className="w-full p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{key === 'active' ? '💪' : key === 'culinary' ? '🍳' : '🌱'}</span>
                      <span className="font-semibold">{key.toUpperCase()}</span>
                    </div>
                    <span className={`transition-transform duration-200 ${expandedCategory === key ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {expandedCategory === key && (
                    <div className="px-4 pb-4">
                      <ScrollableContainer>
                        {challengeList.map((challenge) => (
                          <ChallengeCard
                            key={challenge.id}
                            {...challenge}
                            onRoleClick={() => handleRoleClick(challenge.id, challenge.role)}
                            onInvite={challenge.role === "participant" ? handleInvite : undefined}
                          />
                        ))}
                      </ScrollableContainer>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button onClick={scrollToTop} className="floating-rocket" aria-label="Back to top">
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CommanderDashboard;