import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  User,
  Shield,
  Brain,
  Book,
  Settings,
  Eye,
  EyeOff,
  Upload,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Building,
  CreditCard,
  Smartphone,
  Users,
  FileText,
  HelpCircle,
  Play
} from "lucide-react";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: true,
    analytics: true,
    community: true,
    research: false,
  });

  // Mock user data
  const userProfile = {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+61 423 456 789",
    businessName: "Chen's Organic Farm",
    businessType: "Agriculture & Farming",
    location: "Rural Queensland",
    memberSince: "March 2024",
    aiCreditScore: 720,
    verification: {
      identity: true,
      business: true,
      financial: true,
      community: true,
    },
    dataContributions: {
      bankTransactions: true,
      mobilePayments: true,
      communityEndorsements: 3,
      businessDocuments: 5,
    }
  };

  const educationalResources = [
    {
      title: "Understanding Alternative Credit",
      type: "Article",
      duration: "5 min read",
      category: "Credit Building"
    },
    {
      title: "Seasonal Cash Flow Management",
      type: "Video",
      duration: "12 min",
      category: "Financial Planning"
    },
    {
      title: "Building Community Relationships",
      type: "Guide",
      duration: "8 min read",
      category: "Networking"
    },
    {
      title: "Equipment Financing Best Practices",
      type: "Workshop",
      duration: "45 min",
      category: "Loan Management"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your account and privacy preferences</p>
          </div>
          
          <Button variant="outline" onClick={() => onNavigate("dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Summary Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold">{userProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">{userProfile.businessName}</p>
                  <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{userProfile.location}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">AI Credit Score</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{userProfile.aiCreditScore}</div>
                  <Progress value={75} className="w-full" />
                </div>

                <Badge variant="secondary" className="w-fit">
                  Member since {userProfile.memberSince}
                </Badge>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Verification Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Identity</span>
                  {userProfile.verification.identity ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Business</span>
                  {userProfile.verification.business ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financial</span>
                  {userProfile.verification.financial ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Community</span>
                  {userProfile.verification.community ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="education">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={userProfile.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={userProfile.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" value={userProfile.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" value={userProfile.location} />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" value={userProfile.businessName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Input id="businessType" value={userProfile.businessType} />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.email}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({ ...prev, email: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive urgent updates via SMS</p>
                        </div>
                        <Switch
                          checked={notificationSettings.sms}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({ ...prev, sms: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive app notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.push}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({ ...prev, push: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Marketing Communications</Label>
                          <p className="text-sm text-muted-foreground">Receive product updates and tips</p>
                        </div>
                        <Switch
                          checked={notificationSettings.marketing}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({ ...prev, marketing: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                {/* Data Sources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>Connected Data Sources</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      These data sources help improve your AI credit score and loan matching accuracy.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <CreditCard className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Bank Transactions</h4>
                            <p className="text-sm text-muted-foreground">Last 12 months of transaction data</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="secondary">Connected</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Smartphone className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Mobile Payments</h4>
                            <p className="text-sm text-muted-foreground">Mobile transaction patterns and history</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="secondary">Connected</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Users className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Community Endorsements</h4>
                            <p className="text-sm text-muted-foreground">{userProfile.dataContributions.communityEndorsements} active endorsements</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Business Documents</h4>
                            <p className="text-sm text-muted-foreground">{userProfile.dataContributions.businessDocuments} documents uploaded</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="secondary">Verified</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Add New Data Source
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>AI Credit Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-medium text-sm">Payment Reliability</h4>
                        <div className="text-lg font-bold text-primary">Excellent</div>
                        <Progress value={92} className="mt-2" />
                      </div>
                      
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <h4 className="font-medium text-sm">Cash Flow Stability</h4>
                        <div className="text-lg font-bold text-secondary">Good</div>
                        <Progress value={78} className="mt-2" />
                      </div>
                      
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <h4 className="font-medium text-sm">Community Trust</h4>
                        <div className="text-lg font-bold">High</div>
                        <Progress value={88} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                {/* Privacy Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Privacy Controls</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Data Sharing for AI Matching</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow anonymized data sharing to improve loan matching
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.dataSharing}
                          onCheckedChange={(checked) =>
                            setPrivacySettings(prev => ({ ...prev, dataSharing: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Analytics & Performance</Label>
                          <p className="text-sm text-muted-foreground">
                            Help us improve platform performance with usage analytics
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.analytics}
                          onCheckedChange={(checked) =>
                            setPrivacySettings(prev => ({ ...prev, analytics: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Community Visibility</Label>
                          <p className="text-sm text-muted-foreground">
                            Show your business in community success stories (anonymized)
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.community}
                          onCheckedChange={(checked) =>
                            setPrivacySettings(prev => ({ ...prev, community: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Research Participation</Label>
                          <p className="text-sm text-muted-foreground">
                            Participate in research to improve financial inclusion
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.research}
                          onCheckedChange={(checked) =>
                            setPrivacySettings(prev => ({ ...prev, research: checked }))
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Data Export & Deletion</h4>
                      <div className="flex space-x-4">
                        <Button variant="outline">
                          Export My Data
                        </Button>
                        <Button variant="outline">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                {/* AI Financial Literacy Chatbot */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>AI Financial Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Get personalized financial advice and answers to your questions
                    </p>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Brain className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <p className="text-sm font-medium">AI Assistant is ready to help!</p>
                          <p className="text-sm text-muted-foreground">
                            Ask about loan terms, repayment strategies, or business financial planning.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat with AI Assistant
                    </Button>
                  </CardContent>
                </Card>

                {/* Educational Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Book className="h-5 w-5" />
                      <span>Financial Literacy Resources</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {educationalResources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {resource.type === "Article" && <FileText className="h-4 w-4 text-primary" />}
                            {resource.type === "Video" && <Play className="h-4 w-4 text-primary" />}
                            {resource.type === "Guide" && <Book className="h-4 w-4 text-primary" />}
                            {resource.type === "Workshop" && <Users className="h-4 w-4 text-primary" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                              <span>{resource.duration}</span>
                              <span>•</span>
                              <span>{resource.category}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Access
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* FAQ Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <HelpCircle className="h-5 w-5" />
                      <span>Frequently Asked Questions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">How does AI credit scoring work?</h4>
                        <p className="text-sm text-muted-foreground">
                          Our AI analyzes your transaction patterns, business data, and community endorsements to create a comprehensive credit profile.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Is my data secure and private?</h4>
                        <p className="text-sm text-muted-foreground">
                          Yes, all data is encrypted, anonymized for AI processing, and you maintain full control over your privacy settings.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">How can I improve my match score?</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload additional transaction data, gather community endorsements, and maintain consistent financial patterns.
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View All FAQs
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

