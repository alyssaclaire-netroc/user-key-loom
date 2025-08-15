import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

const OTPVerification = ({ email, onSuccess, onBack }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo, accept "123456" as valid OTP
      if (otp === "123456") {
        toast({
          title: "Verification successful!",
          description: "Welcome to Network Rocket",
        });
        onSuccess();
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please try again.",
          variant: "destructive",
        });
        setOtp("");
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    setTimeLeft(300);
    setCanResend(false);
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your email.",
    });
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
            <button
              onClick={onBack}
              className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">📧</span>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Verify Your Email
            </h1>
            <p className="text-muted-foreground text-sm">
              We've sent a verification code to
            </p>
            <p className="text-primary font-medium text-sm">{email}</p>
          </div>

          <div className="space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP 
                value={otp} 
                onChange={setOtp}
                maxLength={6}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="glass-input w-12 h-12 text-center text-lg font-semibold" />
                  <InputOTPSlot index={1} className="glass-input w-12 h-12 text-center text-lg font-semibold" />
                  <InputOTPSlot index={2} className="glass-input w-12 h-12 text-center text-lg font-semibold" />
                  <InputOTPSlot index={3} className="glass-input w-12 h-12 text-center text-lg font-semibold" />
                  <InputOTPSlot index={4} className="glass-input w-12 h-12 text-center text-lg font-semibold" />
                  <InputOTPSlot index={5} className="glass-input w-12 h-12 text-center text-lg font-semibold" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Timer */}
            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Code expires in {formatTime(timeLeft)}
                </p>
              ) : (
                <p className="text-sm text-destructive">
                  Code has expired
                </p>
              )}
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="w-full glass-button"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            {/* Resend Option */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Resend Code
                </button>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Resend available in {formatTime(timeLeft)}
                </span>
              )}
            </div>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Demo:</strong> Use "123456" as the verification code
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;