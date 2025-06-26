import { useState } from 'react';
import { X, Calendar as CalendarIcon, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { JobApplication } from '@/pages/Index';

interface ApplicationFormProps {
  onSubmit: (application: Omit<JobApplication, 'id'>) => void;
  onClose: () => void;
}

export const ApplicationForm = ({ onSubmit, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied' as const,
    dateApplied: new Date().toISOString().split('T')[0],
    nextAction: '',
    deadline: '',
    notes: '',
    priority: 'medium' as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      company: formData.company.trim(),
      position: formData.position.trim(),
      status: formData.status,
      dateApplied: new Date(formData.dateApplied),
      nextAction: formData.nextAction.trim(),
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
      notes: formData.notes.trim(),
      priority: formData.priority,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-gentle-fade">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Add New Application
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Take your time and fill this out completely. You're doing great! 🌟
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 focus:ring-2 focus:ring-blue-500"
            aria-label="Close form"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company and Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company Name *
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="e.g. Google, Microsoft, Local Startup"
                  className={`focus:ring-2 focus:ring-blue-500 ${errors.company ? 'border-red-500' : ''}`}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                />
                {errors.company && (
                  <p id="company-error" className="text-sm text-red-600" role="alert">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                  Position Title *
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="e.g. Software Engineer, Designer"
                  className={`focus:ring-2 focus:ring-blue-500 ${errors.position ? 'border-red-500' : ''}`}
                  aria-describedby={errors.position ? 'position-error' : undefined}
                />
                {errors.position && (
                  <p id="position-error" className="text-sm text-red-600" role="alert">
                    {errors.position}
                  </p>
                )}
              </div>
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Current Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">To Apply</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview Scheduled</SelectItem>
                    <SelectItem value="offer">Offer Received</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange('priority', value)}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="dateApplied"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  <CalendarIcon className="h-4 w-4" /> Date Applied
                </Label>
                <Input
                  id="dateApplied"
                  type="date"
                  value={formData.dateApplied}
                  onChange={(e) => handleInputChange('dateApplied', e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="deadline"
                  className="text-sm font-medium text-gray-700 flex items-center gap-1"
                >
                  <CalendarIcon className="h-4 w-4" /> Deadline (Optional)
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Next Action */}
            <div className="space-y-2">
              <Label htmlFor="nextAction" className="text-sm font-medium text-gray-700">
                Next Action or Follow-up
              </Label>
              <Input
                id="nextAction"
                value={formData.nextAction}
                onChange={(e) => handleInputChange('nextAction', e.target.value)}
                placeholder="e.g. Follow up email, Prepare for interview, Send thank you note"
                className="focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">What do you need to do next for this application?</p>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes &amp; Details
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional details, interview feedback, salary info, etc."
                rows={4}
                className="focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                Keep track of important details, contacts, or thoughts about this application.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500"
              >
                Add Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}; 