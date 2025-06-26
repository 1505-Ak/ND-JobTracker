import { X, Eye, Type, Contrast, Volume2, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AccessibilityPanelProps {
  highContrast: boolean;
  dyslexiaMode: boolean;
  onHighContrastChange: (value: boolean) => void;
  onDyslexiaModeChange: (value: boolean) => void;
  onClose: () => void;
}

export const AccessibilityPanel = ({
  highContrast,
  dyslexiaMode,
  onHighContrastChange,
  onDyslexiaModeChange,
  onClose,
}: AccessibilityPanelProps) => {
  const handleHighContrastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onHighContrastChange(value);
    localStorage.setItem('highContrast', value.toString());
  };

  const handleDyslexiaModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onDyslexiaModeChange(value);
    localStorage.setItem('dyslexiaMode', value.toString());
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/50 animate-gentle-fade fixed right-4 top-4 w-[360px] z-40">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Accessibility Settings
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Customize the interface to work best for you ✨
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 focus:ring-2 focus:ring-blue-500"
          aria-label="Close accessibility settings"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* High Contrast Mode */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
          <div className="flex items-start gap-3">
            <Contrast className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <Label htmlFor="high-contrast" className="text-sm font-medium text-gray-900">
                High Contrast Mode
              </Label>
              <p className="text-xs text-gray-600 mt-1">
                Increases contrast between text and background for better visibility
              </p>
            </div>
          </div>
          <Switch id="high-contrast" checked={highContrast} onChange={handleHighContrastChange} />
        </div>

        {/* Dyslexia-Friendly Mode */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
          <div className="flex items-start gap-3">
            <Type className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <Label htmlFor="dyslexia-mode" className="text-sm font-medium text-gray-900">
                Dyslexia-Friendly Font
              </Label>
              <p className="text-xs text-gray-600 mt-1">
                Uses OpenDyslexic font and improved spacing for easier reading
              </p>
            </div>
          </div>
          <Switch id="dyslexia-mode" checked={dyslexiaMode} onChange={handleDyslexiaModeChange} />
        </div>

        {/* Keyboard Navigation Info */}
        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-start gap-3">
            <Keyboard className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Keyboard Navigation</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd> - Navigate forward
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Shift + Tab</kbd> - Navigate backward
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> - Activate buttons/links
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Escape</kbd> - Close dialogs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Commands Info */}
        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-start gap-3">
            <Volume2 className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Voice Commands</h4>
              <p className="text-xs text-gray-600">
                This app is compatible with screen readers and voice navigation software like Dragon NaturallySpeaking.
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center pt-4 border-t">
          Your accessibility preferences are saved locally and will persist across sessions.
        </div>
      </CardContent>
    </Card>
  );
}; 