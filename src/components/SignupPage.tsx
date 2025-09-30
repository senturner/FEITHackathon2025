import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Users, 
  DollarSign, 
  Upload, 
  Shield, 
  Brain,
  CheckCircle,
  AlertCircle,
  Smartphone
} from "lucide-react";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [borrowerProgress, setBorrowerProgress] = useState(25);
  const [lenderProgress, setLenderProgress] = useState(25);
  const [userType, setUserType] = useState<"borrower" | "lender">("borrower");

  const businessTypes = [
    "Agriculture & Farming",
    "Retail & E-commerce",
    "Food & Hospitality",
    "Technology & Digital",
    "Manufacturing",
    "Services",
    "Arts & Creative",
    "Healthcare",
    "Education",
    "Other"
  ];

  const locations = [
    "NSW - Sydney Metro",
    "NSW - Regional",
    "VIC - Melbourne Metro", 
    "VIC - Regional",
    "QLD - Brisbane Metro",
    "QLD - Regional",
    "WA - Perth Metro",
    "WA - Regional",
    "SA - Adelaide Metro",
    "SA - Regional",
    "TAS - Hobart",
    "TAS - Regional",
    "NT - Darwin",
    "NT - Regional",
    "ACT - Canberra"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="container px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold">Join UnlockGrowth</h1>
          <p className="text-xl text-muted-foreground">
            Choose how you'd like to participate in our AI-powered lending community
          </p>
        </div>

        <Tabs value={userType} onValueChange={(value) => setUserType(value as "borrower" | "lender")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="borrower" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>I Need Capital</span>
            </TabsTrigger>
            <TabsTrigger value="lender" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>I Want to Invest</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="borrower" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Borrower Registration</span>
                  </CardTitle>
                  <Badge variant="secondary">Step 1 of 4</Badge>
                </div>
                <Progress value={borrowerProgress} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input id="mobile" type="tel" placeholder="+61 4XX XXX XXX" />
                      <p className="text-xs text-muted-foreground">
                        We'll use this for alternative credit assessment
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location.toLowerCase().replace(/\s+/g, '-')}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount Needed</Label>
                      <Input id="loanAmount" type="number" placeholder="50000" />
                      <p className="text-xs text-muted-foreground">
                        Amount in AUD
                      </p>
                    </div>
                  </div>

                  {/* Alternative Data Upload */}
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Brain className="h-12 w-12 mx-auto text-primary" />
                      <h3 className="font-semibold">Alternative Data Upload</h3>
                      <p className="text-sm text-muted-foreground">
                        Help our AI understand your financial behavior
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Card className="border-dashed border-2 border-muted-foreground/25">
                        <CardContent className="p-6 text-center space-y-4">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <div>
                            <p className="font-medium">Upload Transaction Screenshots</p>
                            <p className="text-xs text-muted-foreground">
                              Banking app screenshots (we'll anonymize data)
                            </p>
                          </div>
                          <Button variant="outline" className="w-full">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Choose Files
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed border-2 border-muted-foreground/25">
                        <CardContent className="p-6 text-center space-y-4">
                          <Users className="h-8 w-8 mx-auto text-muted-foreground" />
                          <div>
                            <p className="font-medium">Community Endorsements</p>
                            <p className="text-xs text-muted-foreground">
                              References from community leaders or customers
                            </p>
                          </div>
                          <Button variant="outline" className="w-full">
                            Add References
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex items-center space-x-2 p-4 bg-primary/5 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Your data is secure</p>
                        <p className="text-muted-foreground">
                          All uploads are encrypted and anonymized
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t">
                  <Button variant="outline" className="cursor-pointer" onClick={() => onNavigate("home")}>
                    Back to Home
                  </Button>
                  <Button onClick={() => setBorrowerProgress(50)}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lender" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span>Lender Registration</span>
                  </CardTitle>
                  <Badge variant="secondary">Step 1 of 3</Badge>
                </div>
                <Progress value={lenderProgress} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lenderFirstName">First Name</Label>
                        <Input id="lenderFirstName" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lenderLastName">Last Name</Label>
                        <Input id="lenderLastName" placeholder="Enter your last name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lenderEmail">Email Address</Label>
                      <Input id="lenderEmail" type="email" placeholder="your@email.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lenderMobile">Mobile Number</Label>
                      <Input id="lenderMobile" type="tel" placeholder="+61 4XX XXX XXX" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investmentCapacity">Investment Capacity</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your investment range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-25k">$5,000 - $25,000</SelectItem>
                          <SelectItem value="25k-100k">$25,000 - $100,000</SelectItem>
                          <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                          <SelectItem value="500k+">$500,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your risk preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative (Lower returns, safer)</SelectItem>
                          <SelectItem value="moderate">Moderate (Balanced risk/return)</SelectItem>
                          <SelectItem value="aggressive">Aggressive (Higher returns, higher risk)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sectorPreference">Preferred Sectors</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred business sectors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agriculture">Agriculture & Farming</SelectItem>
                          <SelectItem value="technology">Technology & Innovation</SelectItem>
                          <SelectItem value="retail">Retail & E-commerce</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="any">Any Sector</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Lender Benefits */}
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <DollarSign className="h-12 w-12 mx-auto text-primary" />
                      <h3 className="font-semibold">Lender Benefits</h3>
                      <p className="text-sm text-muted-foreground">
                        Join a community of impact investors
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Competitive Returns</p>
                          <p className="text-xs text-muted-foreground">
                            Earn 8-15% annual returns on your investments
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">AI-Powered Matching</p>
                          <p className="text-xs text-muted-foreground">
                            Get matched with borrowers that fit your criteria
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Social Impact</p>
                          <p className="text-xs text-muted-foreground">
                            Support underbanked Australian entrepreneurs
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Portfolio Diversification</p>
                          <p className="text-xs text-muted-foreground">
                            Spread risk across multiple loan types and sectors
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t">
                  <Button variant="outline" className="cursor-pointer" onClick={() => onNavigate("home")}>
                    Back to Home
                  </Button>
                  <Button onClick={() => setLenderProgress(66)}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Trust Indicators */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm">AFSL Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm">AI Privacy First</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}