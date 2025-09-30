import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import {
  Search,
  Filter,
  MapPin,
  TrendingUp,
  Shield,
  MessageCircle,
  DollarSign,
  Calendar,
  Target,
  Users,
  Brain,
  ChevronRight,
  Star,
  Zap
} from "lucide-react";

interface MarketplacePageProps {
  onNavigate: (page: string) => void;
}

// Small reusable animated wrapper that triggers when in view
interface AnimatedSectionProps {
  children?: React.ReactNode;
}

const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  return (
      <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
      >
        {children}
      </motion.div>
  );
};

export function MarketplacePage({ onNavigate }: MarketplacePageProps) {
  const [userType, setUserType] = useState<"borrower" | "lender">("borrower");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");

  // Mock data for borrower view (potential lenders)
  const potentialLenders = [
    {
      id: "L001",
      name: "Rural Business Investor",
      type: "Individual",
      location: "Queensland",
      specialization: "Agriculture & Rural SMEs",
      averageRate: "12-15%",
      investmentRange: "$10K - $50K",
      totalLoans: 23,
      successRate: 92,
      rating: 4.8,
      preferences: ["Seasonal Repayment", "Community Focus"],
      riskProfile: "Conservative",
      matchScore: 95
    },
    {
      id: "L002",
      name: "Tech Innovation Fund",
      type: "Fund",
      location: "NSW",
      specialization: "Technology & Innovation",
      averageRate: "10-14%",
      investmentRange: "$25K - $100K",
      totalLoans: 45,
      successRate: 88,
      rating: 4.6,
      preferences: ["Growth Potential", "Young Entrepreneurs"],
      riskProfile: "Moderate",
      matchScore: 87
    },
    {
      id: "L003",
      name: "Community Impact Investor",
      type: "Individual",
      location: "Victoria",
      specialization: "Indigenous & Migrant Businesses",
      averageRate: "13-17%",
      investmentRange: "$5K - $30K",
      totalLoans: 31,
      successRate: 94,
      rating: 4.9,
      preferences: ["Social Impact", "Community Endorsements"],
      riskProfile: "Moderate",
      matchScore: 91
    }
  ];

  // Mock data for lender view (borrower profiles)
  const borrowerProfiles = [
    {
      id: "B001",
      businessName: "Chen's Organic Farm",
      owner: "Sarah Chen",
      location: "Rural Queensland",
      sector: "Agriculture",
      requestAmount: 35000,
      purpose: "Equipment & Irrigation",
      interestRate: "14.5%",
      term: 18,
      aiRiskScore: 78,
      riskLevel: "Medium",
      creditProfile: "Alternative Data Strong",
      businessAge: "5 years",
      revenue: "$120K annually",
      community: "Strong local endorsements",
      matchScore: 93,
      highlights: ["Sustainable farming", "Export contracts", "Community supported"]
    },
    {
      id: "B002",
      businessName: "Hassan Tech Repairs",
      owner: "Ahmad Hassan",
      location: "Western Sydney",
      sector: "Technology",
      requestAmount: 18000,
      purpose: "Inventory & Equipment",
      interestRate: "13.2%",
      term: 24,
      aiRiskScore: 82,
      riskLevel: "Low",
      creditProfile: "Strong mobile data",
      businessAge: "2 years",
      revenue: "$85K annually",
      community: "High customer satisfaction",
      matchScore: 89,
      highlights: ["Growing customer base", "Specialized skills", "Strong payment history"]
    },
    {
      id: "B003",
      businessName: "Wilson Sustainable Crafts",
      owner: "Emma Wilson",
      location: "Tasmania",
      sector: "Creative & Arts",
      requestAmount: 12000,
      purpose: "Marketing & Online Platform",
      interestRate: "15.8%",
      term: 12,
      aiRiskScore: 74,
      riskLevel: "Medium",
      creditProfile: "Young entrepreneur",
      businessAge: "1 year",
      revenue: "$45K annually",
      community: "Environmental advocates",
      matchScore: 85,
      highlights: ["Eco-friendly products", "Online growth", "Award winner"]
    }
  ];

  const sectors = [
    "Agriculture & Farming",
    "Technology & Digital",
    "Retail & E-commerce",
    "Food & Hospitality",
    "Creative & Arts",
    "Professional Services",
    "Manufacturing",
    "Healthcare"
  ];

  const locations = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const MotionButton = motion(Button);
  const MotionCard = motion(Card);

  return (
      <div className="min-h-screen bg-muted/30">
        <div className="container px-4 py-8">
          {/* Header */}
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold">Loan Marketplace</h1>
                <p className="text-muted-foreground">AI-powered matching for borrowers and lenders</p>
              </div>

              <Tabs value={userType} onValueChange={(value) => setUserType(value as "borrower" | "lender")}>
                <TabsList>
                  <TabsTrigger value="borrower">Find Lenders</TabsTrigger>
                  <TabsTrigger value="lender">Find Borrowers</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </AnimatedSection>

          {/* Search and Filters */}
          <AnimatedSection>
            <motion.div variants={fadeInUp}>
              <MotionCard className="mb-6" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 120 }}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder={userType === "borrower" ? "Search lenders..." : "Search borrowers..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="lg:w-48">
                      <Label htmlFor="sector">Sector</Label>
                      <Select value={filterSector} onValueChange={setFilterSector}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Sectors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sectors</SelectItem>
                          {sectors.map((sector) => (
                              <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, '-')}>
                                {sector}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="lg:w-32">
                      <Label htmlFor="location">Location</Label>
                      <Select value={filterLocation} onValueChange={setFilterLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All States</SelectItem>
                          {locations.map((location) => (
                              <SelectItem key={location} value={location.toLowerCase()}>
                                {location}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
          </AnimatedSection>

          <Tabs value={userType} className="space-y-6">
            <TabsContent value="borrower" className="space-y-6">
              {/* AI Matching Results */}
              <AnimatedSection>
                <motion.div variants={fadeInUp} className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">AI-Matched Lenders</h2>
                    <Badge variant="secondary">{potentialLenders.length} matches</Badge>
                  </div>
                  <MotionButton variant="outline" size="sm" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </MotionButton>
                </motion.div>

                <motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="visible" className="grid lg:grid-cols-1 gap-6">
                  {potentialLenders.map((lender) => (
                      <motion.div key={lender.id} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 120 }}>
                        <MotionCard className="hover:shadow-lg transition-shadow" layout>
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                      {lender.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold">{lender.name}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                      <span>{lender.type}</span>
                                      <div className="flex items-center space-x-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{lender.location}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span>{lender.rating}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Specialization</p>
                                    <p className="font-medium text-sm">{lender.specialization}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                                    <p className="font-medium text-sm">{lender.averageRate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Investment Range</p>
                                    <p className="font-medium text-sm">{lender.investmentRange}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Success Rate</p>
                                    <p className="font-medium text-sm">{lender.successRate}%</p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                  {lender.preferences.map((pref) => (
                                      <Badge key={pref} variant="outline" className="text-xs">
                                        {pref}
                                      </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="lg:w-64 space-y-4">
                                <div className="text-center p-4 bg-primary/5 rounded-lg">
                                  <div className="flex items-center justify-center space-x-2 mb-2">
                                    <Zap className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">AI Match Score</span>
                                  </div>
                                  <div className="text-2xl font-bold text-primary">{lender.matchScore}%</div>
                                  <Progress value={lender.matchScore} className="mt-2" />
                                </div>

                                <div className="flex space-x-2">
                                  <MotionButton variant="outline" size="sm" className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Chat
                                  </MotionButton>
                                  <MotionButton size="sm" className="flex-1 cursor-pointer" onClick={() => onNavigate("loan-details")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                                    Connect
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                  </MotionButton>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </MotionCard>
                      </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="lender" className="space-y-6">
              {/* AI Matching Results for Lenders */}
              <AnimatedSection>
                <motion.div variants={fadeInUp} className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">AI-Matched Borrowers</h2>
                    <Badge variant="secondary">{borrowerProfiles.length} opportunities</Badge>
                  </div>
                  <MotionButton variant="outline" size="sm" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </MotionButton>
                </motion.div>

                <motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="visible" className="grid lg:grid-cols-1 gap-6">
                  {borrowerProfiles.map((borrower) => (
                      <motion.div key={borrower.id} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 120 }}>
                        <MotionCard className="hover:shadow-lg transition-shadow" layout>
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                                      {borrower.owner.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold">{borrower.businessName}</h3>
                                    <p className="text-sm text-muted-foreground">Owner: {borrower.owner}</p>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                      <div className="flex items-center space-x-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{borrower.location}</span>
                                      </div>
                                      <span>{borrower.sector}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                                    <p className="font-medium">${borrower.requestAmount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Purpose</p>
                                    <p className="font-medium text-sm">{borrower.purpose}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                                    <p className="font-medium text-green-600">{borrower.interestRate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Term</p>
                                    <p className="font-medium">{borrower.term} months</p>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Business Age</p>
                                    <p className="font-medium">{borrower.businessAge}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Annual Revenue</p>
                                    <p className="font-medium">{borrower.revenue}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Community Support</p>
                                    <p className="font-medium">{borrower.community}</p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                  {borrower.highlights.map((highlight) => (
                                      <Badge key={highlight} variant="outline" className="text-xs">
                                        {highlight}
                                      </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="lg:w-64 space-y-4">
                                <div className="text-center p-4 bg-secondary/5 rounded-lg">
                                  <div className="flex items-center justify-center space-x-2 mb-2">
                                    <Target className="h-4 w-4 text-secondary" />
                                    <span className="text-sm font-medium">AI Risk Score</span>
                                  </div>
                                  <div className="text-2xl font-bold text-secondary">{borrower.aiRiskScore}</div>
                                  <Badge
                                      variant={borrower.riskLevel === "Low" ? "secondary" : "outline"}
                                      className="mt-2"
                                  >
                                    {borrower.riskLevel} Risk
                                  </Badge>
                                </div>

                                <div className="text-center p-4 bg-primary/5 rounded-lg">
                                  <div className="flex items-center justify-center space-x-2 mb-2">
                                    <Zap className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium">Match Score</span>
                                  </div>
                                  <div className="text-2xl font-bold text-primary">{borrower.matchScore}%</div>
                                  <Progress value={borrower.matchScore} className="mt-2" />
                                </div>

                                <div className="flex space-x-2">
                                  <MotionButton variant="outline" size="sm" className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Message
                                  </MotionButton>
                                  <MotionButton size="sm" className="flex-1 cursor-pointer" onClick={() => onNavigate("loan-details")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                                    Invest
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                  </MotionButton>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </MotionCard>
                      </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>
            </TabsContent>
          </Tabs>

          {/* AI Insights */}
          <AnimatedSection>
            <motion.div variants={fadeInUp}>
              <MotionCard className="mt-8" whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 120 }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>AI Market Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <motion.div variants={fadeInUp} className="p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <h4 className="font-medium text-sm">Market Trend</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {userType === "borrower"
                            ? "Interest rates for your sector are 2% below average this month"
                            : "Agriculture sector showing 15% higher returns than expected"
                        }
                      </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="p-4 bg-secondary/5 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <h4 className="font-medium text-sm">Activity Update</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {userType === "borrower"
                            ? "23 new lenders joined this week focusing on rural businesses"
                            : "48 new loan applications this week, 85% from underbanked entrepreneurs"
                        }
                      </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="p-4 bg-accent/5 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-accent-foreground" />
                        <h4 className="font-medium text-sm">Success Rate</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        92% of matched loans on our platform have successful outcomes
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
  );
}