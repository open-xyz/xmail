import React, { useState, useEffect } from 'react';
import { 
  Terminal, Zap, Brain, Code, GitBranch, Sparkles, 
  ArrowRight, Play, Check, Star, Users, Rocket,
  Shield, Clock, Search, Filter, MessageSquare, Lock,
  Eye, Database, Server
} from 'lucide-react';
import EmailAnimation from './EmailAnimation';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, text: "Zero-Knowledge Privacy", color: "from-emerald-500 to-teal-600" },
    { icon: Zap, text: "Military-Grade Speed", color: "from-amber-500 to-orange-600" },
    { icon: Brain, text: "Local AI Processing", color: "from-violet-500 to-purple-600" },
    { icon: Lock, text: "End-to-End Encrypted", color: "from-red-500 to-rose-600" }
  ];

  const stats = [
    { value: "0ms", label: "Data Tracking", icon: Eye },
    { value: "256-bit", label: "Encryption", icon: Lock },
    { value: "100%", label: "Local Storage", icon: Database },
    { value: "∞", label: "Privacy Guarantee", icon: Shield }
  ];

  const testimonials = [
    {
      text: "Finally, an email client that respects my privacy. No tracking, no data mining.",
      author: "Alex Chen",
      role: "Security Engineer @ Signal",
      avatar: "AC"
    },
    {
      text: "The fastest, most secure email experience I've ever had. Pure engineering excellence.",
      author: "Morgan Rivera",
      role: "Principal Engineer @ ProtonMail",
      avatar: "MR"
    },
    {
      text: "Built like a fortress. Every developer who values privacy needs this.",
      author: "Sam Kim",
      role: "CTO @ Brave",
      avatar: "SK"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative">
      {/* Subtle Dark Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Subtle Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-gray-800/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <Terminal className="w-6 h-6 text-black" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">
              xmail.sh
            </span>
            <div className="text-xs text-gray-500 font-mono">secure • private • fast</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#security" className="text-gray-400 hover:text-white transition-colors">Security</a>
          <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
          <button
            onClick={onEnterApp}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-black"
          >
            Secure Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative z-10 px-6 py-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Security Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 mb-8">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Zero-Knowledge Architecture</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Email that
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              protects you
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The most secure email client ever built. Zero tracking, local AI processing, 
            and military-grade encryption. Your data stays yours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={onEnterApp}
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 text-black"
            >
              <Shield className="w-5 h-5" />
              <span>Enter Secure Mode</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-2">
              <GitBranch className="w-5 h-5" />
              <span>View Source Code</span>
              <Lock className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
            </button>
          </div>

          {/* Rotating Features */}
          <div className="flex items-center justify-center space-x-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-2 transition-all duration-500 ${
                    currentFeature === index 
                      ? 'opacity-100 scale-110' 
                      : 'opacity-50 scale-100'
                  }`}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Email Client Animation Demo */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Experience the difference
            </h2>
            <p className="text-lg text-gray-400">
              See how our email client makes communication effortless and secure
            </p>
          </div>
          <EmailAnimation />
        </div>
      </div>

      {/* Privacy Stats */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Built like a
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> digital fortress</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Every line of code designed for maximum security, privacy, and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Zero-Knowledge Architecture",
                description: "Your emails are encrypted before they leave your device. We can't read them even if we wanted to.",
                color: "from-emerald-500 to-teal-600"
              },
              {
                icon: Brain,
                title: "Local AI Processing",
                description: "All AI analysis happens on your device. No data sent to external servers. Complete privacy.",
                color: "from-violet-500 to-purple-600"
              },
              {
                icon: Lock,
                title: "Military-Grade Encryption",
                description: "AES-256 encryption with perfect forward secrecy. Same standards used by intelligence agencies.",
                color: "from-red-500 to-rose-600"
              },
              {
                icon: Eye,
                title: "Zero Tracking",
                description: "No analytics, no telemetry, no tracking pixels. Your behavior stays completely private.",
                color: "from-gray-500 to-slate-600"
              },
              {
                icon: Server,
                title: "Decentralized Storage",
                description: "Your emails live on your devices, not our servers. True data sovereignty.",
                color: "from-blue-500 to-indigo-600"
              },
              {
                icon: Code,
                title: "Open Source Transparency",
                description: "Every line of code is public. Audited by security researchers worldwide.",
                color: "from-amber-500 to-orange-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Trusted by security experts</h2>
            <p className="text-xl text-gray-400">The people who build secure systems choose xmail.sh</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-black">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Your privacy is not negotiable
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join the secure email revolution. No tracking, no data mining, no compromises.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={onEnterApp}
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 text-black"
              >
                <Lock className="w-5 h-5" />
                <span>Enter Secure Mode</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>100% Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Terminal className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-bold text-white">
                xmail.sh
              </span>
              <span className="text-xs text-gray-500">Secure by design</span>
            </div>
            
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Security Audit</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Source Code</a>
              <a href="#" className="hover:text-white transition-colors">Bug Bounty</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800/50 text-center text-gray-500">
            <p>&copy; 2024 xmail.sh. Built for privacy, designed for security.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;