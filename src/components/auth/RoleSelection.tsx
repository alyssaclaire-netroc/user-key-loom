import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Crown, Users, Heart } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Manage the entire platform and oversee all activities",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      border: "border-purple-200",
      accent: "text-purple-600"
    },
    {
      id: "commander",
      title: "Commander",
      description: "Lead challenges and guide teams to success",
      icon: <Crown className="w-8 h-8" />,
      color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      border: "border-yellow-200",
      accent: "text-yellow-600"
    },
    {
      id: "participant",
      title: "Participant",
      description: "Join challenges and collaborate with others",
      icon: <Users className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      border: "border-blue-200",
      accent: "text-blue-600"
    },
    {
      id: "supporter",
      title: "Supporter",
      description: "Provide encouragement and support to participants",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-50 to-green-100",
      border: "border-green-200",
      accent: "text-green-600"
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Clean floating background circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md z-10 relative">
        <Card className="glass-card p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Choose Your Role
            </h1>
            <p className="text-muted-foreground text-sm">
              Select the role that best describes your involvement in Network Rocket
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                  ${selectedRole === role.id 
                    ? `${role.border} ${role.color} scale-105 shadow-lg` 
                    : 'border-border/30 glass-card hover:scale-102 hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`${selectedRole === role.id ? role.accent : 'text-muted-foreground'} transition-colors`}>
                    {role.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-foreground mb-1">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  {selectedRole === role.id && (
                    <div className="text-primary">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full ${selectedRole ? 'glass-button' : 'opacity-50 cursor-not-allowed'}`}
          >
            Continue to Persona Selection
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;