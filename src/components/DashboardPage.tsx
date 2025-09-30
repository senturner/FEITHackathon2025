import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Bell,
  Plus,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Lightbulb,
  Shield
} from "lucide-react";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [userType, setUserType] = useState<"borrower" | "lender">("borrower");

  // Mock data for borrower
  const borrowerData = {
    creditScore: 720,
    activeLoans: [
      {
        id: "L001",
        amount: 45000,
        purpose: "Equipment Purchase",
        interestRate: 12.5,
        term: 24,
        monthlyPayment: 2150,
        remainingBalance: 38500,
        nextPayment: "2024-10-15",
        status: "Active"
      }
    ],
    loanRequests: [
      {
        id: "R001",
        amount: 25000,
        purpose: "Inventory Expansion",
        status: "Under Review",
        matches: 3,
        avgInterestRate: 14.2
      }
    ],
    repaymentHistory: [
      { month: "Aug", paid: 2150, due: 2150 },
      { month: "Sep", paid: 2150, due: 2150 },
      { month: "Oct", paid: 0, due: 2150 },
    ]
  };

  // Mock data for lender
  const lenderData = {
    totalInvested: 125000,
    totalEarnings: 15750,
    activeLoans: 8,
    averageReturn: 13.2,
    portfolio: [
      {
        id: "P001",
        borrower: "Sarah's Market",
        amount: 25000,
        interestRate: 14.5,
        term: 18,
        risk: "Medium",
        sector: "Retail",
        monthlyReturn: 385
      },
      {
        id: "P002", 
        borrower: "Tech Repairs Co",
        amount: 15000,
        interestRate: 12.8,
        term: 24,
        risk: "Low",
        sector: "Technology",
        monthlyReturn: 224
      },
      {
        id: "P003",
        borrower: "Craft Studio",
        amount: 8000,
        interestRate: 15.2,
        term: 12,
        risk: "Medium",
        sector: "Creative",
        monthlyReturn: 145
      }
    ],
    monthlyEarnings: [
      { month: "Jun", earnings: 1245 },
      { month: "Jul", earnings: 1380 },
      { month: "Aug", earnings: 1425 },
      { month: "Sep", earnings: 1520 },
    ]
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "borrower" | "lender")}>
              <TabsList>
                <TabsTrigger value="borrower">Borrower View</TabsTrigger>
                <TabsTrigger value="lender">Lender View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Tabs value={userType} className="space-y-6">
          <TabsContent value="borrower" className="space-y-6">
            {/* Borrower Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Credit Score</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{borrowerData.creditScore}</div>
                  <p className="text-xs text-muted-foreground">
                    +25 points this month
                  </p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{borrowerData.activeLoans.length}</div>
                  <p className="text-xs text-muted-foreground">
                    $38,500 remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Loan Requests</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{borrowerData.loanRequests.length}</div>
                  <p className="text-xs text-muted-foreground">
                    3 potential matches
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,150</div>
                  <p className="text-xs text-muted-foreground">
                    Due Oct 15, 2024
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Active Loans */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Loans</span>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => onNavigate("marketplace")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Request New Loan
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {borrowerData.activeLoans.map((loan) => (
                    <div key={loan.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{loan.purpose}</p>
                          <p className="text-sm text-muted-foreground">Loan ID: {loan.id}</p>
                        </div>
                        <Badge variant="secondary">{loan.status}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Original Amount</p>
                          <p className="font-medium">${loan.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p className="font-medium">${loan.remainingBalance.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Interest Rate</p>
                          <p className="font-medium">{loan.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly Payment</p>
                          <p className="font-medium">${loan.monthlyPayment.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <Progress 
                        value={((loan.amount - loan.remainingBalance) / loan.amount) * 100} 
                        className="w-full"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Loan Requests */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Loan Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {borrowerData.loanRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{request.purpose}</p>
                          <p className="text-sm text-muted-foreground">Request ID: {request.id}</p>
                        </div>
                        <Badge>{request.status}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Requested Amount</p>
                          <p className="font-medium">${request.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Potential Matches</p>
                          <p className="font-medium">{request.matches} lenders</p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => onNavigate("marketplace")}
                      >
                        View Matches
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>AI Insights & Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Credit Score Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload your latest transaction data to potentially improve your AI credit score by 15-30 points.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Repayment Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider making bi-weekly payments to reduce interest and pay off loans faster.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lender" className="space-y-6">
            {/* Lender Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${lenderData.totalInvested.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    +8.2% this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${lenderData.totalEarnings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {lenderData.averageReturn}% avg return
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lenderData.activeLoans}</div>
                  <p className="text-xs text-muted-foreground">
                    Across 5 sectors
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,520</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    +6.7% vs last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Portfolio Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Portfolio</span>
                    <Button size="sm" onClick={() => onNavigate("marketplace")}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Investment
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lenderData.portfolio.map((investment) => (
                    <div key={investment.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{investment.borrower}</p>
                          <p className="text-sm text-muted-foreground">{investment.sector}</p>
                        </div>
                        <Badge variant={investment.risk === "Low" ? "secondary" : "outline"}>
                          {investment.risk} Risk
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Investment</p>
                          <p className="font-medium">${investment.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Interest Rate</p>
                          <p className="font-medium">{investment.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Term</p>
                          <p className="font-medium">{investment.term} months</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Monthly Return</p>
                          <p className="font-medium text-green-600">${investment.monthlyReturn}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Risk Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Risk Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Portfolio Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Low Risk</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Medium Risk</span>
                        <span className="text-sm font-medium">55%</span>
                      </div>
                      <Progress value={55} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">High Risk</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Sector Allocation</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-primary/5 rounded text-center">
                        <p className="font-medium">Retail</p>
                        <p className="text-muted-foreground">40%</p>
                      </div>
                      <div className="p-2 bg-secondary/5 rounded text-center">
                        <p className="font-medium">Tech</p>
                        <p className="text-muted-foreground">30%</p>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <p className="font-medium">Creative</p>
                        <p className="text-muted-foreground">20%</p>
                      </div>
                      <div className="p-2 bg-accent rounded text-center">
                        <p className="font-medium">Other</p>
                        <p className="text-muted-foreground">10%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Investment Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>AI Investment Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Diversification Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider investing in agriculture sector to improve portfolio balance. 3 new opportunities available.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => onNavigate("marketplace")}>
                      View Opportunities
                    </Button>
                  </div>
                  <div className="p-4 bg-secondary/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">High-Return Alert</h4>
                    <p className="text-sm text-muted-foreground">
                      Indigenous-owned tech startup seeking $15K at 16.5% return. Strong community endorsements.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => onNavigate("marketplace")}>
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}