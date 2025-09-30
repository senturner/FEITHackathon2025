import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  DollarSign,
  Calendar,
  TrendingUp,
  Shield,
  FileText,
  Clock,
  MapPin,
  Star,
  Brain,
  Zap,
  Users,
  CheckCircle,
  AlertTriangle,
  PenTool,
  Download
} from "lucide-react";

interface LoanDetailsPageProps {
  onNavigate: (page: string) => void;
}

export function LoanDetailsPage({ onNavigate }: LoanDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock loan details
  const loanDetails = {
    id: "L2024-001",
    borrower: {
      businessName: "Chen's Organic Farm",
      owner: "Sarah Chen",
      location: "Rural Queensland",
      sector: "Agriculture",
      businessAge: "5 years",
      revenue: "$120K annually",
      employees: 3
    },
    lender: {
      name: "Rural Business Investor",
      type: "Individual",
      rating: 4.8,
      totalLoans: 23,
      location: "Queensland"
    },
    amount: 35000,
    purpose: "Equipment & Irrigation System",
    interestRate: 14.5,
    term: 18,
    monthlyPayment: 2245,
    startDate: "2024-10-01",
    endDate: "2026-04-01",
    status: "Pending Approval",
    aiRiskScore: 78,
    successPrediction: 89,
    matchScore: 93
  };

  const repaymentSchedule = [
    { month: 1, date: "2024-11-01", principal: 1689, interest: 556, total: 2245, balance: 33311 },
    { month: 2, date: "2024-12-01", principal: 1709, interest: 536, total: 2245, balance: 31602 },
    { month: 3, date: "2025-01-01", principal: 1729, interest: 516, total: 2245, balance: 29873 },
    { month: 6, date: "2025-04-01", principal: 1812, interest: 433, total: 2245, balance: 24439 },
    { month: 12, date: "2025-10-01", principal: 1977, interest: 268, total: 2245, balance: 12863 },
    { month: 18, date: "2026-04-01", principal: 2218, interest: 27, total: 2245, balance: 0 }
  ];

  const riskFactors = [
    { factor: "Business History", status: "positive", description: "5+ years established operation" },
    { factor: "Revenue Stability", status: "positive", description: "Consistent seasonal revenue pattern" },
    { factor: "Market Demand", status: "positive", description: "Growing organic food market" },
    { factor: "Equipment Dependency", status: "neutral", description: "Equipment-heavy business model" },
    { factor: "Weather Risk", status: "caution", description: "Agricultural weather exposure" }
  ];

  const documents = [
    { name: "Business Plan.pdf", type: "Business Plan", status: "verified", size: "2.3 MB" },
    { name: "Financial Statements.pdf", type: "Financial", status: "verified", size: "1.8 MB" },
    { name: "Equipment Quote.pdf", type: "Purchase Order", status: "verified", size: "456 KB" },
    { name: "Community Letter.pdf", type: "Reference", status: "verified", size: "234 KB" }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Loan Details</h1>
            <p className="text-muted-foreground">Loan ID: {loanDetails.id}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{loanDetails.status}</Badge>
            <Button variant="outline" onClick={() => onNavigate("marketplace")}>
              Back to Marketplace
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Loan Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Loan Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="text-2xl font-bold">${loanDetails.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Purpose</p>
                      <p className="font-medium">{loanDetails.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-xl font-semibold text-green-600">{loanDetails.interestRate}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Term</p>
                      <p className="font-semibold">{loanDetails.term} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold">${loanDetails.monthlyPayment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{loanDetails.startDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Borrower/Lender Profiles */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Borrower Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-secondary" />
                    <span>Borrower Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {loanDetails.borrower.owner.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{loanDetails.borrower.businessName}</h3>
                      <p className="text-sm text-muted-foreground">Owner: {loanDetails.borrower.owner}</p>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{loanDetails.borrower.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sector</p>
                      <p className="font-medium">{loanDetails.borrower.sector}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Business Age</p>
                      <p className="font-medium">{loanDetails.borrower.businessAge}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium">{loanDetails.borrower.revenue}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Employees</p>
                      <p className="font-medium">{loanDetails.borrower.employees}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lender Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Lender Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {loanDetails.lender.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{loanDetails.lender.name}</h3>
                      <p className="text-sm text-muted-foreground">{loanDetails.lender.type}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{loanDetails.lender.rating}</span>
                        <span className="text-muted-foreground">({loanDetails.lender.totalLoans} loans)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{loanDetails.lender.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Loans</p>
                      <p className="font-medium">{loanDetails.lender.totalLoans}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Interest</p>
                        <p className="text-lg font-bold text-primary">$5,410</p>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Payments</p>
                        <p className="text-lg font-bold text-secondary">$40,410</p>
                      </div>
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <p className="text-sm text-muted-foreground">APR</p>
                        <p className="text-lg font-bold">14.5%</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Loan Features</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Seasonal payment flexibility</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Early repayment allowed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">No hidden fees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Equipment secured</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Repayment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {repaymentSchedule.map((payment) => (
                        <div key={payment.month} className="grid grid-cols-5 gap-4 p-4 bg-muted/30 rounded-lg text-sm">
                          <div>
                            <p className="text-muted-foreground">Month {payment.month}</p>
                            <p className="font-medium">{payment.date}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Principal</p>
                            <p className="font-medium">${payment.principal.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Interest</p>
                            <p className="font-medium">${payment.interest.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-medium">${payment.total.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Balance</p>
                            <p className="font-medium">${payment.balance.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Risk Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-medium mb-2">AI Risk Score</h4>
                        <div className="text-3xl font-bold text-primary">{loanDetails.aiRiskScore}</div>
                        <Progress value={loanDetails.aiRiskScore} className="mt-2" />
                        <p className="text-sm text-muted-foreground mt-2">Low-Medium Risk</p>
                      </div>
                      
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <h4 className="font-medium mb-2">Success Prediction</h4>
                        <div className="text-3xl font-bold text-secondary">{loanDetails.successPrediction}%</div>
                        <Progress value={loanDetails.successPrediction} className="mt-2" />
                        <p className="text-sm text-muted-foreground mt-2">High Success Probability</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Risk Factors</h4>
                      <div className="space-y-3">
                        {riskFactors.map((risk, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {risk.status === "positive" && <CheckCircle className="h-4 w-4 text-green-500" />}
                              {risk.status === "neutral" && <Clock className="h-4 w-4 text-yellow-500" />}
                              {risk.status === "caution" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                              <div>
                                <p className="font-medium text-sm">{risk.factor}</p>
                                <p className="text-xs text-muted-foreground">{risk.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {doc.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Matching Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>AI Match Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold text-primary">{loanDetails.matchScore}%</div>
                <Progress value={loanDetails.matchScore} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Excellent compatibility between borrower and lender preferences
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Take Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => onNavigate("dashboard")}>
                  <PenTool className="h-4 w-4 mr-2" />
                  Sign Loan Agreement
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Terms
                </Button>
                <Button variant="outline" className="w-full">
                  Request Modifications
                </Button>
              </CardContent>
            </Card>

            {/* Blockchain Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Security & Transparency</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Blockchain verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">End-to-end encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">AFSL compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Smart contract enabled</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}