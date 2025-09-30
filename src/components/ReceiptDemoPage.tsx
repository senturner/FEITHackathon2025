import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
    Upload,
    FileText,
    CheckCircle,
    Brain,
    DollarSign,
    Calendar,
    Store,
    TrendingUp,
    ArrowLeft,
    Loader2,
    Download
} from "lucide-react";

interface ReceiptDemoProps {
    onNavigate: (page: string) => void;
}

interface ReceiptData {
    merchantName: string;
    date: string;
    totalAmount: number;
    category: string;
    paymentMethod: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    taxAmount?: number;
    currency: string;
    creditScore: {
        paymentConsistency: number;
        merchantDiversity: number;
        spendingPatterns: number;
        overallScore: number;
    };
}

export default function ReceiptDemoPage({ onNavigate }: ReceiptDemoProps) {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image (JPG, PNG, WEBP) or PDF file');
            return;
        }
        setUploadedFile(file);
        setReceiptData(null);
    };

    const simulateAIProcessing = () => {
        setIsProcessing(true);

        // Simulate AI processing delay
        setTimeout(() => {
            const mockData: ReceiptData = {
                merchantName: "Fresh Market Grocery",
                date: "2025-09-25",
                totalAmount: 127.45,
                category: "Groceries & Food",
                paymentMethod: "Mobile Payment",
                items: [
                    { name: "Fresh Vegetables", quantity: 1, price: 32.50 },
                    { name: "Dairy Products", quantity: 3, price: 24.90 },
                    { name: "Meat & Poultry", quantity: 2, price: 45.60 },
                    { name: "Household Items", quantity: 1, price: 18.75 },
                ],
                taxAmount: 5.70,
                currency: "AUD",
                creditScore: {
                    paymentConsistency: 85,
                    merchantDiversity: 78,
                    spendingPatterns: 82,
                    overallScore: 82,
                }
            };

            setReceiptData(mockData);
            setIsProcessing(false);
        }, 2500);
    };

    const downloadJSON = () => {
        if (!receiptData) return;

        const dataStr = JSON.stringify(receiptData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `receipt-data-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        return "Fair";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => onNavigate("business-profile")}
                        className="mb-4 cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Profile
                    </Button>

                    <div className="space-y-4">
                        <Badge variant="secondary" className="w-fit">
                            <Brain className="h-3 w-3 mr-1" />
                            AI-Powered Analysis
                        </Badge>
                        <h1 className="text-4xl lg:text-5xl font-bold">
                            Receipt Demo
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl">
                            Upload your receipts and let our AI extract financial data to help build your creditworthiness profile.
                            No traditional credit history needed.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Upload className="h-5 w-5 mr-2 text-primary" />
                                Upload Receipt
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div
                                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                                    dragActive
                                        ? "border-primary bg-primary/5"
                                        : "border-muted-foreground/25 hover:border-primary/50"
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept="image/*,.pdf"
                                    onChange={handleChange}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                    <div className="space-y-2">
                                        <p className="text-lg font-semibold">
                                            Drop your receipt here or click to browse
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Supports JPG, PNG, WEBP, and PDF files
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {uploadedFile && (
                                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <FileText className="h-8 w-8 text-primary" />
                                        <div>
                                            <p className="font-medium">{uploadedFile.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(uploadedFile.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                            )}

                            <Button
                                className="w-full"
                                size="lg"
                                disabled={!uploadedFile || isProcessing}
                                onClick={simulateAIProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Processing with AI...
                                    </>
                                ) : (
                                    <>
                                        <Brain className="h-4 w-4 mr-2" />
                                        Analyze Receipt
                                    </>
                                )}
                            </Button>

                            {/* How It Works */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="font-semibold">How It Works:</h3>
                                <div className="space-y-3 text-sm text-muted-foreground">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-primary">1</span>
                                        </div>
                                        <p>Upload receipt image or PDF</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-primary">2</span>
                                        </div>
                                        <p>AI extracts merchant, items, amounts, and payment data</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-primary">3</span>
                                        </div>
                                        <p>Generate creditworthiness metrics from spending patterns</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-primary">4</span>
                                        </div>
                                        <p>Download structured JSON for credit assessment</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {receiptData ? (
                            <>
                                {/* Receipt Details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        Receipt Details
                      </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={downloadJSON}
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                Download JSON
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Store className="h-4 w-4 mr-2" />
                                                    Merchant
                                                </div>
                                                <p className="font-semibold">{receiptData.merchantName}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    Date
                                                </div>
                                                <p className="font-semibold">{receiptData.date}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <DollarSign className="h-4 w-4 mr-2" />
                                                    Total Amount
                                                </div>
                                                <p className="font-semibold text-lg">
                                                    ${receiptData.totalAmount.toFixed(2)} {receiptData.currency}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <TrendingUp className="h-4 w-4 mr-2" />
                                                    Category
                                                </div>
                                                <Badge>{receiptData.category}</Badge>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h4 className="font-semibold mb-3">Items</h4>
                                            <div className="space-y-2">
                                                {receiptData.items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-between items-center text-sm"
                                                    >
                            <span className="text-muted-foreground">
                              {item.name} (×{item.quantity})
                            </span>
                                                        <span className="font-medium">
                              ${item.price.toFixed(2)}
                            </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {receiptData.taxAmount && (
                                            <div className="flex justify-between items-center text-sm border-t pt-2">
                                                <span className="text-muted-foreground">Tax</span>
                                                <span className="font-medium">
                          ${receiptData.taxAmount.toFixed(2)}
                        </span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Credit Score Analysis */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Brain className="h-5 w-5 mr-2 text-primary" />
                                            Creditworthiness Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="text-center p-6 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Overall Credit Score
                                            </p>
                                            <p className={`text-5xl font-bold ${getScoreColor(receiptData.creditScore.overallScore)}`}>
                                                {receiptData.creditScore.overallScore}
                                            </p>
                                            <p className="text-sm font-semibold mt-2">
                                                {getScoreLabel(receiptData.creditScore.overallScore)}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { label: "Payment Consistency", value: receiptData.creditScore.paymentConsistency },
                                                { label: "Merchant Diversity", value: receiptData.creditScore.merchantDiversity },
                                                { label: "Spending Patterns", value: receiptData.creditScore.spendingPatterns },
                                            ].map((metric) => (
                                                <div key={metric.label} className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">{metric.label}</span>
                                                        <span className={`font-semibold ${getScoreColor(metric.value)}`}>
                              {metric.value}/100
                            </span>
                                                    </div>
                                                    <div className="w-full bg-muted rounded-full h-2">
                                                        <div
                                                            className="bg-primary rounded-full h-2 transition-all"
                                                            style={{ width: `${metric.value}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                                            <p className="text-sm text-muted-foreground">
                                                This analysis is based on your spending patterns, payment methods,
                                                and transaction history. Upload more receipts to improve accuracy.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Card className="h-full flex items-center justify-center">
                                <CardContent className="text-center py-16">
                                    <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Receipt Analyzed Yet
                                    </h3>
                                    <p className="text-muted-foreground max-w-sm mx-auto">
                                        Upload a receipt and click "Analyze Receipt" to see AI-powered
                                        financial data extraction and credit analysis
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <Card className="mt-8 border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Brain className="h-5 w-5 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">Why Receipt Analysis Matters</h3>
                                <p className="text-sm text-muted-foreground">
                                    For entrepreneurs without traditional credit history, receipt data provides valuable
                                    insights into business operations, spending patterns, and financial responsibility.
                                    Our AI analyzes payment consistency, merchant diversity, and spending behaviors to
                                    create an alternative creditworthiness profile that traditional banks often miss.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}