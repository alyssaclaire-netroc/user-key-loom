import { Users, ArrowRight } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  icon: string;
  progress: number;
  points: number;
  role: 'participant' | 'team-leader' | 'admin' | 'observer';
  status?: string;
  participants?: number;
  onRoleClick: () => void;
  onInvite?: () => void;
}

const roleConfig = {
  participant: {
    label: "Participant",
    className: "role-button role-participant",
    icon: "👤"
  },
  'team-leader': {
    label: "Team Leader",
    className: "role-button role-team-leader",
    icon: "👥"
  },
  admin: {
    label: "Admin",
    className: "role-button role-admin",
    icon: "⚙️"
  },
  observer: {
    label: "Observer",
    className: "role-button role-observer",
    icon: "👁️"
  }
};

export const ChallengeCard = ({
  title,
  icon,
  progress,
  points,
  role,
  status,
  participants,
  onRoleClick,
  onInvite
}: ChallengeCardProps) => {
  const roleData = roleConfig[role];

  return (
    <div className="challenge-card min-w-[280px] space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          {status && (
            <p className="text-xs text-muted-foreground">{status}</p>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{progress}% • {points} pts</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="progress-fill h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Role Button */}
      <button
        onClick={onRoleClick}
        className={roleData.className}
      >
        <span>{roleData.icon}</span>
        <span>{roleData.label}</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      {/* Additional Info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {participants && (
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{participants} astronauts</span>
          </div>
        )}
        {onInvite && (
          <button
            onClick={onInvite}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Invite Friends
          </button>
        )}
      </div>
    </div>
  );
};