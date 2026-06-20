import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Confetti from 'react-confetti';
import { useWindowSize } from './hooks/useWindowSize';
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingHearts } from './components/FloatingHearts';
import { Typewriter } from './components/Typewriter';
import { Fireworks } from './components/Fireworks';
import {
  Heart,
  ChevronRight,
  Sparkles,
  Flame,
  Gift,
  UserCheck,
  ShieldAlert,
  Smile,
  Compass,
  Star,
  BookOpen
} from 'lucide-react';

// GOOGLE_FORM_URL configuration field. Easily replace this URL.
const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || "https://forms.gle/wYUMS3aNNth6wZna6";

// Relationship test options
const RELATIONSHIP_OPTIONS = [
  "love",
  "Mother",
  "Father",
  "Sister",
  "Brother",
  "Friend",
  "Best Friend",
  "Boy friend",
  "Iove at first sight",
  "Classmate",
  "Neighbour"
];

// Birthday Wish Cards
const WISH_CARDS = [
  {
    id: "Happiness",
    title: "Happiness",
    wish: "May your heart always be filled with joy, laughter, and beautiful moments that make you smile every single day. You deserve the truest happiness."
  },
  {
    id: "Success",
    title: "Success",
    wish: "May you reach new heights, conquer your goals, and find fulfillment in everything you pursue. DTR believes in your potential!"
  },
  {
    id: "Health",
    title: "Health",
    wish: "Wishing you robust health, peace of mind, and endless energy to enjoy all the wonderful adventures that lie ahead of you."
  },
  {
    id: "Dreams",
    title: "Dreams",
    wish: "May all the dreams you hold close to your heart take flight and turn into beautiful realities. Never stop dreaming big!"
  }
];

// Friendship Traits
const FRIENDSHIP_TRAITS = [
  {
    id: 1,
    title: "Loyalty & Reliability",
    short: "Always there for you, no matter what.",
    detail: "A best friend is someone you can count on, who is always there for you when they say they will be. They protect your back and represent safety, standing by you irrespective of conditions."
  },
  {
    id: 2,
    title: "Honesty & Authenticity",
    short: "Truth with love, and absolute authenticity.",
    detail: "They tell you the truth, even when it's hard to hear, but always out of love. You can be your raw, unfiltered self around them without fear of judgement or rejection."
  },
  {
    id: 3,
    title: "Empathy & Understanding",
    short: "Feeling what you feel, even in silence.",
    detail: "They don't just hear your words; they feel what you're going through. They listen deeply and understand your silence just as well as your chatter."
  },
  {
    id: 4,
    title: "Support Through Hard Times",
    short: "Standing together when the world turns away.",
    detail: "When things get tough, they stand firmly by your side. They lift you up in failures, comfort you when you are down, and help you celebrate your successes."
  },
  {
    id: 5,
    title: "Encouragement & Growth",
    short: "Inspiring you to become your best self.",
    detail: "They believe in your potential, inspire you to chase your dreams, and celebrate your growth. The bond transforms from honesty into emotional safety and personal growth."
  },
  {
    id: 6,
    title: "Unconditional Acceptance",
    short: "Loving you exactly as you are.",
    detail: "They know all your flaws, mistakes, and quirks, yet they choose to love and accept you completely. There is no need to wear a mask or pretend around them."
  },
  {
    id: 7,
    title: "Mutual Investment",
    short: "A shared, sibling-like connection.",
    detail: "A best friend is someone with whom you share a sibling-like connection. Both of you invest trust, secrets, feelings, time, and care to keep the bond strong."
  }
];

