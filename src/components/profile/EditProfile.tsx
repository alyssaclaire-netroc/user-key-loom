import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Home, 
  Phone, 
  IdCard, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Edit3, 
  Camera,
  Save,
  LogOut,
  Trophy,
  Star,
  Gem
} from "lucide-react";

interface EditProfileProps {
  onLogout: () => void;
  onClose: () => void;
}

const EditProfile = ({ onLogout, onClose }: EditProfileProps) => {
  const [profileData, setProfileData] = useState({
    fullName: "Alex Thompson",
    address: "123 Innovation Street, Tech Valley",
    contactNumber: "+65 9123 4567",
    unitId: "NR2024001",
    email: "alex.thompson@networkrocket.com",
    password: "••••••••",
    profilePicture: "👨‍💼"
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const { toast } = useToast();

  const handleEdit = (field: string) => {
    setEditingField(field);
    setTempValue(profileData[field as keyof typeof profileData]);
  };

  const handleSave = (field: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: tempValue
    }));
    setEditingField(null);
    toast({
      title: "Profile updated",
      description: `${field} has been updated successfully.`,
    });
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      onLogout();
    }
  };

  const handleProfilePictureChange = () => {
    // Simulate image upload
    const emojis = ["👨‍💼", "👩‍💼", "👨‍🚀", "👩‍🚀", "🧑‍💻", "👨‍🎨", "👩‍🎨"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setProfileData(prev => ({ ...prev, profilePicture: randomEmoji }));
    toast({
      title: "Profile picture updated",
      description: "Your profile picture has been changed.",
    });
  };

  const personalFields = [
    { key: "fullName", label: "Name", icon: User },
    { key: "address", label: "Address", icon: Home },
    { key: "contactNumber", label: "Contact Number", icon: Phone },
    { key: "unitId", label: "Unit ID", icon: IdCard },
  ];

  const accountFields = [
    { key: "email", label: "Email", icon: Mail },
    { key: "password", label: "Password", icon: Lock, type: "password" },
  ];

  const achievements = [
    { icon: "🏆", name: "Challenge Master", description: "Completed 10 challenges" },
    { icon: "⭐", name: "Team Player", description: "Helped 50 teammates" },
    { icon: "🚀", name: "Innovation Leader", description: "Created 5 challenges" },
    { icon: "💎", name: "Gem Collector", description: "Earned 1000 gems" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="text-primary-foreground hover:text-primary-foreground/80"
          >
            ← Back
          </button>
          <h1 className="font-semibold">Edit Profile</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Top Banner with Profile Picture */}
          <Card className="relative overflow-hidden">
            <div 
              className="h-32 bg-gradient-to-r from-primary to-purple-600 relative"
              style={{ 
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)), hsl(270 60% 45%), hsl(220 60% 50%))'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="relative -mt-16 flex flex-col items-center pb-4">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white">
                  {profileData.profilePicture}
                </div>
                <button
                  onClick={handleProfilePictureChange}
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              {/* Points Display */}
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">2,450</span>
                  <span className="text-muted-foreground">Points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">12</span>
                  <span className="text-muted-foreground">Badges</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gem className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">1,250</span>
                  <span className="text-muted-foreground">Gems</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            <div className="space-y-4">
              {personalFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <field.icon className="w-4 h-4" />
                    {field.label}
                  </Label>
                  {editingField === field.key ? (
                    <div className="flex gap-2">
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSave(field.key)}
                        className="px-3"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        className="px-3"
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{profileData[field.key as keyof typeof profileData]}</span>
                      <button
                        onClick={() => handleEdit(field.key)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Account Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Account Information
            </h3>
            <div className="space-y-4">
              {accountFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <field.icon className="w-4 h-4" />
                    {field.label}
                  </Label>
                  {editingField === field.key ? (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type={field.type === "password" && !showPassword ? "password" : "text"}
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                        />
                        {field.type === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSave(field.key)}
                        className="px-3"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        className="px-3"
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">
                        {field.type === "password" ? "••••••••" : profileData[field.key as keyof typeof profileData]}
                      </span>
                      <button
                        onClick={() => handleEdit(field.key)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-xs font-medium">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full glass-button">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleLogoutClick}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;