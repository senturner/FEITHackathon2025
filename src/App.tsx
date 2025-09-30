import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { SignupPage } from "./components/SignupPage";
import { DashboardPage } from "./components/DashboardPage";
import { MarketplacePage } from "./components/MarketplacePage";
import { LoanDetailsPage } from "./components/LoanDetailsPage";
import { ProfilePage } from "./components/ProfilePage";
import { BusinessDetailsPage } from "./components/BusinessDetailsPage";
import { RecurringUploadsPage } from "./components/RecurringUploadsPage";
import { BusinessProfilePage } from "./components/BusinessProfilePage";
import ReceiptDemoPage from "./components/ReceiptDemoPage";
import ChatbotPage from "./components/ChatbotPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Ensure page starts at top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top whenever currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigate} />;
      case "login":
        return <SignupPage onNavigate={handleNavigate} />;
      case "dashboard":
        return <DashboardPage onNavigate={handleNavigate} />;
      case "marketplace":
        return <MarketplacePage onNavigate={handleNavigate} />;
      case "loan-details":
        return <LoanDetailsPage onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "business-details":
        return <BusinessDetailsPage onNavigate={handleNavigate} />;
      case "recurring-uploads":
        return <RecurringUploadsPage onNavigate={handleNavigate} />;
      case "business-profile":
        return <BusinessProfilePage onNavigate={handleNavigate} />;
      case "how-it-works":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <HomePage onNavigate={handleNavigate} />;
      case "contact":
        return <HomePage onNavigate={handleNavigate} />;
      case "privacy":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "terms":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "receipt":
        return <ReceiptDemoPage onNavigate={handleNavigate} />;
      case "chatbot":
        return <ChatbotPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}