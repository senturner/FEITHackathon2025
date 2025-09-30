import { Brain, Shield, Globe, Users } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">UnlockGrowth Loans</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered P2P lending for underbanked Australian entrepreneurs
            </p>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Privacy & Security First</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium">Platform</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate("signup")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Sign Up as Borrower
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Become a Lender
              </button>
              <button
                onClick={() => onNavigate("dashboard")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate("marketplace")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Loan Marketplace
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-medium">Support</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate("about")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Contact
              </button>
              <button
                onClick={() => onNavigate("privacy")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate("terms")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* SDG Alignment */}
          <div className="space-y-4">
            <h3 className="font-medium">Impact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">UN SDG 8: Economic Growth</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Supporting Inclusive Finance</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                <Globe className="h-3 w-3 mr-1" />
                SDG Aligned
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 UnlockGrowth Loans. Made for Australian entrepreneurs.
          </p>
        </div>
      </div>
    </footer>
  );
}