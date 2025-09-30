import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Calendar,
  Clock,
  Bell,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileImage,
  Smartphone,
  Target,
  Settings,
  BarChart3,
  Zap,
  RefreshCw
} from "lucide-react";

interface RecurringUploadsPageProps {
  onNavigate: (page: string) => void;
}

interface UploadSession {
  id: string;
  date: string;
  receipts: number;
  amount: string;
  status: 'completed' | 'partial' | 'missed';
}

interface Reminder {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  time: string;
  channels: string[];
  active: boolean;
}

export function RecurringUploadsPage({ onNavigate }: RecurringUploadsPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [recurringSettings, setRecurringSettings] = useState({
    dailyReminder: {
      enabled: true,
      time: '18:00',
      channels: ['App', 'SMS']
    },
    weeklyTarget: 20,
    autoCategories: true,
    smartNotifications: true
  });

  const [uploadSessions, setUploadSessions] = useState<UploadSession[]>([
    { id: '1', date: '2024-09-29', receipts: 8, amount: '1,240', status: 'completed' },
    { id: '2', date: '2024-09-28', receipts: 5, amount: '890', status: 'partial' },
    { id: '3', date: '2024-09-27', receipts: 12, amount: '2,180', status: 'completed' },
    { id: '4', date: '2024-09-26', receipts: 0, amount: '0', status: 'missed' },
    { id: '5', date: '2024-09-25', receipts: 15, amount: '3,250', status: 'completed' },
  ]);

  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedToday, setCapturedToday] = useState(8);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleDailyScan = () => {
    setIsCapturing(true);
    // Simulate capture process
    setTimeout(() => {
      setCapturedToday(prev => prev + 1);
      setIsCapturing(false);
      toast.success("Receipt captured and processed!");
    }, 2000);
  };

  const toggleReminderChannel = (channel: string) => {
    setRecurringSettings(prev => ({
      ...prev,
      dailyReminder: {
        ...prev.dailyReminder,
        channels: prev.dailyReminder.channels.includes(channel)
          ? prev.dailyReminder.channels.filter(c => c !== channel)
          : [...prev.dailyReminder.channels, channel]
      }
    }));
  };

  const getWeeklyProgress = () => {
    const thisWeekSessions = uploadSessions.slice(0, 7);
    const totalReceipts = thisWeekSessions.reduce((sum, session) => sum + session.receipts, 0);
    return Math.min((totalReceipts / recurringSettings.weeklyTarget) * 100, 100);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileImage className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{capturedToday}</p>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(getWeeklyProgress())}%</p>
                <p className="text-sm text-muted-foreground">Weekly Goal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>This Week's Progress</span>
            <Badge variant="secondary">{uploadSessions.slice(0, 7).reduce((sum, s) => sum + s.receipts, 0)}/{recurringSettings.weeklyTarget} receipts</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={getWeeklyProgress()} className="mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Keep it up! You're {Math.round(getWeeklyProgress())}% to your weekly goal.</span>
            <span>{recurringSettings.weeklyTarget - uploadSessions.slice(0, 7).reduce((sum, s) => sum + s.receipts, 0)} left</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Capture */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Receipt Capture</CardTitle>
          <p className="text-sm text-muted-foreground">Scan today's receipts to keep your cashflow current</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            size="lg" 
            className="w-full h-16"
            onClick={handleDailyScan}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <RefreshCw className="h-6 w-6 mr-3 animate-spin" />
            ) : (
              <Camera className="h-6 w-6 mr-3" />
            )}
            {isCapturing ? 'Processing...' : 'Scan Receipt'}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="min-h-[44px]">
              <Upload className="h-4 w-4 mr-2" />
              Upload Batch
            </Button>
            <Button variant="outline" className="min-h-[44px]">
              <Smartphone className="h-4 w-4 mr-2" />
              Connect POS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Upload Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadSessions.slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    session.status === 'completed' ? 'bg-green-100 text-green-600' :
                    session.status === 'partial' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {session.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> :
                     session.status === 'partial' ? <Clock className="h-4 w-4" /> :
                     <AlertCircle className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{new Date(session.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">{session.receipts} receipts • ${session.amount}</p>
                  </div>
                </div>
                <Badge variant={
                  session.status === 'completed' ? 'default' :
                  session.status === 'partial' ? 'secondary' : 'destructive'
                }>
                  {session.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Upload Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center mb-4">
            <p className="text-muted-foreground">Chart showing upload frequency over time</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">12.3</p>
              <p className="text-sm text-muted-foreground">Avg Daily Receipts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">3.2k</p>
              <p className="text-sm text-muted-foreground">Monthly Total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Quality Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Credit Score Boost</p>
                <p className="text-sm text-green-600">+45 points from regular uploads</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">AI Learning</p>
                <p className="text-sm text-blue-600">Better categorization from patterns</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Improving</Badge>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-800">
              💡 <strong>Tip:</strong> Upload receipts within 24 hours for the most accurate AI categorization.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Reminders</CardTitle>
          <p className="text-sm text-muted-foreground">Get notified to upload your daily receipts</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dailyReminder">Enable daily reminders</Label>
            <Switch
              id="dailyReminder"
              checked={recurringSettings.dailyReminder.enabled}
              onCheckedChange={(checked) => 
                setRecurringSettings(prev => ({
                  ...prev,
                  dailyReminder: { ...prev.dailyReminder, enabled: checked }
                }))
              }
            />
          </div>

          {recurringSettings.dailyReminder.enabled && (
            <>
              <div className="space-y-2">
                <Label>Reminder Time</Label>
                <Input 
                  type="time" 
                  value={recurringSettings.dailyReminder.time}
                  onChange={(e) => 
                    setRecurringSettings(prev => ({
                      ...prev,
                      dailyReminder: { ...prev.dailyReminder, time: e.target.value }
                    }))
                  }
                  className="min-h-[44px]"
                />
                <p className="text-sm text-muted-foreground">Best time: after business hours</p>
              </div>

              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="flex flex-wrap gap-2">
                  {['App', 'SMS', 'Email'].map(channel => (
                    <Badge
                      key={channel}
                      variant={recurringSettings.dailyReminder.channels.includes(channel) ? "default" : "secondary"}
                      className="cursor-pointer min-h-[44px] px-4 py-2"
                      onClick={() => toggleReminderChannel(channel)}
                    >
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Weekly Receipt Target</Label>
            <div className="flex items-center space-x-4">
              <Input 
                type="number" 
                value={recurringSettings.weeklyTarget}
                onChange={(e) => 
                  setRecurringSettings(prev => ({
                    ...prev,
                    weeklyTarget: parseInt(e.target.value) || 0
                  }))
                }
                className="min-h-[44px] flex-1"
              />
              <span className="text-sm text-muted-foreground">receipts/week</span>
            </div>
            <p className="text-sm text-muted-foreground">Adjust based on your business activity</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Smart Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-categorize receipts</Label>
              <p className="text-sm text-muted-foreground">AI learns your business patterns</p>
            </div>
            <Switch
              checked={recurringSettings.autoCategories}
              onCheckedChange={(checked) => 
                setRecurringSettings(prev => ({ ...prev, autoCategories: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Smart notifications</Label>
              <p className="text-sm text-muted-foreground">Adaptive reminders based on your patterns</p>
            </div>
            <Switch
              checked={recurringSettings.smartNotifications}
              onCheckedChange={(checked) => 
                setRecurringSettings(prev => ({ ...prev, smartNotifications: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="pt-4">
        <Button 
          onClick={() => toast.success("Settings saved successfully")}
          className="w-full min-h-[44px]"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex items-center justify-between px-4 h-14">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onNavigate('dashboard')}
              className="min-h-[44px] min-w-[44px] cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-medium">Ongoing Data Collection</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSettingsOpen(true)}
            className="min-h-[44px] min-w-[44px]"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b bg-background sticky top-14 z-40">
        <div className="container px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-6">
        <Tabs value={activeTab} className="space-y-6">
          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>
          
          <TabsContent value="analytics">
            {renderAnalytics()}
          </TabsContent>
          
          <TabsContent value="settings">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Settings</DialogTitle>
            <DialogDescription>
              Adjust your upload preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Daily reminders</Label>
              <Switch
                checked={recurringSettings.dailyReminder.enabled}
                onCheckedChange={(checked) => 
                  setRecurringSettings(prev => ({
                    ...prev,
                    dailyReminder: { ...prev.dailyReminder, enabled: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Auto-categorize</Label>
              <Switch
                checked={recurringSettings.autoCategories}
                onCheckedChange={(checked) => 
                  setRecurringSettings(prev => ({ ...prev, autoCategories: checked }))
                }
              />
            </div>

            <Button 
              onClick={() => {
                toast.success("Settings updated");
                setSettingsOpen(false);
              }}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}