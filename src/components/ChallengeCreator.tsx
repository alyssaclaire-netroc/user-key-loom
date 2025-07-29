import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, Plus, Minus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Stage {
  id: number;
  name: string;
  rewards: string;
}

const ChallengeCreator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    uploadedFile: null as File | null,
    category: '',
    mode: '',
    teamSize: 2,
    teamNameGuidelines: '',
    difficulty: '',
    visibility: 'public',
    isMultiStage: false,
    stages: [{ id: 1, name: '', rewards: '' }] as Stage[],
    rewards: [] as string[],
    publishStart: '',
    publishEnd: '',
    challengeStart: '',
    challengeEnd: ''
  });

  const { toast } = useToast();

  const categories = [
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'running', name: 'Running', icon: '🏃' },
    { id: 'cycling', name: 'Cycling', icon: '🚴' },
    { id: 'swimming', name: 'Swimming', icon: '🏊' },
    { id: 'fitness', name: 'Fitness', icon: '💪' }
  ];

  const modes = [
    { id: 'single', name: 'Single Player', icon: '👤', description: 'Individual challenge' },
    { id: 'team', name: 'Team', icon: '👥', description: 'Team-based challenge' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', icon: '🟢', color: 'text-success' },
    { id: 'medium', name: 'Medium', icon: '🟡', color: 'text-warning' },
    { id: 'hard', name: 'Hard', icon: '🔴', color: 'text-danger' }
  ];

  const visibilityOptions = [
    { id: 'public', name: 'Public', icon: '🌍', description: 'Anyone can join' },
    { id: 'private', name: 'Private', icon: '🔒', description: 'Invite only' }
  ];

  const rewardOptions = [
    { id: 'badges', name: 'Badges', icon: '🏆', description: 'Digital achievement badges' },
    { id: 'points', name: 'Points', icon: '⭐', description: 'Experience points system' },
    { id: 'custom', name: 'Custom Rewards', icon: '🎁', description: 'Physical or digital prizes' }
  ];

  const nextStep = async () => {
    if (validateCurrentStep()) {
      setIsLoading(true);
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(prev => Math.min(prev + 1, 4));
      setIsLoading(false);

      toast({
        title: "Step Completed!",
        description: `Moving to step ${Math.min(currentStep + 1, 4)}`,
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.title.trim()) {
          toast({
            title: "Missing Information",
            description: "Please enter a challenge title",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.description.trim()) {
          toast({
            title: "Missing Information",
            description: "Please enter a challenge description",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.category) {
          toast({
            title: "Missing Information",
            description: "Please select a category",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 2:
        if (!formData.mode) {
          toast({
            title: "Missing Settings",
            description: "Please select a challenge mode",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.difficulty) {
          toast({
            title: "Missing Settings",
            description: "Please select a difficulty level",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 3:
        if (formData.rewards.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please select at least one reward type",
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const selectCategory = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const selectMode = (mode: string) => {
    setFormData(prev => ({ ...prev, mode }));
  };

  const selectDifficulty = (difficulty: string) => {
    setFormData(prev => ({ ...prev, difficulty }));
  };

  const selectVisibility = (visibility: string) => {
    setFormData(prev => ({ ...prev, visibility }));
  };

  const toggleReward = (reward: string) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.includes(reward)
        ? prev.rewards.filter(r => r !== reward)
        : [...prev.rewards, reward]
    }));
  };

  const toggleMultiStage = () => {
    setFormData(prev => ({ ...prev, isMultiStage: !prev.isMultiStage }));
  };

  const addStage = () => {
    const newId = Math.max(...formData.stages.map(s => s.id)) + 1;
    setFormData(prev => ({
      ...prev,
      stages: [...prev.stages, { id: newId, name: '', rewards: '' }]
    }));
  };

  const removeStage = (id: number) => {
    if (formData.stages.length > 1) {
      setFormData(prev => ({
        ...prev,
        stages: prev.stages.filter(s => s.id !== id)
      }));
    }
  };

  const updateStage = (id: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, uploadedFile: file }));
    }
  };

  const publishChallenge = () => {
    toast({
      title: "Challenge Published!",
      description: "Your challenge has been successfully published",
    });
    setCurrentStep(4);
  };

  const saveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your challenge has been saved as a draft",
    });
  };

  const createAnother = () => {
    setCurrentStep(1);
    setFormData({
      title: '',
      description: '',
      uploadedFile: null,
      category: '',
      mode: '',
      teamSize: 2,
      teamNameGuidelines: '',
      difficulty: '',
      visibility: 'public',
      isMultiStage: false,
      stages: [{ id: 1, name: '', rewards: '' }],
      rewards: [],
      publishStart: '',
      publishEnd: '',
      challengeStart: '',
      challengeEnd: ''
    });
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {[1, 2, 3].map(step => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              step <= currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-glass-dark text-muted-foreground'
            }`}
          >
            {step < currentStep ? <Check className="w-4 h-4" /> : step}
          </div>
        ))}
      </div>
      <div className="h-2 bg-glass-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-primary progress-fill"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 fade-in">
      <div>
        <label className="block text-sm font-semibold mb-2">Challenge Title *</label>
        <Input
          placeholder="Enter challenge title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="glass border-glass-border"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description *</label>
        <Textarea
          placeholder="Describe your challenge..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="glass border-glass-border min-h-[100px] resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Upload Image/Video</label>
        <div className="glass border-glass-border rounded-3xl p-8 text-center">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              {formData.uploadedFile ? formData.uploadedFile.name : 'Drag & drop or click to upload'}
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, MP4 up to 10MB</p>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-4">Category *</label>
        <div className="grid grid-cols-2 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => selectCategory(category.id)}
              className={`selection-card ${formData.category === category.id ? 'selected' : ''}`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 fade-in">
      <div>
        <label className="block text-sm font-semibold mb-4">Challenge Mode *</label>
        <div className="grid gap-4">
          {modes.map(mode => (
            <div
              key={mode.id}
              onClick={() => selectMode(mode.id)}
              className={`selection-card ${formData.mode === mode.id ? 'selected' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{mode.icon}</div>
                <div className="text-left">
                  <div className="font-semibold">{mode.name}</div>
                  <div className="text-sm text-muted-foreground">{mode.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {formData.mode === 'team' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Team Size</label>
            <Input
              type="number"
              min="2"
              max="20"
              value={formData.teamSize}
              onChange={(e) => setFormData(prev => ({ ...prev, teamSize: parseInt(e.target.value) }))}
              className="glass border-glass-border"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Team Name Guidelines</label>
            <Textarea
              placeholder="Guidelines for team names..."
              value={formData.teamNameGuidelines}
              onChange={(e) => setFormData(prev => ({ ...prev, teamNameGuidelines: e.target.value }))}
              className="glass border-glass-border"
              rows={3}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-4">Difficulty Level *</label>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map(difficulty => (
            <div
              key={difficulty.id}
              onClick={() => selectDifficulty(difficulty.id)}
              className={`selection-card ${formData.difficulty === difficulty.id ? 'selected' : ''}`}
            >
              <div className={`text-2xl mb-2 ${difficulty.color}`}>{difficulty.icon}</div>
              <div className="font-medium">{difficulty.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-4">Visibility</label>
        <div className="grid gap-4">
          {visibilityOptions.map(option => (
            <div
              key={option.id}
              onClick={() => selectVisibility(option.id)}
              className={`selection-card ${formData.visibility === option.id ? 'selected' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{option.icon}</div>
                <div className="text-left">
                  <div className="font-semibold">{option.name}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold">Multi-Stage Challenge</label>
          <button
            onClick={toggleMultiStage}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.isMultiStage ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isMultiStage ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {formData.isMultiStage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Challenge Stages</h4>
              <Button
                type="button"
                onClick={addStage}
                variant="outline"
                size="sm"
                className="glass border-glass-border"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Stage
              </Button>
            </div>
            {formData.stages.map((stage, index) => (
              <div key={stage.id} className="glass border-glass-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">Stage {index + 1}</h5>
                  {formData.stages.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeStage(stage.id)}
                      variant="ghost"
                      size="sm"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Stage name"
                    value={stage.name}
                    onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                    className="glass border-glass-border"
                  />
                  <Input
                    placeholder="Rewards"
                    value={stage.rewards}
                    onChange={(e) => updateStage(stage.id, 'rewards', e.target.value)}
                    className="glass border-glass-border"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 fade-in">
      <div>
        <label className="block text-sm font-semibold mb-4">Rewards</label>
        <div className="grid gap-4">
          {rewardOptions.map(reward => (
            <div
              key={reward.id}
              onClick={() => toggleReward(reward.id)}
              className={`selection-card ${formData.rewards.includes(reward.id) ? 'selected' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{reward.icon}</div>
                <div className="text-left">
                  <div className="font-semibold">{reward.name}</div>
                  <div className="text-sm text-muted-foreground">{reward.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Publish Start Date</label>
          <Input
            type="datetime-local"
            value={formData.publishStart}
            onChange={(e) => setFormData(prev => ({ ...prev, publishStart: e.target.value }))}
            className="glass border-glass-border"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Publish End Date</label>
          <Input
            type="datetime-local"
            value={formData.publishEnd}
            onChange={(e) => setFormData(prev => ({ ...prev, publishEnd: e.target.value }))}
            className="glass border-glass-border"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Challenge Start Date</label>
          <Input
            type="datetime-local"
            value={formData.challengeStart}
            onChange={(e) => setFormData(prev => ({ ...prev, challengeStart: e.target.value }))}
            className="glass border-glass-border"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Challenge End Date</label>
          <Input
            type="datetime-local"
            value={formData.challengeEnd}
            onChange={(e) => setFormData(prev => ({ ...prev, challengeEnd: e.target.value }))}
            className="glass border-glass-border"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6 fade-in">
      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-primary-foreground" />
      </div>
      
      <h2 className="text-3xl font-bold gradient-text">Challenge Published!</h2>
      <p className="text-muted-foreground text-lg">
        Your challenge has been successfully created and is now live.
      </p>

      <div className="glass border-glass-border rounded-3xl p-6 text-left max-w-md mx-auto">
        <h3 className="font-semibold mb-3">Challenge Summary</h3>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Title:</span> {formData.title}</div>
          <div><span className="font-medium">Category:</span> {categories.find(c => c.id === formData.category)?.name}</div>
          <div><span className="font-medium">Mode:</span> {modes.find(m => m.id === formData.mode)?.name}</div>
          <div><span className="font-medium">Difficulty:</span> {difficulties.find(d => d.id === formData.difficulty)?.name}</div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Button onClick={createAnother} variant="outline" className="glass border-glass-border">
          Create Another Challenge
        </Button>
        <Button onClick={() => window.history.back()}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass border-glass-border rounded-3xl p-8 shadow-glass">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Create Challenge</h1>
            <p className="text-muted-foreground">Design an engaging challenge for your community</p>
          </div>

          {currentStep < 4 && renderProgressBar()}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {currentStep < 4 && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-glass-border">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 1}
                className="glass border-glass-border"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-3">
                <Button onClick={saveDraft} variant="outline" className="glass border-glass-border">
                  Save Draft
                </Button>
                {currentStep === 3 ? (
                  <Button onClick={publishChallenge} disabled={isLoading}>
                    {isLoading ? 'Publishing...' : 'Publish Challenge'}
                  </Button>
                ) : (
                  <Button onClick={nextStep} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Next'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCreator;