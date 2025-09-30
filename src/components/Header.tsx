import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Brain } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({
  currentPage,
  onNavigate,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Treat legacy pages as "Business Profile" so the tab still highlights correctly
  const isBusinessProfileActive =
    currentPage === "business-profile" ||
    currentPage === "business-details" ||
    currentPage === "recurring-uploads";

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Dashboard", value: "dashboard" },
    { label: "Loan Marketplace", value: "marketplace" },
    {
      label: "Business Profile",
      value: "business-profile",
      active: isBusinessProfileActive,
    },
  ];

  const handleNavigate = (value: string) => {
    // Single source of truth now: business-profile
    if (
      value === "business-details" ||
      value === "recurring-uploads"
    ) {
      onNavigate("business-profile");
      return;
    }
    onNavigate(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="font-semibold text-xl">
            UnlockGrowth Loans
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const active =
              typeof item.active === "boolean"
                ? item.active
                : currentPage === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleNavigate(item.value)}
                className={`text-sm transition-colors hover:text-primary ${
                  active
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("login")}
          >
            Log In
          </Button>
          <Button onClick={() => onNavigate("signup")}>
            Get Started
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px]"
          >
            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => {
                const active =
                  typeof item.active === "boolean"
                    ? item.active
                    : currentPage === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      handleNavigate(item.value);
                      setIsOpen(false);
                    }}
                    className={`text-left py-2 px-4 rounded-md transition-colors ${
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate("login");
                    setIsOpen(false);
                  }}
                >
                  Log In
                </Button>
                <Button
                  className="w-full justify-start mt-2"
                  onClick={() => {
                    onNavigate("signup");
                    setIsOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}