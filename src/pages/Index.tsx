import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import OTPVerification from "@/components/auth/OTPVerification";
import RoleSelection from "@/components/auth/RoleSelection";
import PersonaSelection from "@/components/PersonaSelection";
import CommanderDashboard from "@/components/commander/CommanderDashboard";
import EditProfile from "@/components/profile/EditProfile";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showPersonaSelection, setShowPersonaSelection] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowEditProfile(false);
  };

  const handleOTPRequired = (email: string) => {
    setUserEmail(email);
    setShowOTPVerification(true);
  };

  const handleOTPSuccess = () => {
    setShowOTPVerification(false);
    if (isSignup) {
      setShowRoleSelection(true);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleOTPBack = () => {
    setShowOTPVerification(false);
    setUserEmail("");
  };

  const handleRoleSelect = (role: string) => {
    console.log("Selected role:", role);
    setShowRoleSelection(false);
    setShowPersonaSelection(true);
  };

  const handlePersonaComplete = () => {
    setShowPersonaSelection(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowOTPVerification(false);
    setShowRoleSelection(false);
    setShowPersonaSelection(false);
    setShowEditProfile(false);
    setUserEmail("");
    setIsSignup(false);
  };

  const handleProfileEdit = () => {
    setShowEditProfile(true);
  };

  const handleProfileClose = () => {
    setShowEditProfile(false);
  };

  if (showEditProfile) {
    return <EditProfile onLogout={handleLogout} onClose={handleProfileClose} />;
  }

  if (showOTPVerification) {
    return (
      <OTPVerification 
        email={userEmail} 
        onSuccess={handleOTPSuccess} 
        onBack={handleOTPBack} 
      />
    );
  }

  if (showRoleSelection) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  if (showPersonaSelection) {
    return <PersonaSelection onComplete={handlePersonaComplete} />;
  }

  if (!isAuthenticated) {
    return (
      <AuthModal 
        onAuthSuccess={handleAuthSuccess} 
        onSignupSuccess={() => setIsSignup(true)} 
        onOTPRequired={handleOTPRequired}
      />
    );
  }

  return <CommanderDashboard onLogout={handleLogout} onProfileEdit={handleProfileEdit} />;
};

export default Index;
