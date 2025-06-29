import { X, Eye, Type, Contrast, Volume2, Keyboard, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AccessibilityPanelProps {
  highContrast: boolean;
  dyslexiaMode: boolean;
  darkMode: boolean;
  largeText: boolean;
  onHighContrastChange: (value: boolean) => void;
  onDyslexiaModeChange: (value: boolean) => void;
  onDarkModeChange: (value: boolean) => void;
  onLargeTextChange: (value: boolean) => void;
  onClose: () => void;
}

export const AccessibilityPanel = ({
  highContrast,
  dyslexiaMode,
  darkMode,
  largeText,
  onHighContrastChange,
  onDyslexiaModeChange,
  onDarkModeChange,
  onLargeTextChange,
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

  const handleDarkModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onDarkModeChange(value);
    localStorage.setItem('darkMode', value.toString());
  };

  const handleLargeTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onLargeTextChange(value);
    localStorage.setItem('largeText', value.toString());
  };

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-slate-800/90 animate-gentle-fade fixed right-4 top-4 w-[360px] z-40">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Accessibility Settings
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Customize the interface to work best for you ✨
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 focus:ring-2 focus:ring-blue-500 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Close accessibility settings"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* High Contrast Mode */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg border dark:border-slate-600">
          <div className="flex items-start gap-3">
            <Contrast className="h-5 w-5 text-gray-600 dark:text-gray-300 mt-0.5" />
            <div>
              <Label htmlFor="high-contrast" className="text-sm font-medium text-gray-900 dark:text-white">
                High Contrast Mode
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Increases contrast between text and background for better visibility
              </p>
            </div>
          </div>
          <Switch id="high-contrast" checked={highContrast} onChange={handleHighContrastChange} />
        </div>

        {/* Dyslexia-Friendly Mode */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg border dark:border-slate-600">
          <div className="flex items-start gap-3">
            <Type className="h-5 w-5 text-gray-600 dark:text-gray-300 mt-0.5" />
            <div>
              <Label htmlFor="dyslexia-mode" className="text-sm font-medium text-gray-900 dark:text-white">
                Dyslexia-Friendly Font
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Uses OpenDyslexic font and improved spacing for easier reading
              </p>
            </div>
          </div>
          <Switch id="dyslexia-mode" checked={dyslexiaMode} onChange={handleDyslexiaModeChange} />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg border dark:border-slate-600">
          <div className="flex items-start gap-3">
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300 mt-0.5" />
            <div>
              <Label htmlFor="dark-mode" className="text-sm font-medium text-gray-900 dark:text-white">
                Dark Mode
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Switches interface to a dark theme</p>
            </div>
          </div>
          <Switch id="dark-mode" checked={darkMode} onChange={handleDarkModeChange} />
        </div>

        {/* Large Text */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg border dark:border-slate-600">
          <div className="flex items-start gap-3">
            <Type className="h-5 w-5 text-gray-600 dark:text-gray-300 mt-0.5" />
            <div>
              <Label htmlFor="large-text" className="text-sm font-medium text-gray-900 dark:text-white">
                Large Text
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Increases base font size for easier reading</p>
            </div>
          </div>
          <Switch id="large-text" checked={largeText} onChange={handleLargeTextChange} />
        </div>

        {/* Keyboard Navigation Info */}
        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg border dark:border-slate-600">
          <div className="flex items-start gap-3">
            <Keyboard className="h-5 w-5 text-gray-600 dark:text-gray-300 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Keyboard Navigation</h4>
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-600 rounded text-xs">Tab</kbd> - Navigate forward
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-600 rounded text-xs">Shift + Tab</kbd> - Navigate backward
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-600 rounded text-xs">Enter</kbd> - Activate buttons/links
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-600 rounded text-xs">Escape</kbd> - Close dialogs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Commands Info */}
        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg border dark:border-slate-600">
          <div className="flex items-start gap-3">
            <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Voice Commands</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                This app is compatible with screen readers and voice navigation software like Dragon NaturallySpeaking.
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4 border-t dark:border-slate-600">
          Your accessibility preferences are saved locally and will persist across sessions.
        </div>
      </CardContent>
    </Card>
  );
}; 