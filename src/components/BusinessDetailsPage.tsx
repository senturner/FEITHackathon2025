import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  HelpCircle, 
  Plus, 
  Camera, 
  Upload, 
  FileText, 
  Link2,
  CheckCircle2,
  AlertCircle,
  Info,
  Shield,
  Lock,
  X,
  Edit3
} from "lucide-react";

interface BusinessDetailsPageProps {
  onNavigate: (page: string) => void;
}

interface CashflowEntry {
  id: string;
  category: string;
  amount: string;
  type: 'inflow' | 'outflow';
}

interface Receipt {
  id: string;
  thumbnail: string;
  date: string;
  amount: string;
  category: string;
  confidence: number;
  status: 'pending' | 'processed' | 'failed';
}

export function BusinessDetailsPage({ onNavigate }: BusinessDetailsPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    tradingName: '',
    abn: '',
    businessType: '',
    structure: '',
    yearsTrading: '',
    staffCount: '',
    location: '',
    isRemoteRural: false,
    operatingHours: [] as string[],
    seasonality: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], // 12 months
  });

  const [cashflowFrequency, setCashflowFrequency] = useState('weekly');
  const [inflows, setInflows] = useState<CashflowEntry[]>([
    { id: '1', category: 'Sales', amount: '', type: 'inflow' }
  ]);
  const [outflows, setOutflows] = useState<CashflowEntry[]>([
    { id: '1', category: 'Rent', amount: '', type: 'outflow' }
  ]);

  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [uploadMethod, setUploadMethod] = useState('camera');
  const [communityData, setCommunityData] = useState({
    endorsements: '',
    supplierReferences: [] as { name: string; phone: string }[],
  });

  const [privacyConsent, setPrivacyConsent] = useState({
    aiAnalysis: false,
    anonymizedUse: false,
  });

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    'Business Profile',
    'Cashflow',
    'Documents & Receipts',
    'Community Evidence',
    'Review'
  ];

  const businessTypes = [
    'Retail Store', 'Food Service', 'Services', 'Manufacturing', 
    'Construction', 'Transport', 'Market Stall', 'Online Business', 'Other'
  ];

  const structures = ['Sole Trader', 'Partnership', 'Company', 'Trust'];
  
  const regions = [
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 
    'Darwin', 'Hobart', 'Canberra', 'Regional NSW', 'Regional VIC',
    'Regional QLD', 'Regional WA', 'Regional SA', 'Regional NT', 'Regional TAS'
  ];

  const operatingHoursOptions = [
    'Early Morning (5-9am)', 'Business Hours (9-5pm)', 'Evening (5-9pm)', 
    'Late Night (9pm-12am)', 'Weekends', '24/7', 'Seasonal Only'
  ];

  const inflowCategories = [
    'Sales', 'Services', 'Market Stall', 'Remittances', 'Consulting', 
    'Commission', 'Rent Income', 'Other Income'
  ];

  const outflowCategories = [
    'Rent', 'Utilities', 'Supplies', 'Wages', 'Transport', 
    'Loan Repayments', 'Insurance', 'Marketing', 'Other Expenses'
  ];

  const addCashflowEntry = (type: 'inflow' | 'outflow') => {
    const newEntry: CashflowEntry = {
      id: Date.now().toString(),
      category: type === 'inflow' ? inflowCategories[0] : outflowCategories[0],
      amount: '',
      type
    };
    
    if (type === 'inflow') {
      setInflows([...inflows, newEntry]);
    } else {
      setOutflows([...outflows, newEntry]);
    }
  };

  const updateCashflowEntry = (id: string, field: string, value: string) => {
    const updateEntries = (entries: CashflowEntry[]) =>
      entries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      );

    setInflows(prev => updateEntries(prev));
    setOutflows(prev => updateEntries(prev));
  };

  const calculateDataQuality = () => {
    const hasBusinessInfo = businessData.businessName && businessData.businessType;
    const hasCashflow = inflows.some(i => i.amount) || outflows.some(o => o.amount);
    const hasReceipts = receipts.length > 0;
    
    if (hasBusinessInfo && hasCashflow && hasReceipts) return 'High';
    if (hasBusinessInfo && hasCashflow) return 'Medium';
    return 'Low';
  };

  const handleSaveDraft = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    toast.success("Draft saved locally - will sync when online");
  };

  // Auto-save when data changes
  const autoSave = () => {
    // Mark current step as completed if it has required data
    let hasRequiredData = false;
    
    switch (currentStep) {
      case 1:
        hasRequiredData = !!businessData.businessName;
        break;
      case 2:
        hasRequiredData = inflows.length > 0 && outflows.length > 0;
        break;
      case 3:
        hasRequiredData = receipts.length > 0;
        break;
      case 4:
        hasRequiredData = true; // Community evidence is optional
        break;
      case 5:
        hasRequiredData = true; // Privacy step
        break;
      default:
        hasRequiredData = true;
    }
    
    if (hasRequiredData && !completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
  };

  const handleSaveAndContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      toast.success("Progress saved");
    } else {
      toast.success("Application submitted for review");
      onNavigate('dashboard');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      autoSave();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      autoSave();
      setCurrentStep(currentStep + 1);
    }
  };

  const toggleOperatingHours = (hour: string) => {
    setBusinessData(prev => ({
      ...prev,
      operatingHours: prev.operatingHours.includes(hour)
        ? prev.operatingHours.filter(h => h !== hour)
        : [...prev.operatingHours, hour]
    }));
  };



  const renderBusinessProfile = () => (
    <Card>
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={businessData.businessName}
            onChange={(e) => setBusinessData(prev => ({ ...prev, businessName: e.target.value }))}
            placeholder="e.g., Sarah's Coffee Cart"
            className="min-h-[44px]"
          />
          <p className="text-sm text-muted-foreground">The name customers know you by</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tradingName">Trading Name (Optional)</Label>
          <Input
            id="tradingName"
            value={businessData.tradingName}
            onChange={(e) => setBusinessData(prev => ({ ...prev, tradingName: e.target.value }))}
            placeholder="e.g., Urban Bean Co"
            className="min-h-[44px]"
          />
          <p className="text-sm text-muted-foreground">If different from business name</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="abn">ABN (Optional)</Label>
          <Input
            id="abn"
            value={businessData.abn}
            onChange={(e) => setBusinessData(prev => ({ ...prev, abn: e.target.value }))}
            placeholder="11 222 333 444"
            className="min-h-[44px]"
          />
          <p className="text-sm text-muted-foreground">Australian Business Number if you have one</p>
        </div>

        <div className="space-y-2">
          <Label>Business Type *</Label>
          <Select value={businessData.businessType} onValueChange={(value) => setBusinessData(prev => ({ ...prev, businessType: value }))}>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="What type of business?" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Choose the closest match</p>
        </div>

        <div className="space-y-2">
          <Label>Business Structure</Label>
          <Select value={businessData.structure} onValueChange={(value) => setBusinessData(prev => ({ ...prev, structure: value }))}>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Legal structure" />
            </SelectTrigger>
            <SelectContent>
              {structures.map(structure => (
                <SelectItem key={structure} value={structure}>{structure}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">How your business is set up legally</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="yearsTrading">Years Trading</Label>
            <Input
              id="yearsTrading"
              type="number"
              value={businessData.yearsTrading}
              onChange={(e) => setBusinessData(prev => ({ ...prev, yearsTrading: e.target.value }))}
              placeholder="0.5"
              className="min-h-[44px]"
            />
            <p className="text-sm text-muted-foreground">Include months as decimals</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staffCount">Staff Count</Label>
            <Input
              id="staffCount"
              type="number"
              value={businessData.staffCount}
              onChange={(e) => setBusinessData(prev => ({ ...prev, staffCount: e.target.value }))}
              placeholder="1"
              className="min-h-[44px]"
            />
            <p className="text-sm text-muted-foreground">Including yourself</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Select value={businessData.location} onValueChange={(value) => setBusinessData(prev => ({ ...prev, location: value }))}>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="remoteRural"
              checked={businessData.isRemoteRural}
              onCheckedChange={(checked) => setBusinessData(prev => ({ ...prev, isRemoteRural: checked }))}
            />
            <Label htmlFor="remoteRural">Remote/Rural location</Label>
          </div>
          <p className="text-sm text-muted-foreground">Helps us understand your market</p>
        </div>

        <div className="space-y-2">
          <Label>Operating Hours</Label>
          <div className="flex flex-wrap gap-2">
            {operatingHoursOptions.map(hour => (
              <Badge
                key={hour}
                variant={businessData.operatingHours.includes(hour) ? "default" : "secondary"}
                className="cursor-pointer min-h-[44px] px-4 py-2"
                onClick={() => toggleOperatingHours(hour)}
              >
                {hour}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
        </div>

        <div className="space-y-2">
          <Label>Seasonality</Label>
          <p className="text-sm text-muted-foreground mb-4">
            Move the slider to show busy months (10 = peak season, 1 = quiet)
          </p>
          <div className="space-y-3">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
              <div key={month} className="flex items-center space-x-4">
                <span className="w-8 text-sm">{month}</span>
                <Slider
                  value={[businessData.seasonality[index]]}
                  onValueChange={(value) => {
                    const newSeasonality = [...businessData.seasonality];
                    newSeasonality[index] = value[0];
                    setBusinessData(prev => ({ ...prev, seasonality: newSeasonality }));
                  }}
                  max={10}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <span className="w-8 text-sm">{businessData.seasonality[index]}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 p-3 rounded-lg mt-4">
            <p className="text-sm text-blue-800">
              💡 Seasonal? Toggle months where earnings peak.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCashflow = () => (
    <Card>
      <CardHeader>
        <CardTitle>Cashflow</CardTitle>
        <p className="text-sm text-muted-foreground">
          Use the data you already have — photos of receipts, POS exports, or simple totals.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={cashflowFrequency} onValueChange={setCashflowFrequency}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4>Money Coming In (Inflows)</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addCashflowEntry('inflow')}
              className="min-h-[44px]"
            >
              <Plus className="h-4 w-4 mr-2" />Add another
            </Button>
          </div>
          
          {inflows.map((inflow) => (
            <div key={inflow.id} className="grid grid-cols-2 gap-2">
              <Select 
                value={inflow.category} 
                onValueChange={(value) => updateCashflowEntry(inflow.id, 'category', value)}
              >
                <SelectTrigger className="min-h-[44px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {inflowCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Amount ($)"
                value={inflow.amount}
                onChange={(e) => updateCashflowEntry(inflow.id, 'amount', e.target.value)}
                className="min-h-[44px]"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4>Money Going Out (Outflows)</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addCashflowEntry('outflow')}
              className="min-h-[44px]"
            >
              <Plus className="h-4 w-4 mr-2" />Add another
            </Button>
          </div>
          
          {outflows.map((outflow) => (
            <div key={outflow.id} className="grid grid-cols-2 gap-2">
              <Select 
                value={outflow.category} 
                onValueChange={(value) => updateCashflowEntry(outflow.id, 'category', value)}
              >
                <SelectTrigger className="min-h-[44px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {outflowCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Amount ($)"
                value={outflow.amount}
                onChange={(e) => updateCashflowEntry(outflow.id, 'amount', e.target.value)}
                className="min-h-[44px]"
              />
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="mb-2">Cashflow Preview</h4>
          {inflows.some(i => i.amount) || outflows.some(o => o.amount) ? (
            <div className="h-32 bg-white rounded border flex items-center justify-center">
              <p className="text-muted-foreground">Simple chart would appear here</p>
            </div>
          ) : (
            <div className="h-32 bg-white rounded border flex items-center justify-center">
              <p className="text-muted-foreground">Enter amounts to see preview</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span>Data Quality: </span>
            <Badge variant={calculateDataQuality() === 'High' ? 'default' : calculateDataQuality() === 'Medium' ? 'secondary' : 'outline'}>
              {calculateDataQuality()}
            </Badge>
          </div>
          <p className="text-sm text-blue-800">
            Record at least 8 weeks to improve your score.{' '}
            <button className="underline">Tips</button>
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderDocumentsReceipts = () => (
    <Card>
      <CardHeader>
        <CardTitle>Documents & Receipts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={uploadMethod} onValueChange={setUploadMethod}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="connect">Connect</TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-4">
            <div className="text-center space-y-4">
              <Button size="lg" className="h-20 w-20 rounded-full">
                <Camera className="h-8 w-8" />
              </Button>
              <p className="text-sm text-muted-foreground">Tap to capture receipt</p>
              <div className="flex items-center space-x-2">
                <Switch id="redact" />
                <Label htmlFor="redact">Redact personal info</Label>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-sm text-amber-800">⚠️ Avoid glare for better scanning</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            <Button variant="outline" className="w-full min-h-[44px]">
              <Upload className="h-4 w-4 mr-2" />
              Choose from Gallery
            </Button>
          </TabsContent>

          <TabsContent value="file" className="space-y-4">
            <Button variant="outline" className="w-full min-h-[44px]">
              <FileText className="h-4 w-4 mr-2" />
              Upload PDF/CSV
            </Button>
            <p className="text-sm text-muted-foreground">
              Bank/POS export? <button className="underline">Download sample template</button>
            </p>
          </TabsContent>

          <TabsContent value="connect" className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full min-h-[44px]">
                <Link2 className="h-4 w-4 mr-2" />
                Connect POS System
              </Button>
              <Button variant="outline" className="w-full min-h-[44px]">
                <Link2 className="h-4 w-4 mr-2" />
                Connect Mobile Money
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {receipts.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No receipts yet. Try scanning today's takings.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <h4>Uploaded Receipts</h4>
            {receipts.map((receipt) => (
              <div key={receipt.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{receipt.date}</p>
                  <p className="text-sm text-muted-foreground">${receipt.amount} • {receipt.category}</p>
                </div>
                <Badge variant={receipt.status === 'processed' ? 'default' : receipt.status === 'pending' ? 'secondary' : 'destructive'}>
                  {receipt.confidence}% confidence
                </Badge>
                <Button variant="ghost" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button 
          variant="outline" 
          className="w-full min-h-[44px]"
          onClick={() => onNavigate('recurring-uploads')}
        >
          Set up ongoing data collection
        </Button>
      </CardContent>
    </Card>
  );

  const renderCommunityEvidence = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Community Evidence</span>
          <div className="flex items-center space-x-1">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-muted-foreground">Community signals help when formal credit history is limited</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="endorsements">Community Endorsements</Label>
          <Textarea
            id="endorsements"
            value={communityData.endorsements}
            onChange={(e) => setCommunityData(prev => ({ ...prev, endorsements: e.target.value }))}
            placeholder="Tell us about community support, local reputation, customer loyalty..."
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">e.g., regular customers, community involvement, local partnerships</p>
        </div>

        <div className="space-y-2">
          <Label>Upload Supporting Letters/Photos</Label>
          <Button variant="outline" className="w-full min-h-[44px]">
            <Upload className="h-4 w-4 mr-2" />
            Upload from supplier, landlord, or community org
          </Button>
          <p className="text-sm text-muted-foreground">Letters of support, photos of your business in action</p>
        </div>

        <div className="space-y-4">
          <Label>Supplier References (Optional)</Label>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Contact name" className="min-h-[44px]" />
              <Input placeholder="Phone (optional)" className="min-h-[44px]" />
            </div>
            <Button variant="outline" size="sm" className="min-h-[44px]">
              <Plus className="h-4 w-4 mr-2" />Add another reference
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Suppliers who know your payment history</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderPrivacyConsent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span>Privacy & Consent</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="aiConsent"
              checked={privacyConsent.aiAnalysis}
              onCheckedChange={(checked) => 
                setPrivacyConsent(prev => ({ ...prev, aiAnalysis: checked as boolean }))
              }
            />
            <div className="space-y-1">
              <Label htmlFor="aiConsent" className="text-sm">
                I consent to AI analysis of uploaded data
              </Label>
              <p className="text-xs text-muted-foreground">
                We use AI to read receipts and assess creditworthiness from your business data
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="anonymizedConsent"
              checked={privacyConsent.anonymizedUse}
              onCheckedChange={(checked) => 
                setPrivacyConsent(prev => ({ ...prev, anonymizedUse: checked as boolean }))
              }
            />
            <div className="space-y-1">
              <Label htmlFor="anonymizedConsent" className="text-sm">
                I agree to anonymized use for risk scoring improvement
              </Label>
              <p className="text-xs text-muted-foreground">
                Help improve lending for similar businesses (your identity stays private)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Your data is protected</span>
          </div>
          <p className="text-xs text-green-700">
            We use bank-level encryption and never share personal details with lenders until you choose to proceed.
          </p>
          <button className="text-xs text-green-600 underline mt-1">
            How we use your data
          </button>
        </div>
      </CardContent>
    </Card>
  );



  const renderHelpModal = () => (
    <Dialog open={helpModalOpen} onOpenChange={setHelpModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What boosts my score?</DialogTitle>
          <DialogDescription>
            Tips to improve your lending prospects
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Regular cashflow data</span>
            </h4>
            <p className="text-sm text-muted-foreground pl-6">
              Upload receipts weekly for 8+ weeks to show consistent business activity
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Community endorsements</span>
            </h4>
            <p className="text-sm text-muted-foreground pl-6">
              Letters from suppliers, customers, or community organizations
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Clear business information</span>
            </h4>
            <p className="text-sm text-muted-foreground pl-6">
              Complete business profile helps lenders understand your operation
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Even without formal credit history, these factors help our AI assess your business strength
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
              className="min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-medium">Business details & cashflow</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setHelpModalOpen(true)}
            className="min-h-[44px] min-w-[44px]"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="border-b bg-background">
        <div className="container px-4 py-4">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <button
                key={step} 
                onClick={() => {
                  autoSave(); // Auto-save current step before switching
                  setCurrentStep(index + 1);
                }}
                className={`flex-1 text-center transition-colors ${
                  index + 1 === currentStep ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full border-2 flex items-center justify-center text-xs sm:text-sm mb-1 transition-all ${
                  index + 1 === currentStep 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : completedSteps.includes(index + 1)
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-muted-foreground hover:border-primary'
                }`}>
                  {completedSteps.includes(index + 1) && index + 1 !== currentStep ? (
                    <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-xs">{step}</span>
              </button>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground text-center mt-2">
            Click any step above to navigate freely • Changes are auto-saved
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-6 pb-24">
        <div className="space-y-6">
          {currentStep === 1 && renderBusinessProfile()}
          {currentStep === 2 && renderCashflow()}
          {currentStep === 3 && renderDocumentsReceipts()}
          {currentStep === 4 && renderCommunityEvidence()}
          {currentStep === 5 && (
            <div className="space-y-6">
              {renderPrivacyConsent()}
              <Card>
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="flex items-center space-x-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-green-800">Ready to submit</span>
                      </h4>
                      <p className="text-sm text-green-700">
                        Your application will be reviewed within 24-48 hours. You'll receive updates via your chosen contact method.
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By submitting, you confirm all information is accurate to the best of your knowledge.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handlePreviousStep}
            className="min-h-[44px]"
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            className="flex-1 min-h-[44px]"
          >
            Save Draft
          </Button>
          
          {currentStep === 5 ? (
            <Button 
              onClick={handleSaveAndContinue}
              className="min-h-[44px] px-6"
              disabled={!businessData.businessName}
            >
              Submit Application
            </Button>
          ) : (
            <Button 
              onClick={handleNextStep}
              className="min-h-[44px]"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {renderHelpModal()}
    </div>
  );
}