export default function App() {
  const { width, height } = useWindowSize();

  // App State
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  
  // validation errors
  const [nameError, setNameError] = useState('');
  
  // Step 3 Prank state
  const [showPrankPopup, setShowPrankPopup] = useState(false);
  
  // Step 4 Relationship state
  const [shakingOption, setShakingOption] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isBestFriendSelected, setIsBestFriendSelected] = useState(false);
  
  // Step 7 Envelope state
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  
  // Step 8 Wish cards state
  const [openedWishes, setOpenedWishes] = useState<string[]>([]);
  
  // Step 11 Friendship traits state
  const [expandedTrait, setExpandedTrait] = useState<number | null>(null);
  
  // Step 14 Final decision state
  const [finalDecision, setFinalDecision] = useState<boolean | null>(null);

  // Step 14 Google Form states
  const [formOpened, setFormOpened] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Auto-progress prank popup on Step 3
  useEffect(() => {
    if (showPrankPopup) {
      const timer = setTimeout(() => {
        setShowPrankPopup(false);
        setStep(4);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPrankPopup]);

  // Handle Confetti burst
  const triggerBurst = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Navigations
  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 14));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Step 1 Validation
  const handleStep1Continue = () => {
    if (!name.trim()) {
      setNameError("Please enter your name to proceed.");
      return;
    }
    setNameError('');
    nextStep();
  };

  // Step 2 Selection
  const handleStep2Select = (option: string) => {
    setNickname(option);
  };

  // Step 4 Relationship Option Select
  const handleRelationshipSelect = (option: string) => {
    if (option === "Best Friend") {
      setIsBestFriendSelected(true);
      triggerBurst();
    } else {
      setShakingOption(option);
      setShowErrorModal(true);
      setTimeout(() => setShakingOption(null), 500);
    }
  };

  // Step 8 Wish card open
  const handleWishCardClick = (id: string) => {
    if (!openedWishes.includes(id)) {
      setOpenedWishes((prev) => [...prev, id]);
    }
  };

  // Step 14 Final Choice
  const handleFinalChoice = (choice: boolean) => {
    setFinalDecision(choice);
    if (choice) {
      triggerBurst();
    } else {
      triggerBurst();
    }
  };

  // Determine progress percent
  const progressPercentage = (step / 14) * 100;

  return (
    <div className="bg-gradient-radial min-h-screen text-slate-100 flex flex-col justify-between p-4 md:p-6 relative overflow-hidden select-none">
      
      {/* Global Background Particles & Audio */}
      <FloatingHearts />
      <AudioPlayer />

      {/* Confetti Sustained during celebration steps */}
      {(step === 6 || step === 9 || (step === 14 && finalDecision !== null)) && (
        <Confetti width={width} height={height} numberOfPieces={80} recycle={true} colors={['#a855f7', '#ec4899', '#f43f5e', '#eab308']} />
      )}

      {/* Top Header & Progress bar */}
      <header className="w-full max-w-lg mx-auto z-40 mb-4">
        {step < 14 || finalDecision === null ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-purple-400">
              <span>Birthday Journey</span>
              <span>Step {step} of 14</span>
            </div>
            <div className="w-full h-1 bg-purple-950/50 rounded-full overflow-hidden border border-purple-900/30">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        ) : null}
      </header>

      {/* Main View Area */}
      <main className="flex-1 flex items-center justify-center z-30 py-4 w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: NAME INPUT */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-md border border-purple-500/20"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 mb-3 text-glow-purple">
                Welcome
              </h1>
              <p className="text-sm md:text-base text-zinc-400 mb-6">
                Before entering the birthday surprise, please tell us your name.
              </p>
              
              <div className="w-full mb-6">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim()) setNameError('');
                  }}
                  className="w-full px-4 py-3 bg-zinc-950/40 border border-purple-500/20 rounded-xl text-center focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-slate-100 placeholder-zinc-500 font-sans tracking-wide shadow-inner"
                />
                {nameError && (
                  <p className="text-rose-400 text-xs mt-2 text-left px-2 font-medium flex items-center gap-1">
                    ⚠️ {nameError}
                  </p>
                )}
              </div>

              <button
                onClick={handleStep1Continue}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                Continue
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: NICKNAME SELECTION */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-md border border-purple-500/20"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Compass className="w-8 h-8 text-rose-400 animate-spin-slow" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 mb-6 text-glow-purple">
                What do you wish to call him?
              </h1>
              
              <div className="w-full flex flex-col gap-3 mb-8">
                {["D THRISHANTH REDDY", "DTR"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleStep2Select(opt)}
                    className={`w-full py-4 px-6 rounded-xl border text-center font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      nickname === opt
                        ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                        : 'bg-zinc-950/40 border-purple-500/15 hover:border-purple-500/40 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3.5 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!nickname}
                  className={`w-2/3 py-3.5 font-semibold rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer ${
                    nickname
                      ? 'bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)]'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PRANK PAGE */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-md border border-rose-500/20"
            >
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/30 mb-6 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <Flame className="w-8 h-8 animate-bounce text-rose-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300 mb-6">
                Let's make flames to both of you 🔥
              </h1>
              
              <p className="text-zinc-400 text-sm md:text-base mb-8">
                Are you ready to see the sparks fly between you and {nickname}? Click enter to ignite the passion!
              </p>

              <button
                onClick={() => setShowPrankPopup(true)}
                className="w-full py-4 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_4px_25px_rgba(244,63,94,0.5)] cursor-pointer"
              >
                ENTER
              </button>

              {/* Prank Full-screen Popup */}
              <AnimatePresence>
                {showPrankPopup && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 text-center select-none"
                  >
                    <motion.div
                      initial={{ scale: 0.3, y: 100 }}
                      animate={{ 
                        scale: 1, 
                        y: 0,
                        rotate: [0, -10, 10, -10, 10, 0]
                      }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ 
                        rotate: { repeat: Infinity, duration: 0.5 },
                        scale: { type: "spring", damping: 10 }
                      }}
                      className="text-8xl md:text-9xl mb-8 select-none"
                    >
                      😂
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-6xl font-black font-display text-rose-500 tracking-wider text-glow-rose uppercase animate-pulse"
                    >
                      JUST KIDDING!
                    </motion.h1>
                    <p className="text-zinc-500 text-sm mt-4 tracking-widest uppercase">
                      Redirecting back to safety...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 4: RELATIONSHIP TEST */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-5 md:p-6 flex flex-col items-center text-center max-w-lg border border-purple-500/20"
            >
              <h1 className="text-xl md:text-2xl font-bold font-display text-purple-200 mb-5">
                Select your relationship with THRISHANTH
              </h1>

              <div className="w-full grid grid-cols-2 gap-2 mb-6">
                {RELATIONSHIP_OPTIONS.map((opt) => {
                  const isShaking = shakingOption === opt;
                  return (
                    <motion.button
                      key={opt}
                      onClick={() => !isBestFriendSelected && handleRelationshipSelect(opt)}
                      animate={isShaking ? { x: [0, -10, 10, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      disabled={isBestFriendSelected}
                      className={`py-3 px-3 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                        isBestFriendSelected && opt === "Best Friend"
                          ? 'bg-purple-600/40 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'bg-zinc-950/40 border-purple-500/10 hover:border-purple-500/35 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {opt === "Best Friend" && isBestFriendSelected ? "🎉 Best Friend" : opt}
                    </motion.button>
                  );
                })}
              </div>

              {/* Reveal Section when Correct */}
              <AnimatePresence>
                {isBestFriendSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-full bg-purple-950/30 border border-purple-500/30 rounded-xl p-4 mb-6 flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-xl md:text-2xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 text-glow-purple tracking-widest uppercase mb-1"
                    >
                      🎉 BEST FRIEND
                    </motion.div>
                    <p className="text-xs text-purple-300 font-medium">
                      Correct selection! Let's continue.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  disabled={isBestFriendSelected}
                  className={`w-1/3 py-3 bg-zinc-950/30 border border-zinc-800 text-zinc-400 font-semibold rounded-xl transition-all duration-300 ${
                    isBestFriendSelected ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-900/50 hover:border-zinc-700 hover:text-zinc-200 cursor-pointer'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!isBestFriendSelected}
                  className={`w-2/3 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer ${
                    isBestFriendSelected
                      ? 'bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)]'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Error Modal */}
              <AnimatePresence>
                {showErrorModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-zinc-950 border border-rose-500/40 rounded-2xl p-6 max-w-sm w-full text-center shadow-[0_10px_50px_rgba(244,63,94,0.25)]"
                    >
                      <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/30 mx-auto mb-4 text-rose-500">
                        <ShieldAlert className="w-6 h-6 animate-pulse" />
                      </div>
                      <h2 className="text-lg font-bold text-rose-400 mb-2 font-display">
                        Wrong answer detected
                      </h2>
                      <p className="text-zinc-400 text-sm mb-6">
                        Think carefully about your relationship with {nickname}! Try again.
                      </p>
                      <button
                        onClick={() => setShowErrorModal(false)}
                        className="px-6 py-2.5 bg-rose-600/20 border border-rose-500/40 text-rose-200 rounded-xl hover:bg-rose-600/30 transition-all font-semibold text-sm cursor-pointer"
                      >
                        Try Again
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 5: MYSTERY PAGE */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-md border border-purple-500/20"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Star className="w-8 h-8 text-purple-400 animate-spin-slow" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 mb-4 text-glow-purple">
                What is the real meaning of Best Friend?
              </h1>
              
              <p className="text-zinc-400 text-sm md:text-base mb-8">
                Let's know about it later.
              </p>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3.5 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-2/3 py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
                >
                  Click Enter
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: HAPPY BIRTHDAY HERO */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-lg border border-purple-500/25 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]"
            >
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>

              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className="w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-rose-500/20 rounded-full flex items-center justify-center border border-purple-500/35 mb-6 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
              >
                <Gift className="w-10 h-10 text-rose-400" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-rose-300 to-yellow-300 mb-2 text-glow-purple tracking-wide animate-pulse">
                🎂 HAPPY BIRTHDAY
              </h1>

              {/* Display entered user name */}
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 font-display">
                {name}
              </h2>

              <div className="h-10 mb-8 flex items-center justify-center text-rose-300 text-lg font-medium">
                <Typewriter text="Today is all about you ❤️" speed={50} delay={600} />
              </div>

              <button
                onClick={nextStep}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_30px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                Begin Surprise
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* STEP 7: SPECIAL MESSAGE ENVELOPE */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center max-w-md"
            >
              <h1 className="text-2xl font-bold font-display text-purple-200 mb-8 text-center text-glow-purple">
                A Secret Letter for You
              </h1>

              {/* Envelope Animation */}
              <div className="relative w-80 h-56 flex items-center justify-center mb-10">
                <div
                  onClick={() => setEnvelopeOpen(!envelopeOpen)}
                  className="relative w-72 h-44 bg-purple-900/40 rounded-b-xl border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] cursor-pointer overflow-visible flex items-end justify-center pb-4 transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-900/50"
                >
                  {/* Flap */}
                  <div
                    className={`absolute top-0 left-0 w-0 h-0 border-l-[144px] border-r-[144px] border-t-[88px] border-transparent border-t-purple-600/80 origin-top transition-transform duration-500 z-30 ${
                      envelopeOpen ? 'rotateX-180 -translate-y-[88px] border-t-purple-800/10' : ''
                    }`}
                    style={{
                      transformOrigin: 'top',
                      transform: envelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)'
                    }}
                  />

                  {/* Envelope Front Pocket lines */}
                  <div className="absolute inset-0 z-20 pointer-events-none rounded-b-xl overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[144px] border-r-[144px] border-b-[88px] border-transparent border-b-purple-850/90" />
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[144px] border-b-[88px] border-t-[88px] border-transparent border-l-purple-800/90" />
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[144px] border-b-[88px] border-t-[88px] border-transparent border-r-purple-800/90" />
                  </div>

                  {/* Letter Sheet */}
                  <motion.div
                    animate={envelopeOpen ? { y: -90, zIndex: 10 } : { y: 0, zIndex: 5 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    className="absolute top-2 left-4 right-4 bg-zinc-100 text-zinc-900 rounded-lg p-4 shadow-xl z-10 flex flex-col justify-between"
                    style={{ height: '150px' }}
                  >
                    <div className="text-[10px] md:text-xs font-serif leading-relaxed text-zinc-800 overflow-hidden">
                      <p className="font-bold text-zinc-900 mb-1">Dear {name},</p>
                      <p className="mb-1 text-[9px] md:text-[11px]">
                        Today isn't just your birthday.
                      </p>
                      <p className="text-[9px] md:text-[11px]">
                        It's a reminder that someone special entered this world and made life better for the people around them.
                      </p>
                    </div>
                    <div className="text-[8px] font-sans font-bold text-purple-700 text-right mt-1">
                      With Love, DTR
                    </div>
                  </motion.div>

                  {/* Heart Seal (glowing button on front when closed) */}
                  {!envelopeOpen && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 z-40 bg-rose-500 border border-rose-400 p-2.5 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.6)] cursor-pointer"
                    >
                      <Heart className="w-5 h-5 text-white fill-current" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Text helper */}
              <p className="text-zinc-400 text-xs md:text-sm text-center mb-6 max-w-xs font-medium">
                {envelopeOpen ? "Click the letter to read, then proceed below." : "Tap the red seal to open the secret letter."}
              </p>

              {/* Full view of the message once opened */}
              <AnimatePresence>
                {envelopeOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full bg-zinc-950/40 border border-purple-500/20 rounded-xl p-5 mb-8 text-left"
                  >
                    <p className="text-rose-400 font-bold mb-2 font-display text-sm">LETTER TRANSCRIPT:</p>
                    <p className="text-zinc-200 text-sm leading-relaxed font-sans mb-3">
                      "Dear <strong>{name}</strong>,
                    </p>
                    <p className="text-zinc-300 text-sm leading-relaxed font-sans mb-3">
                      Today isn't just your birthday.
                    </p>
                    <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                      It's a reminder that someone special entered this world and made life better for the people around them."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!envelopeOpen}
                  className={`w-2/3 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer ${
                    envelopeOpen
                      ? 'bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)]'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 8: BIRTHDAY WISH CARDS */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center max-w-lg"
            >
              <h1 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 mb-2 text-glow-purple text-center">
                Birthday Wish Cards
              </h1>
              <p className="text-zinc-400 text-xs md:text-sm text-center mb-6">
                Tap each card to reveal DTR's wishes for you ({openedWishes.length}/4 read)
              </p>

              <div className="grid grid-cols-2 gap-3 w-full mb-8">
                {WISH_CARDS.map((card) => {
                  const isOpened = openedWishes.includes(card.id);
                  return (
                    <motion.div
                      key={card.id}
                      onClick={() => handleWishCardClick(card.id)}
                      className={`glass-card p-4 rounded-xl border flex flex-col items-center justify-center min-h-[140px] text-center cursor-pointer transition-all duration-300 ${
                        isOpened
                          ? 'border-purple-500/50 bg-purple-950/20'
                          : 'border-purple-500/10 hover:border-purple-500/30 bg-zinc-950/40 hover:scale-[1.02]'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {!isOpened ? (
                          <motion.div
                            key="front"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2 text-purple-400">
                              <Sparkles className="w-5 h-5 animate-pulse" />
                            </div>
                            <span className="font-display font-bold text-sm text-zinc-300">
                              {card.title}
                            </span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="back"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                          >
                            <span className="font-display font-black text-xs text-rose-400 uppercase tracking-widest mb-1.5">
                              {card.title}
                            </span>
                            <p className="text-[10px] md:text-xs text-zinc-300 leading-relaxed">
                              {card.wish}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={openedWishes.length < 4}
                  className={`w-2/3 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer ${
                    openedWishes.length === 4
                      ? 'bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)]'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 9: FINAL BIRTHDAY MESSAGE */}
          {step === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-lg border border-purple-500/25 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]"
            >
              {/* Fireworks Overlay */}
              <Fireworks />

              <div className="relative z-10 w-full flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
                </motion.div>

                <h1 className="text-2xl md:text-3xl font-bold font-display text-glow-rose text-rose-300 mb-6">
                  Happy Birthday ❤️
                </h1>

                <div className="space-y-4 mb-8 max-w-sm">
                  <p className="text-base md:text-lg text-zinc-100 font-medium leading-relaxed font-sans">
                    "May all your dreams come true."
                  </p>
                  <p className="text-base md:text-lg text-zinc-100 font-medium leading-relaxed font-sans">
                    "May your smile never fade."
                  </p>
                </div>

                <div className="w-full flex gap-3">
                  <button
                    onClick={prevStep}
                    className="w-1/3 py-3.5 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="w-2/3 py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-[0_4px_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 10: MEANING OF BEST FRIEND */}
          {step === 10 && (
            <motion.div
              key="step10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-5 md:p-6 flex flex-col items-center max-w-lg border border-purple-500/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <h1 className="text-lg md:text-xl font-bold font-display text-purple-200 text-glow-purple">
                  What does DTR mean by BEST FRIEND?
                </h1>
              </div>

              {/* Story scroll window */}
              <div className="w-full max-h-[300px] overflow-y-auto pr-1 text-left space-y-3 mb-6 bg-zinc-950/20 rounded-xl p-3 border border-purple-500/5 shadow-inner">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs md:text-sm text-zinc-300 leading-relaxed pl-3 border-l-2 border-purple-500/50"
                >
                  Best friend means a person who stands alongside me irrespective of conditions, who supports me in failures and successes.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-xs md:text-sm text-zinc-300 leading-relaxed pl-3 border-l-2 border-purple-500/30"
                >
                  You are the one who fully accepts me as I am, celebrates my successes, and comforts me when I am down.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7 }}
                  className="text-xs md:text-sm text-zinc-300 leading-relaxed pl-3 border-l-2 border-purple-500/30"
                >
                  A true friend trusts me without jealousy. A best friend is someone with whom I share a sibling-like connection.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.9 }}
                  className="text-xs md:text-sm text-zinc-300 leading-relaxed pl-3 border-l-2 border-purple-500/30"
                >
                  You are often the first person I want to call when something major happens. You are the person with whom I share my secrets and feelings.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 5.1 }}
                  className="text-xs md:text-sm text-zinc-300 leading-relaxed pl-3 border-l-2 border-purple-500/30"
                >
                  I trust that you protect my value and my name even when I am not present.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 6.3 }}
                  className="text-xs md:text-sm text-zinc-300 leading-relaxed pl-3 border-l-2 border-purple-500/30"
                >
                  The bond transforms from honesty and loyalty into emotional safety and personal growth.
                </motion.p>
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-2/3 py-3 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 11: FRIENDSHIP TRAITS */}
          {step === 11 && (
            <motion.div
              key="step11"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center max-w-lg"
            >
              <h1 className="text-xl md:text-2xl font-bold font-display text-purple-200 mb-2 text-center text-glow-purple">
                Friendship Traits
              </h1>
              <p className="text-zinc-400 text-xs md:text-sm text-center mb-5">
                Tap each trait card to expand and explore the details.
              </p>

              {/* Scrollable list of traits */}
              <div className="w-full max-h-[340px] overflow-y-auto space-y-2 mb-6 pr-1">
                {FRIENDSHIP_TRAITS.map((trait) => {
                  const isExpanded = expandedTrait === trait.id;
                  return (
                    <motion.div
                      key={trait.id}
                      layout
                      onClick={() => setExpandedTrait(isExpanded ? null : trait.id)}
                      className={`glass-card p-3 rounded-xl border border-purple-500/15 cursor-pointer text-left transition-all duration-300 ${
                        isExpanded ? 'border-purple-500/40 bg-purple-950/20' : 'hover:bg-zinc-950/40 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-0.5">
                            Card {trait.id}
                          </span>
                          <h2 className="text-sm font-bold text-zinc-100 font-display">
                            {trait.title}
                          </h2>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-800"
                        >
                          <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 pt-3 border-t border-purple-500/10"
                          >
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {trait.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-2/3 py-3 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 12: FINAL RECOGNITION */}
          {step === 12 && (
            <motion.div
              key="step12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-md border border-purple-500/20"
            >
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/30 mb-6 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
              </div>
              
              <h1 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 mb-6 text-glow-purple">
                ❤️ Finally...
              </h1>

              <div className="space-y-4 text-left mb-8">
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
                  After observing your habits, personality, behaviour, and most importantly your character, <strong>DTR</strong> considers <strong>YOU</strong> his Best Friend.
                </p>
                <div className="bg-purple-950/20 border border-purple-500/15 p-4 rounded-xl space-y-2">
                  <p className="text-xs md:text-sm text-purple-300 font-medium">
                    ✨ This title is given only to a very few people.
                  </p>
                  <p className="text-xs md:text-sm text-purple-300 font-medium">
                    ✨ Only 2–3 people receive this from DTR.
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3.5 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-2/3 py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 13: TRUST MESSAGE */}
          {step === 13 && (
            <motion.div
              key="step13"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-md border border-purple-500/20"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <UserCheck className="w-8 h-8 text-purple-400" />
              </div>
              
              <p className="text-zinc-400 text-sm md:text-base mb-4 font-medium uppercase tracking-wider">
                And remember one thing...
              </p>

              {/* Glowing Highlighting Quote */}
              <div className="w-full bg-gradient-to-r from-purple-950/40 to-rose-950/40 border border-purple-500/30 rounded-2xl p-6 mb-8 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                <span className="text-4xl text-purple-400 font-serif leading-none block -mt-2 mb-1">“</span>
                <p className="text-base md:text-lg text-white font-extrabold font-display leading-relaxed italic px-2">
                  If you trust me, I don't make you lose that trust.
                </p>
                <span className="text-4xl text-rose-400 font-serif leading-none block mt-2 -mb-4 text-right">”</span>
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/3 py-3.5 bg-zinc-950/30 border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="w-2/3 py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 14: BIG QUESTION & DECISION OUTCOMES */}
          {step === 14 && (
            <motion.div
              key="step14"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <AnimatePresence mode="wait">
                
                {/* INITIAL QUESTION */}
                {finalDecision === null ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center border border-purple-500/20"
                  >
                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <Sparkles className="w-8 h-8 animate-pulse text-yellow-400" />
                    </div>
                    
                    <h1 className="text-xl md:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 mb-8 text-glow-purple leading-relaxed">
                      Will you really be happy being DTR's Best Friend?
                    </h1>

                    <div className="w-full flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleFinalChoice(true)}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-base"
                      >
                        YES ❤️
                      </button>
                      <button
                        onClick={() => handleFinalChoice(false)}
                        className="w-full py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-base"
                      >
                        NO 🙂
                      </button>
                    </div>
                  </motion.div>
                ) : finalDecision === true ? (
                  
                  // IF YES: THANK YOU & FORM REDIRECT
                  <motion.div
                    key="outcome-yes"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center border border-purple-500/20"
                  >
                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
                    </div>
                    
                    <h1 className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300 mb-4 text-glow-purple">
                      Thank You ❤️
                    </h1>

                    {!formSubmitted ? (
                      <>
                        <div className="space-y-4 mb-6">
                          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans font-medium">
                            DTR has conveyed his feelings with you.
                          </p>
                          <p className="text-purple-300 font-bold text-sm md:text-base leading-relaxed font-display">
                            Now you have to share your feelings with him.
                          </p>
                          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
                            Please consider filling this form and let DTR know whether you have reached here or not.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            window.open(GOOGLE_FORM_URL, '_blank');
                            setFormOpened(true);
                          }}
                          className="w-full py-4 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 group cursor-pointer animate-pulse"
                        >
                          Open Form
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-zinc-400 text-xs md:text-sm italic mt-4 mb-6">
                          I'll be waiting for your response 😊
                        </p>

                        {formOpened && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => {
                              setFormSubmitted(true);
                              triggerBurst();
                            }}
                            className="w-full py-3 bg-zinc-900 border border-purple-500/30 hover:bg-zinc-800 text-purple-300 font-semibold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] cursor-pointer mt-2"
                          >
                            I've Submitted the Form
                          </motion.button>
                        )}
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full flex flex-col items-center"
                      >
                        <p className="text-zinc-200 text-base md:text-lg font-bold leading-relaxed mb-4 font-display">
                          Thank you for being part of DTR's journey ❤️
                        </p>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-rose-300 to-purple-300 text-lg md:text-xl font-extrabold leading-relaxed mb-6 font-display text-glow-purple">
                          Happy Birthday once again 🎂
                        </p>
                        <button
                          onClick={() => {
                            setFormOpened(false);
                            setFormSubmitted(false);
                            setFinalDecision(null);
                          }}
                          className="px-6 py-2.5 bg-zinc-950/40 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-semibold rounded-xl text-sm transition-all duration-300 cursor-pointer"
                        >
                          Change Response
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  
                  // IF NO: THANK YOU & BIRTHDAY WISH
                  <motion.div
                    key="outcome-no"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center text-center border border-rose-500/20"
                  >
                    <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/30 mb-6 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                      <Smile className="w-8 h-8 text-rose-400" />
                    </div>
                    
                    <h1 className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300 mb-4 text-glow-rose">
                      Thank You 😊
                    </h1>

                    <p className="text-zinc-200 text-base md:text-lg font-bold leading-relaxed mb-3 font-display">
                      No matter what,
                    </p>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-yellow-300 text-lg md:text-xl font-extrabold leading-relaxed mb-6 font-display text-glow-rose">
                      DTR wishes you a very Happy Birthday.
                    </p>

                    <button
                      onClick={() => setFinalDecision(null)}
                      className="px-6 py-2.5 bg-zinc-950/40 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-semibold rounded-xl text-sm transition-all duration-300 cursor-pointer"
                    >
                      Change Response
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center py-2 z-40 text-[10px] tracking-widest text-zinc-600 uppercase font-sans">
        © 2026 Crafted with ❤️ for a Special Day
      </footer>

    </div>
  );
}
