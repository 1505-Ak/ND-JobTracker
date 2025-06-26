import { useEffect, useState } from 'react';
import {
  Plus,
  Calendar as CalendarIcon,
  Briefcase,
  Eye,
  Settings,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ApplicationForm } from '@/components/ApplicationForm';
import { ApplicationCalendar } from '@/components/ApplicationCalendar';
import { AccessibilityPanel } from '@/components/AccessibilityPanel';
import { JobOpenings } from '@/components/JobOpenings';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'pending' | 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  dateApplied: Date;
  nextAction: string;
  deadline?: Date;
  notes: string;
  priority: 'low' | 'medium' | 'high';
}

const Index = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showOpenings, setShowOpenings] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // utilities state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | JobApplication['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const { toast } = useToast();

  // Load settings from localStorage
  useEffect(() => {
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    const savedDyslexia = localStorage.getItem('dyslexiaMode') === 'true';
    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedLarge = localStorage.getItem('largeText') === 'true';
    setHighContrast(savedContrast);
    setDyslexiaMode(savedDyslexia);
    setDarkMode(savedDark);
    setLargeText(savedLarge);
  }, []);

  // Apply accessibility classes to body
  useEffect(() => {
    document.body.className = '';
    if (highContrast) document.body.classList.add('high-contrast');
    if (dyslexiaMode) document.body.classList.add('dyslexia-friendly');
    if (darkMode) document.body.classList.add('dark');
    if (largeText) document.body.classList.add('large-text');
  }, [highContrast, dyslexiaMode, darkMode, largeText]);

  // gentle deadline reminder
  useEffect(() => {
    const soon = applications.filter(
      (a) => a.deadline && (new Date(a.deadline).getTime() - Date.now()) / 86400000 <= 1,
    );
    if (soon.length) {
      toast({ title: '⏰ Heads-up!', description: `You have ${soon.length} deadline(s) within 24h.` });
    }
  }, [applications, toast]);

  const addApplication = (app: Omit<JobApplication, 'id'>) => {
    const newApp: JobApplication = { ...app, id: crypto.randomUUID() };
    setApplications((prev) => [...prev, newApp]);
    setShowForm(false);
    toast({ title: 'Great job! 🎉', description: 'Your application has been added.' });
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, ...updates } : app)));
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-teal-100 text-teal-800 border-teal-200',
      applied: 'bg-blue-100 text-blue-800 border-blue-200',
      interview: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      offer: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-gray-100 text-gray-800 border-gray-200',
      withdrawn: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[status] || colors.applied;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-50 border-l-green-400',
      medium: 'bg-yellow-50 border-l-yellow-400',
      high: 'bg-red-50 border-l-red-400',
    };
    return colors[priority] || colors.medium;
  };

  // filters + sorting
  const filtered = applications.filter((app) => {
    const txt = (app.company + app.position).toLowerCase();
    const matchesSearch = txt.includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
  const sortedApplications = [...filtered].sort((a, b) => {
    const order = { high: 3, medium: 2, low: 1 } as Record<string, number>;
    return order[b.priority] - order[a.priority];
  });

  // csv export
  const exportCsv = () => {
    const header = [
      'Company',
      'Position',
      'Status',
      'Applied',
      'Deadline',
      'Next Action',
      'Priority',
      'Notes',
    ];
    const rows = applications.map((a) => [
      a.company,
      a.position,
      a.status,
      a.dateApplied.toISOString().split('T')[0],
      a.deadline ? a.deadline.toISOString().split('T')[0] : '',
      a.nextAction,
      a.priority,
      a.notes.replace(/\n/g, ' '),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${(v ?? '').toString().replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'applications.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4 sm:p-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Logo />
            <p className="text-lg text-gray-600 max-w-2xl sm:mt-0">
              Track your applications with kindness and clarity. Every step forward is progress worth celebrating!
              🌟
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="outline"
              size="sm"
              className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Open accessibility settings"
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>

            <Button
              onClick={() => setShowCalendar(!showCalendar)}
              variant="outline"
              size="sm"
              className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <CalendarIcon className="h-4 w-4 mr-2" /> Calendar
            </Button>

            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Application
            </Button>

            <Button
              onClick={() => setShowOpenings(true)}
              variant="outline"
              size="sm"
              className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Briefcase className="h-4 w-4 mr-2" /> Job Openings
            </Button>
          </div>
        </div>

        {/* Utility bar */}
        <div className="flex flex-wrap gap-2 my-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company / position"
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All status</option>
            <option value="pending">To Apply</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={exportCsv}
            className="flex gap-1 items-center focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>

        {/* Accessibility Panel */}
        {showSettings && (
          <AccessibilityPanel
            highContrast={highContrast}
            dyslexiaMode={dyslexiaMode}
            darkMode={darkMode}
            largeText={largeText}
            onHighContrastChange={setHighContrast}
            onDyslexiaModeChange={setDyslexiaMode}
            onDarkModeChange={setDarkMode}
            onLargeTextChange={setLargeText}
            onClose={() => setShowSettings(false)}
          />
        )}

        {/* Calendar View */}
        {showCalendar && (
          <ApplicationCalendar applications={applications} onClose={() => setShowCalendar(false)} />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Applications', value: applications.length, icon: Briefcase, color: 'blue' },
            {
              label: 'Active Interviews',
              value: applications.filter((a) => a.status === 'interview').length,
              icon: CalendarIcon,
              color: 'yellow',
            },
            {
              label: 'Offers Received',
              value: applications.filter((a) => a.status === 'offer').length,
              icon: Eye,
              color: 'green',
            },
            {
              label: 'In Progress',
              value: applications.filter((a) => ['applied', 'interview'].includes(a.status)).length,
              icon: Plus,
              color: 'purple',
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-l-4 border-l-current text-current hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  {/* @ts-ignore */}
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Your Applications {applications.length > 0 && `(${applications.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to start your journey?</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Add your first job application and begin tracking your progress. Remember, every expert was once a
                  beginner! 💪
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Your First Application
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedApplications.map((app) => (
                  <Card
                    key={app.id}
                    className={`border-l-4 hover:shadow-md transition-shadow duration-200 ${getPriorityColor(
                      app.priority,
                    )}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{app.position}</h3>
                            <Badge className={`${getStatusColor(app.status)} border`}>
                              {app.status === 'pending'
                                ? 'To Apply'
                                : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {app.priority} priority
                            </Badge>
                          </div>

                          <p className="text-gray-600 mb-2 font-medium">{app.company}</p>

                          <div className="space-y-1 text-sm text-gray-500">
                            <p>Applied: {app.dateApplied.toLocaleDateString()}</p>
                            {app.deadline && <p>Deadline: {app.deadline.toLocaleDateString()}</p>}
                            {app.nextAction && <p className="font-medium text-blue-600">Next: {app.nextAction}</p>}
                          </div>

                          {app.notes && (
                            <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded border">{app.notes}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 min-w-fit">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplication(app.id, { status: e.target.value as any })}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            aria-label={`Update status for ${app.company} ${app.position}`}
                          >
                            <option value="pending">To Apply</option>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                            <option value="withdrawn">Withdrawn</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Form Modal */}
        {showForm && <ApplicationForm onSubmit={addApplication} onClose={() => setShowForm(false)} />}

        {/* Job Openings Modal */}
        {showOpenings && (
          <JobOpenings
            onAdd={addApplication}
            onClose={() => setShowOpenings(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index; 