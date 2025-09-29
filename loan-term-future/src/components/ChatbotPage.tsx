import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
    Send,
    Bot,
    User,
    FileText,
    TrendingUp,
    HelpCircle,
    Sparkles,
    X,
    MessageSquare,
    Clock,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    suggestions?: string[];
}

interface ChatbotPageProps {
    onNavigate?: (page: string) => void;
}

export default function ChatbotPage({ onNavigate }: ChatbotPageProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm your UnlockGrowth AI assistant. I can help you understand lending documents, investment opportunities, and guide you through our platform. What would you like to know?",
            timestamp: new Date(),
            suggestions: [
                "Explain loan terms",
                "How does AI matching work?",
                "What documents do I need?",
                "Investment opportunities"
            ]
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const quickActions = [
        { icon: FileText, label: "Document Help", query: "Help me understand my loan documents" },
        { icon: TrendingUp, label: "Investment Info", query: "Tell me about investment opportunities" },
        { icon: HelpCircle, label: "Platform Guide", query: "How do I use UnlockGrowth?" },
        { icon: Sparkles, label: "AI Matching", query: "Explain how AI matching works" },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
        const lowerMessage = userMessage.toLowerCase();

        // Document-related queries
        if (lowerMessage.includes('document') || lowerMessage.includes('paperwork') || lowerMessage.includes('need')) {
            return {
                content: "For borrowers, you'll need:\n\n• Basic identification (driver's license or passport)\n• Business registration details\n• Recent mobile transaction history (last 3-6 months)\n• Optional: Community endorsements\n\nOur AI uses alternative data, so traditional credit history isn't required. We focus on your real business activity and payment patterns. Would you like help with a specific document?",
                suggestions: ["Upload receipt demo", "Community endorsements?", "Mobile transactions", "Next steps"]
            };
        }

        // AI matching queries
        if (lowerMessage.includes('ai') || lowerMessage.includes('matching') || lowerMessage.includes('algorithm')) {
            return {
                content: "Our AI matching system analyzes multiple data points:\n\n🧠 Alternative Data: Mobile payments, transaction patterns, business activity\n🤝 Community Signals: Endorsements and local business networks\n📊 Risk Assessment: Smart profiling without traditional credit scores\n🎯 Compatibility Matching: Connects you with lenders who understand your business type\n\nThe system is designed to be inclusive and fair, especially for Indigenous businesses, migrants, rural SMEs, and young entrepreneurs.",
                suggestions: ["How accurate is it?", "Privacy concerns?", "Success rates", "Get started"]
            };
        }

        // Investment/lender queries
        if (lowerMessage.includes('invest') || lowerMessage.includes('lender') || lowerMessage.includes('return')) {
            return {
                content: "As a lender on UnlockGrowth:\n\n💰 Expected Returns: 8-15% annual returns based on risk profile\n🛡️ Risk Management: Diversification tools and AI-powered risk assessment\n📈 Portfolio Options: Choose specific sectors, regions, or business types\n🤝 Impact Investment: Support underbanked communities while earning returns\n\nYou maintain control over your investment choices, with full transparency on borrower profiles and loan terms.",
                suggestions: ["Minimum investment?", "Risk levels", "Withdrawal terms", "Become a lender"]
            };
        }

        // Loan terms queries
        if (lowerMessage.includes('loan') || lowerMessage.includes('borrow') || lowerMessage.includes('terms') || lowerMessage.includes('interest')) {
            return {
                content: "Loan terms at UnlockGrowth:\n\n💵 Loan Amounts: $5,000 - $250,000\n⏱️ Repayment Period: 6-60 months flexible terms\n📊 Interest Rates: 7-18% (based on AI risk assessment, not credit scores)\n🔄 Repayment: Flexible schedules aligned with business cash flow\n✅ No Hidden Fees: Transparent pricing, no prepayment penalties\n\nRates are personalized based on your business data and payment patterns, not traditional credit history.",
                suggestions: ["Calculate my rate", "Repayment example", "Apply now", "Eligibility check"]
            };
        }

        // Platform usage queries
        if (lowerMessage.includes('how') || lowerMessage.includes('use') || lowerMessage.includes('start') || lowerMessage.includes('platform')) {
            return {
                content: "Getting started is easy:\n\n1️⃣ Sign Up: Quick registration with basic details\n2️⃣ Connect Data: Link mobile payments or upload transaction data\n3️⃣ AI Analysis: Our system assesses your profile (usually within 24 hours)\n4️⃣ Get Matched: Review compatible lenders and loan offers\n5️⃣ Secure Funding: E-sign documents and receive funds within 48 hours\n\nThe entire process typically takes 3-5 days from application to funding.",
                suggestions: ["Sign up now", "What data is needed?", "Timeline details", "Support options"]
            };
        }

        // Receipt/transaction queries
        if (lowerMessage.includes('receipt') || lowerMessage.includes('transaction') || lowerMessage.includes('upload')) {
            return {
                content: "Our Receipt Analysis Demo showcases how we use transaction data:\n\n📱 Upload receipts or transaction screenshots\n🤖 AI extracts patterns: spending, revenue, business activity\n📊 Builds alternative credit profile without traditional scores\n✅ Privacy-first: Data encrypted and used only for assessment\n\nThis innovative approach helps borrowers without formal credit history access funding based on real business activity.",
                suggestions: ["Try receipt demo", "Privacy policy", "Data security", "Other data sources"]
            };
        }

        // Eligibility queries
        if (lowerMessage.includes('eligible') || lowerMessage.includes('qualify') || lowerMessage.includes('requirements')) {
            return {
                content: "You may be eligible if you:\n\n✅ Have an active business (registered or operating)\n✅ Are 18+ years old and an Australian resident\n✅ Have regular business income or transactions\n✅ Can provide mobile payment or transaction history\n\nYou DON'T need:\n❌ Perfect credit score\n❌ Years of tax returns\n❌ Traditional banking relationships\n\nWe're specifically designed to support underbanked entrepreneurs, including Indigenous businesses, migrants, rural SMEs, and young business owners.",
                suggestions: ["Check eligibility", "Indigenous support", "Migrant assistance", "Apply now"]
            };
        }

        // Default response
        return {
            content: "I can help you with:\n\n📄 Understanding loan documents and terms\n💼 Investment opportunities and returns\n🤖 How our AI matching system works\n📱 Platform navigation and support\n🎯 Eligibility and application process\n\nWhat specific area would you like to explore?",
            suggestions: ["Loan terms", "AI matching", "Get started", "Investment info"]
        };
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputMessage,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const response = generateResponse(inputMessage);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.content,
                timestamp: new Date(),
                suggestions: response.suggestions,
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputMessage(suggestion);
        inputRef.current?.focus();
    };

    const handleQuickAction = (query: string) => {
        setInputMessage(query);
        setTimeout(() => handleSendMessage(), 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container px-4 py-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <Bot className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">AI Assistant</h1>
                                <p className="text-sm text-muted-foreground">Always here to help you</p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>Online</span>
                        </Badge>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {quickActions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="h-auto py-4 flex flex-col items-center space-y-2"
                                onClick={() => handleQuickAction(action.query)}
                            >
                                <action.icon className="h-5 w-5" />
                                <span className="text-xs text-center">{action.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Chat Container */}
                <Card className="shadow-xl">
                    <CardContent className="p-0">
                        {/* Messages Area */}
                        <div className="h-[500px] overflow-y-auto p-6 space-y-6">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            message.role === 'user' ? 'bg-primary' : 'bg-secondary'
                                        }`}>
                                            {message.role === 'user' ? (
                                                <User className="h-4 w-4 text-primary-foreground" />
                                            ) : (
                                                <Bot className="h-4 w-4 text-secondary-foreground" />
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <div className={`rounded-2xl px-4 py-3 ${
                                                message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                            }`}>
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                            <div className="flex items-center space-x-2 px-2">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                                            </div>
                                            {message.suggestions && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {message.suggestions.map((suggestion, idx) => (
                                                        <Button
                                                            key={idx}
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-xs h-7"
                                                            onClick={() => handleSuggestionClick(suggestion)}
                                                        >
                                                            {suggestion}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex space-x-3 max-w-[80%]">
                                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                            <Bot className="h-4 w-4 text-secondary-foreground" />
                                        </div>
                                        <div className="bg-muted rounded-2xl px-4 py-3">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t p-4">
                            <div className="flex space-x-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything about lending, investing, or our platform..."
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim() || isTyping}
                                    size="icon"
                                    className="h-10 w-10"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                                AI responses are informative but not financial advice. Always review terms carefully.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <Card>
                        <CardContent className="p-4 flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-sm mb-1">Need Human Help?</h3>
                                <p className="text-xs text-muted-foreground">Our support team is available Mon-Fri, 9am-6pm AEST</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 flex items-start space-x-3">
                            <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-sm mb-1">Document Library</h3>
                                <p className="text-xs text-muted-foreground">Access FAQs, guides, and legal documents anytime</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 flex items-start space-x-3">
                            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-sm mb-1">AI-Powered</h3>
                                <p className="text-xs text-muted-foreground">Trained on lending best practices and platform knowledge</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}