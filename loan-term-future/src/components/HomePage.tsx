import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Brain,
  Users,
  Shield,
  TrendingUp,
  ArrowRight,
  Star,
  Globe,
  Smartphone,
  HandHeart
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// A reusable component for scroll-triggered animations
interface AnimatedSectionProps {
  children?: React.ReactNode; // FIX: children is now an optional prop
}

const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
      <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {children}
      </motion.div>
  );
};


export function HomePage({ onNavigate }: HomePageProps) {
  const howItWorksSteps = [
    {
      step: 1,
      title: "Quick Onboarding",
      description: "Simple sign-up with alternative data like mobile transactions",
      icon: Smartphone,
    },
    {
      step: 2,
      title: "AI Matching",
      description: "Our AI connects borrowers with compatible lenders",
      icon: Brain,
    },
    {
      step: 3,
      title: "Secure & Fund",
      description: "Transparent terms, e-signature, and quick funding",
      icon: Shield,
    },
    {
      step: 4,
      title: "Grow Together",
      description: "Flexible repayment and business growth support",
      icon: TrendingUp,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      business: "Chen's Local Market",
      location: "Rural Queensland",
      quote: "UnlockGrowth helped me expand my family grocery store when traditional banks said no. The AI matching found investors who understand rural businesses.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1721639287698-a62046043baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGZhcm0lMjBidXNpbmVzcyUyMEF1c3RyYWxpYXxlbnwxfHx8fDE3NTkxMTYyOTF8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Ahmad Hassan",
      business: "Hassan Electronics Repair",
      location: "Western Sydney",
      quote: "As a recent migrant, I had no credit history. UnlockGrowth's AI saw my mobile payment patterns and community endorsements. Now my tech repair shop is thriving.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1594392175486-b7537c50d60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBtb2JpbGUlMjBwaG9uZXxlbnwxfHx8fDE3NTkxMTYyOTR8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Emma Wilson",
      business: "Sustainable Crafts Co",
      location: "Tasmania",
      quote: "Starting my eco-friendly crafts business at 22 seemed impossible. UnlockGrowth's inclusive approach and young entrepreneur focus made my dream reality.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1672826980330-93ae1ac07b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwQXVzdHJhbGlhbiUyMGJ1c2luZXNzJTIwZW50cmVwcmVuZXVyc3xlbnwxfHx8fDE3NTkxMTYyODh8MA&ixlib-rb-4.1.0&q=80&w=1080"
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const MotionButton = motion(Button);

  return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32 overflow-hidden">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                  className="space-y-8"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              >
                <motion.div className="space-y-4" variants={fadeInUp}>
                  <Badge variant="secondary" className="w-fit">
                    <Brain className="h-3 w-3 mr-1" />
                    AI-Powered Lending
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    Unlock Your Business Growth with{" "}
                    <span className="text-primary">AI-Powered P2P Lending</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    No formal credit needed – get matched with lenders using your real data.
                    Supporting Indigenous businesses, migrants, rural SMEs, and young entrepreneurs across Australia.
                  </p>
                </motion.div>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                  <MotionButton
                      size="lg"
                      className="flex-1 sm:flex-none"
                      onClick={() => onNavigate("signup")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Sign Up as Borrower
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </MotionButton>
                  <MotionButton
                      variant="outline"
                      size="lg"
                      className="flex-1 sm:flex-none"
                      onClick={() => onNavigate("signup")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Become a Lender
                  </MotionButton>
                  <MotionButton
                      variant="outline"
                      size="lg"
                      className="flex-1 sm:flex-none"
                      onClick={() => onNavigate("chatbot")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Chatbot Demo
                  </MotionButton>
                </motion.div>

                <motion.div className="flex items-center space-x-6 pt-4" variants={fadeInUp}>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm">Bank-level Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm">Community Focused</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative z-10">
                  <ImageWithFallback
                      src="https://images.unsplash.com/photo-1758599543157-bc1a94fec33c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc2hha2UlMjBidXNpbmVzcyUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc1OTExNjI5N3ww&ixlib-rb-4.1.0&q=80&w=1080"
                      alt="Business partnership handshake"
                      className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container px-4">
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center space-y-4 mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold">How It Works</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Simple steps to connect borrowers and lenders using AI-powered matching
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorksSteps.map((step, index) => (
                    <motion.div key={step.step} variants={fadeInUp} className="h-full">
                      <Card className="relative overflow-hidden h-full transition-transform duration-300 hover:-translate-y-2">
                        <CardContent className="p-6 text-center space-y-4">
                          <div className="relative">
                            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                              <step.icon className="h-8 w-8 text-primary" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                          </div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </CardContent>
                        {index < howItWorksSteps.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                              <ArrowRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                        )}
                      </Card>
                    </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-24">
          <div className="container px-4">
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center space-y-4 mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold">Success Stories</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Real Australian entrepreneurs who unlocked their business growth
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div key={index} variants={fadeInUp} className="h-full">
                      <Card className="h-full transition-shadow duration-300 hover:shadow-xl">
                        <CardContent className="p-6 space-y-6">
                          <div className="flex space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <blockquote className="text-muted-foreground italic">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="flex items-center space-x-4 pt-4 border-t">
                            <ImageWithFallback
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-semibold">{testimonial.name}</div>
                              <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                              <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Trust & Security */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container px-4">
            <AnimatedSection>
              <div className="text-center space-y-8">
                <motion.div variants={fadeInUp}>
                  <h2 className="text-3xl lg:text-5xl font-bold">Built on Trust</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your data is secure, your privacy is protected, and your success is our mission
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <motion.div className="text-center space-y-4" variants={fadeInUp}>
                    <Shield className="h-12 w-12 mx-auto text-primary" />
                    <h3 className="font-semibold">Bank-Level Security</h3>
                    <p className="text-sm text-muted-foreground">
                      256-bit encryption and secure data handling
                    </p>
                  </motion.div>

                  <motion.div className="text-center space-y-4" variants={fadeInUp}>
                    <HandHeart className="h-12 w-12 mx-auto text-primary" />
                    <h3 className="font-semibold">Community First</h3>
                    <p className="text-sm text-muted-foreground">
                      Supporting underbanked Australian entrepreneurs
                    </p>
                  </motion.div>

                  <motion.div className="text-center space-y-4" variants={fadeInUp}>
                    <Globe className="h-12 w-12 mx-auto text-primary" />
                    <h3 className="font-semibold">SDG Aligned</h3>
                    <p className="text-sm text-muted-foreground">
                      Contributing to UN Sustainable Development Goals
                    </p>
                  </motion.div>
                </div>

                <motion.div className="pt-8" variants={fadeInUp}>
                  <MotionButton
                      size="lg"
                      onClick={() => onNavigate("signup")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Start Your Journey Today
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </MotionButton>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
  );
}