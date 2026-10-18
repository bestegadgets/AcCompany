import React, { useState, useEffect } from 'react';
import { 
  Activity, Zap, Moon, Sun, Flame, Dumbbell, Brain, Heart, Shield, 
  ShoppingCart, Search, Filter, Bookmark, CheckCircle2, ChevronRight, 
  Bot, User, Award, RefreshCw, BarChart2, Plus, Minus, Trash2, ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [savedGuides, setSavedGuides] = useState(['1', '3']);
  const [userPoints, setUserPoints] = useState(1420);
  const [userStreak, setUserStreak] = useState(12);

  // Daily Habits State
  const [habits, setHabits] = useState([
    { id: 1, title: 'Sonnenlicht am Morgen (10-15 Min)', category: 'circadian', completed: true, points: 50 },
    { id: 2, title: 'Kalt duschen / Eisbad (2-3 Min)', category: 'recovery', completed: false, points: 75 },
    { id: 3, title: 'Zone 2 Cardio / Gym Session', category: 'fitness', completed: true, points: 100 },
    { id: 4, title: 'Magnesium & Glycin vor dem Schlafen', category: 'supplements', completed: false, points: 40 },
    { id: 5, title: 'Kein Blaues Licht nach 20:00 Uhr', category: 'sleep', completed: false, points: 60 }
  ]);

  // Macro Calculator State
  const [calcGender, setCalcGender] = useState('male');
  const [calcWeight, setCalcWeight] = useState(80);
  const [calcHeight, setCalcHeight] = useState(180);
  const [calcAge, setCalcAge] = useState(28);
  const [calcActivity, setCalcActivity] = useState(1.55);
  const [calcGoal, setCalcGoal] = useState('recomp');
  const [macroResults, setMacroResults] = useState(null);

  // Sleep Calculator State
  const [wakeTime, setWakeTime] = useState('06:30');
  const [sleepCycles, setSleepCycles] = useState([]);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Willkommen bei Biohack Nexus. Ich bin dein KI-Biohacking-Assistent. Wie kann ich deine Performance, dein Training oder deinen Schlaf heute optimieren?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Shop Products
  const products = [
    { id: 'p1', name: 'NeuroFocus Nootropic Matrix', category: 'Supplements', price: 49.99, rating: 4.9, desc: 'Optimierte Formel mit Alpha-GPC, Lion\'s Mane & L-Theanin für fokussiertes Arbeiten.', tag: 'Bestseller' },
    { id: 'p2', name: 'SleepSync Red Light Therapy Panel', category: 'Home Tech', price: 189.00, rating: 4.8, desc: '660nm & 850nm Nahinfrarot-Panel zur Förderung von Melatonin & Tiefschlaf.', tag: 'Biohack Pick' },
    { id: 'p3', name: 'EMF-Blocker Performance Shirt', category: 'Wearables', price: 69.95, rating: 4.7, desc: 'Silbergewebtes Performance Shirt schützt das Nervensystem vor hochfrequenter Strahlung.', tag: 'Neu' },
    { id: 'p4', name: 'Cold Plunge Chiller Pro 2.0', category: 'Recovery', price: 1290.00, rating: 5.0, desc: 'Automatisch gekühltes Eisbad für beschleunigte Regeneration & Dopamin-Boost.', tag: 'Pro Equipment' },
    { id: 'p5', name: 'Magnesium L-Threonat + Apigenin', category: 'Supplements', price: 39.90, rating: 4.9, desc: 'Spezifischer Schlaf-Stack für maximale GABA-Aktivierung und verringertes nächtliches Erwachen.', tag: 'Tiefschlaf' },
    { id: 'p6', name: 'HRV & Sleep Tracking Smart Ring', category: 'Wearables', price: 299.00, rating: 4.8, desc: 'Echtzeit-Analyse von HRV, Körpertemperatur, Schlafphasen & Daily Readiness.', tag: 'Beliebt' }
  ];

  // Guides & Protocols
  const guides = [
    { id: '1', title: 'Das Andrew Huberman Morgen-Protokoll', category: 'Biohacking', readTime: '5 Min', summary: 'Optimiere Cortisol, Dopamin & zirkadianen Rhythmus durch gezieltes Sonnenlicht, Kälte und verspätetes Koffein.' },
    { id: '2', title: 'Zone 2 Training für Langlebigkeit & Fettverbrennung', category: 'Gym & Health', readTime: '8 Min', summary: 'Warum 80% deines Ausdauertrainings bei niedrigem Puls stattfinden sollte, um Mitochondrien neu aufzubauen.' },
    { id: '3', title: 'Rotlichttherapie & Mitochondriale Funktion', category: 'Recovery', readTime: '6 Min', summary: 'Wie Nahinfrarotlicht die ATP-Produktion in deinen Zellen stimuliert und Haut sowie Muskeln regeneriert.' },
    { id: '4', title: 'Safe Supplementation Stack für Tiefschlaf', category: 'Supplements', readTime: '7 Min', summary: 'Synergien aus Magnesium Threonat, L-Theanin, Apigenin und Inositol für optimale REM- & Tiefschlafphasen.' }
  ];

  // Toggle Habit
  const toggleHabit = (id) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const nextState = !h.completed;
        setUserPoints(prev => nextState ? prev + h.points : prev - h.points);
        return { ...h, completed: nextState };
      }
      return h;
    }));
  };

  // Calculate Macros
  const calculateMacros = (e) => {
    e.preventDefault();
    let bmr = calcGender === 'male'
      ? 10 * calcWeight + 6.25 * calcHeight - 5 * calcAge + 5
      : 10 * calcWeight + 6.25 * calcHeight - 5 * calcAge - 161;

    let tdee = Math.round(bmr * parseFloat(calcActivity));
    let targetCalories = tdee;

    if (calcGoal === 'cut') targetCalories -= 500;
    if (calcGoal === 'bulk') targetCalories += 300;

    let protein = Math.round(calcWeight * 2.2); // 2.2g per kg
    let fat = Math.round((targetCalories * 0.25) / 9); // 25% Fett
    let carbs = Math.round((targetCalories - (protein * 4 + fat * 9)) / 4);

    setMacroResults({ calories: targetCalories, protein, fat, carbs, bmr, tdee });
  };

  // Calculate Sleep Cycles
  const calculateSleep = () => {
    const [hours, minutes] = wakeTime.split(':').map(Number);
    let wakeDate = new Date();
    wakeDate.setHours(hours, minutes, 0);

    let times = [];
    for (let cycles = 6; cycles >= 3; cycles--) {
      let sleepDate = new Date(wakeDate.getTime() - (cycles * 90 + 15) * 60000);
      let timeStr = sleepDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      times.push({ cycles, hours: (cycles * 1.5).toFixed(1), time: timeStr });
    }
    setSleepCycles(times);
  };

  useEffect(() => {
    calculateSleep();
  }, [wakeTime]);

  // AI Chat Submit
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let botReply = 'Basiert auf biohacking-basierten Protokollen empfehle ich eine Kombination aus zirkadianer Lichtsteuerung, gezielter Kältetherapie und Magnesium-Supplementierung.';
      if (userText.toLowerCase().includes('schlaf')) {
        botReply = 'Für besseren Schlaf: 1) Sonnenlicht innerhalb von 30 Min nach dem Aufstehen. 2) Keine schweren Mahlzeiten 3 Stunden vor dem Bettgehen. 3) 400mg Magnesium L-Threonat + 200mg L-Theanin 60 Min vor dem Schlafen.';
      } else if (userText.toLowerCase().includes('kälte') || userText.toLowerCase().includes('eisbad')) {
        botReply = 'Kältetherapie erhöht Dopamin um bis zu 250% für mehrere Stunden. Optimal sind 11 Minuten pro Woche verteilt auf 2-4 Sessions bei 10-15°C Wassertemperatur.';
      } else if (userText.toLowerCase().includes('muskel') || userText.toLowerCase().includes('gym')) {
        botReply = 'Für maximalen Muskelaufbau: Halte deine Proteinzufuhr bei 2.0-2.4g/kg. Fokussiere dich auf progressive Überlastung in 6-12 Wiederholungen und achte auf ausreichend Regeneration in Zone 1-2.';
      }
      setChatMessages(prev => [...prev, { role: 'assistant', text: botReply }]);
    }, 1000);
  };

  // Cart Handlers
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Bookmark Toggle
  const toggleBookmark = (id) => {
    setSavedGuides(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6 text-slate-950 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
                BIOHACK NEXUS
              </span>
              <span className="text-[10px] block font-mono text-cyan-400/80 -mt-1 tracking-widest uppercase">
                Human Optimization
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'calculators', label: 'Rechner & Tools', icon: BarChart2 },
              { id: 'ai-assistant', label: 'KI Assistent', icon: Bot },
              { id: 'shop', label: 'Shop & Gadgets', icon: ShoppingCart },
              { id: 'guides', label: 'Protokolle', icon: Bookmark },
              { id: 'profile', label: 'Profil', icon: User }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 text-xs font-mono">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-amber-400 font-bold">{userStreak} Tage Streak</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">{userPoints} pts</span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cart.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION BAR */}
      <div className="md:hidden bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-2 py-2 flex overflow-x-auto gap-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'calculators', label: 'Rechner', icon: BarChart2 },
          { id: 'ai-assistant', label: 'KI Chat', icon: Bot },
          { id: 'shop', label: 'Shop', icon: ShoppingCart },
          { id: 'guides', label: 'Guides', icon: Bookmark },
          { id: 'profile', label: 'Profil', icon: User }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* HERO HERO STATS */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/40 border border-slate-800 p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    Bio-Sync System Aktiv
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Tages-Readiness <span className="text-cyan-400">88%</span>
                  </h1>
                  <p className="text-slate-400 text-sm max-w-xl">
                    Deine HRV liegt 12% über deinem Wochenschnitt. Dein Nervensystem ist bereit für hohe Trainingsreize und tiefen Fokus.
                  </p>
                </div>

                <div className="bg-slate-950/60 backdrop-blur border border-slate-800/80 p-5 rounded-2xl flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-mono">HRV (ms)</div>
                    <div className="text-2xl font-bold text-emerald-400">74</div>
                    <div className="text-[10px] text-emerald-500/80">+8 ms</div>
                  </div>
                  <div className="w-px h-10 bg-slate-800"></div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-mono">Schlaf Score</div>
                    <div className="text-2xl font-bold text-cyan-400">92</div>
                    <div className="text-[10px] text-cyan-500/80">8h 12m</div>
                  </div>
                  <div className="w-px h-10 bg-slate-800"></div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase font-mono">Recovery</div>
                    <div className="text-2xl font-bold text-violet-400">Optimal</div>
                    <div className="text-[10px] text-violet-500/80">Low Stress</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DAILY HABIT TRACKER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      Tägliche Biohack-Protokolle
                    </h2>
                    <p className="text-xs text-slate-400">Schließe deine täglichen Gewohnheiten ab, um Punkte zu sammeln.</p>
                  </div>
                  <span className="text-xs font-mono bg-cyan-950 text-cyan-400 px-3 py-1 rounded-full border border-cyan-800">
                    {habits.filter(h => h.completed).length} / {habits.length} Abgeschlossen
                  </span>
                </div>

                <div className="space-y-3">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      onClick={() => toggleHabit(habit.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition cursor-pointer ${
                        habit.completed
                          ? 'bg-slate-950/40 border-cyan-500/30 text-slate-300'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                          habit.completed
                            ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                            : 'border-slate-700 bg-slate-950'
                        }`}>
                          {habit.completed && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <span className={habit.completed ? 'line-through text-slate-500' : 'font-medium'}>
                          {habit.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-900">
                        +{habit.points} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK PROTOCOLS */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-400" />
                  Quick Hacks & Timing
                </h2>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-amber-400"><Sun className="w-3.5 h-3.5" /> Koffein Fenster</span>
                      <span className="font-mono">Empfohlen: ab 09:30</span>
                    </div>
                    <p className="text-xs text-slate-300">Warte 90 Min nach dem Aufstehen mit Kaffee, um den Adenosin-Crash am Nachmittag zu vermeiden.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-cyan-400"><Moon className="w-3.5 h-3.5" /> Licht-Exposition</span>
                      <span className="font-mono">Ab 20:30 Dimmen</span>
                    </div>
                    <p className="text-xs text-slate-300">Reduziere Deckenlicht und benutze Blaublock-Brillen für eine ungehemmte Melatoninausschüttung.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400"><Dumbbell className="w-3.5 h-3.5" /> Optimales Trainingsfenster</span>
                      <span className="font-mono">15:00 - 18:00</span>
                    </div>
                    <p className="text-xs text-slate-300">Körpertemperatur und Muskelkraft erreichen am späten Nachmittag ihren Peak.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CALCULATORS & TOOLS */}
        {activeTab === 'calculators' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Interaktive Biohack Rechner</h1>
              <p className="text-slate-400 text-sm">Präzise Berechnungen für Kalorien, Makronährstoffe und Zirkadiane Schlafzyklen.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* MACRO & TDEE CALCULATOR */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Makro- & TDEE-Rechner</h2>
                    <p className="text-xs text-slate-400">Berechne deinen Kalorienbedarf & Makroverteilung</p>
                  </div>
                </div>

                <form onSubmit={calculateMacros} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Geschlecht</label>
                      <select
                        value={calcGender}
                        onChange={(e) => setCalcGender(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                      >
                        <option value="male">Männlich</option>
                        <option value="female">Weiblich</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Gewicht (kg)</label>
                      <input
                        type="number"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Größe (cm)</label>
                      <input
                        type="number"
                        value={calcHeight}
                        onChange={(e) => setCalcHeight(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Alter</label>
                      <input
                        type="number"
                        value={calcAge}
                        onChange={(e) => setCalcAge(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Aktivitätslevel</label>
                    <select
                      value={calcActivity}
                      onChange={(e) => setCalcActivity(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                    >
                      <option value="1.2">Sitzend (Wenig bis kein Sport)</option>
                      <option value="1.375">Leicht aktiv (1-3 Tage Sport/Woche)</option>
                      <option value="1.55">Moderat aktiv (3-5 Tage Sport/Woche)</option>
                      <option value="1.725">Sehr aktiv (6-7 Tage intensive Einheiten)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Ziel</label>
                    <select
                      value={calcGoal}
                      onChange={(e) => setCalcGoal(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                    >
                      <option value="cut">Fettverlust (-500 kcal Defizit)</option>
                      <option value="recomp">Body Recomposition (Erhalt)</option>
                      <option value="bulk">Muskelaufbau (+300 kcal Überschuss)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 font-bold text-slate-950 hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
                  >
                    Makros Berechnen
                  </button>
                </form>

                {macroResults && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono text-slate-400">Tagesbedarf Target</span>
                      <span className="text-xl font-bold text-cyan-400">{macroResults.calories} kcal</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400">Protein</div>
                        <div className="font-bold text-emerald-400 text-sm">{macroResults.protein}g</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400">Carbs</div>
                        <div className="font-bold text-amber-400 text-sm">{macroResults.carbs}g</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400">Fett</div>
                        <div className="font-bold text-violet-400 text-sm">{macroResults.fat}g</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SLEEP CYCLE OPTIMIZER */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-violet-400">
                    <Moon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Zirkadianer Schlaf-Optimizer</h2>
                    <p className="text-xs text-slate-400">Aufwachen ohne Gehirnebel basierend auf 90-Minuten-Zyklen</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Um wie viel Uhr musst du aufstehen?</label>
                    <input
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-mono text-cyan-400 focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <p className="text-xs text-slate-400">
                    Gehe zu einer der folgenden Zeiten ins Bett, um genau am Ende eines Schlafzyklus aufzuwachen (inkl. 15 Min Einschlafzeit):
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {sleepCycles.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-violet-500/50 transition flex flex-col items-center justify-center">
                        <span className="text-2xl font-extrabold text-violet-400 font-mono">{item.time}</span>
                        <span className="text-xs text-slate-400 mt-1">{item.cycles} Zyklen ({item.hours} Std Schlaf)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: AI ASSISTANT */}
        {activeTab === 'ai-assistant' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Nexus KI Biohack Assistent</h1>
                <p className="text-xs text-slate-400">Dein intelligenter Berater für Schlaf, Supplements, Training & Kältetherapie.</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl h-[500px] flex flex-col overflow-hidden">
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-slate-950 shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Frage z.B.: Wie optimiere ich meine REM-Schlafphasen?"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 text-slate-950 font-bold rounded-xl hover:opacity-90 transition flex items-center gap-2"
                >
                  Senden <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: SHOP & PRODUCTS */}
        {activeTab === 'shop' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Biohacking Shop & Gadgets</h1>
              <p className="text-slate-400 text-sm">Wissenschaftlich erprobte Equipment-, Supplement- & Tech-Lösungen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-800">
                        {product.tag}
                      </span>
                      <span className="text-xs text-slate-400">★ {product.rating}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold group-hover:text-cyan-400 transition">{product.name}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{product.desc}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Preis</span>
                      <span className="text-xl font-extrabold text-slate-100">{product.price.toFixed(2)} €</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-cyan-500/10"
                    >
                      <Plus className="w-4 h-4" /> In den Warenkorb
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROTOCOLS & GUIDES */}
        {activeTab === 'guides' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Biohacking Protokolle & Guides</h1>
              <p className="text-slate-400 text-sm">Fundierte Leitfäden zur direkten Anwendung im Alltag.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => {
                const isSaved = savedGuides.includes(guide.id);
                return (
                  <div key={guide.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                          {guide.category}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500">{guide.readTime} Lesezeit</span>
                          <button onClick={() => toggleBookmark(guide.id)} className="text-slate-400 hover:text-cyan-400">
                            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold">{guide.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{guide.summary}</p>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-xs font-bold text-slate-200 hover:text-cyan-400 transition flex items-center justify-center gap-2">
                      Vollständiges Protokoll lesen <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: USER PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-4 relative overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 mx-auto p-1 shadow-xl shadow-cyan-500/20">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <User className="w-12 h-12 text-cyan-400" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Biohacker Major</h2>
                <p className="text-xs font-mono text-cyan-400">Level 4 Optimization Specialist</p>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-500">Streak</div>
                  <div className="text-lg font-bold text-amber-400">{userStreak} Tage</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-500">Punkte</div>
                  <div className="text-lg font-bold text-cyan-400">{userPoints}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-500">Badges</div>
                  <div className="text-lg font-bold text-violet-400">6 Freigeschaltet</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Errungenschaften & Badges
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Circadian Master', desc: '7 Tage Sonnenlicht getrackt', unlocked: true },
                  { title: 'Cold Warrior', desc: 'Erstes Eisbad absolviert', unlocked: true },
                  { title: 'Sleep Guru', desc: 'Schlafscore über 90 erzielt', unlocked: true },
                  { title: 'Nootropic Mind', desc: 'Ersten Supplement Stack erstellt', unlocked: false },
                  { title: 'Zone 2 Engine', desc: '120 Min Zone 2 Cardio getrackt', unlocked: false },
                  { title: 'Early Riser', desc: '5 Tage vor 06:30 Uhr aufgewacht', unlocked: true }
                ].map((badge, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border text-center space-y-1 ${
                    badge.unlocked ? 'bg-slate-950 border-cyan-500/30' : 'bg-slate-950/40 border-slate-800/50 opacity-40'
                  }`}>
                    <Award className={`w-6 h-6 mx-auto ${badge.unlocked ? 'text-cyan-400' : 'text-slate-600'}`} />
                    <div className="text-xs font-bold">{badge.title}</div>
                    <div className="text-[10px] text-slate-500">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 h-full border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl animate-slideLeft">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-cyan-400" /> Dein Warenkorb
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-100 text-sm">
                  Schließen ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-slate-500 text-sm py-12">Dein Warenkorb ist leer.</p>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold">{item.name}</h4>
                        <span className="text-xs text-cyan-400 font-mono">{item.price.toFixed(2)} €</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateCartQty(item.id, -1)} className="p-1 rounded bg-slate-800 hover:bg-slate-700">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono px-2">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="p-1 rounded bg-slate-800 hover:bg-slate-700">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Ges
