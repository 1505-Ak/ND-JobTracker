import { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { JobApplication } from '@/pages/Index';

interface ApplicationCalendarProps {
  applications: JobApplication[];
  onClose: () => void;
}

export const ApplicationCalendar = ({ applications, onClose }: ApplicationCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getApplicationsForDate = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return applications.filter((app) => {
      const appDate = new Date(app.dateApplied);
      const deadlineDate = app.deadline ? new Date(app.deadline) : null;

      return (
        appDate.toDateString() === targetDate.toDateString() ||
        (deadlineDate && deadlineDate.toDateString() === targetDate.toDateString())
      );
    });
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-gentle-fade">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Application Calendar
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">View your applications and deadlines at a glance 📅</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 focus:ring-2 focus:ring-blue-500"
            aria-label="Close calendar"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="focus:ring-2 focus:ring-blue-500"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <h2 className="text-lg font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="focus:ring-2 focus:ring-blue-500"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2 h-20"></div>
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dayApplications = getApplicationsForDate(day);
              const isToday = isCurrentMonth && day === today.getDate();

              return (
                <div
                  key={day}
                  className={`p-2 h-20 border border-gray-200 rounded-lg overflow-hidden ${
                    isToday ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-700' : 'text-gray-900'}`}
                  >
                    {day}
                  </div>

                  <div className="space-y-1">
                    {dayApplications.slice(0, 2).map((app, appIndex) => {
                      const isDeadline =
                        app.deadline &&
                        new Date(app.deadline).toDateString() ===
                          new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                      return (
                        <div
                          key={`${app.id}-${appIndex}`}
                          className={`text-xs p-1 rounded truncate ${
                            isDeadline
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}
                          title={`${app.company} - ${app.position}${isDeadline ? ' (Deadline)' : ''}`}
                        >
                          {isDeadline ? '⏰ ' : '📝 '}
                          {app.company}
                        </div>
                      );
                    })}

                    {dayApplications.length > 2 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayApplications.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-gray-600">Application Submitted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-gray-600">Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-50 border border-blue-300 rounded"></div>
              <span className="text-gray-600">Today</span>
            </div>
          </div>

          {/* Upcoming Items */}
          {applications.length > 0 && (
            <div className="pt-4 border-t">
              <h3 className="font-medium text-gray-900 mb-3">Upcoming Deadlines &amp; Actions</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {applications
                  .filter((app) => app.deadline && new Date(app.deadline) >= new Date())
                  .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
                  .slice(0, 5)
                  .map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{app.company}</span>
                        <span className="text-gray-600 ml-2">- {app.position}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {app.deadline?.toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 