import { useState } from "react";
import sweetPotatoPizzasImg from "@/assets/recipe-sweet-potato-mini-pizzas.webp";
import appPreviewRecipes from "@/assets/app-preview-recipes.jpg";
import appPreviewPlanner from "@/assets/app-preview-planner.jpg";
import appPreviewCommunity from "@/assets/app-preview-community.jpg";
import appPreviewShopping from "@/assets/app-preview-shopping.jpg";
import appPreviewPantry from "@/assets/app-preview-pantry.jpg";

import {
  Check,
  Clock,
  Sparkles,
  ShieldCheck,
  Flame,
  Snowflake,
  Users,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Utensils,
  ChefHat,
  Share2,
  Bookmark,
  Timer,
  Zap,
  Eye,
  HeartHandshake,
  AlertCircle,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";

const WHATSAPP_URL =
  "https://chat.whatsapp.com/INkLCwAKV3zDpg5z5xJZDs?s=cl&p=i&mlu=4&ilr=4&iam=2";

const LAUNCH_DATE = new Date("2026-11-30T00:00:00");

const daysLeft = (() => {
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
})();

interface Step {
  title: string;
  time?: string;
  body: string;
  tip?: string;
}

const steps: Step[] = [
  {
    title: "Scrub & Slice Sweet Potatoes into 1/2-Inch Rounds",
    time: "4 min",
    body: "Thoroughly scrub 1–2 large, uniform sweet potatoes under cool running water (keep the skin on for natural fiber, or peel if baby prefers). Slice crosswise into even 1/2-inch thick discs. Keeping them uniform ensures every mini crust bakes evenly to a melt-in-the-mouth soft center.",
    tip: "A 1/2-inch thickness is the golden BLW sweet spot: thick enough to hold sauce without folding, but tender enough to mash easily with baby gums!",
  },
  {
    title: "Preheat Oven & Lightly Brush with Olive Oil",
    time: "2 min",
    body: "Preheat your oven to 200°C (400°F). Line a large baking sheet with parchment paper. Arrange the sweet potato rounds in a single layer with a little space between each. Lightly brush both sides of each round with extra virgin olive oil.",
    tip: "Extra virgin olive oil provides essential healthy fats that boost baby's absorption of fat-soluble Vitamin A (beta-carotene).",
  },
  {
    title: "Roast Until Fork-Tender & Golden",
    time: "18–20 min",
    body: "Bake in the preheated oven for 18–20 minutes, flipping once halfway through. Test by gently piercing the center of a round with a fork: it should slide through with zero resistance. The edges will look delicately caramelized and golden.",
    tip: "If the rounds still feel firm in the center, bake 3–4 more minutes. The sweet potato must be completely tender before adding toppings.",
  },
  {
    title: "Spread Baby Tomato Sauce & Sprinkle Mozzarella",
    time: "3 min",
    body: "Remove tray from oven. Spoon about 1 teaspoon of low-sodium or homemade no-salt tomato puree onto each sweet potato round, spreading gently toward the edges. Top each with freshly shredded whole-milk mozzarella cheese and a light dusting of dried oregano.",
    tip: "Choose whole-milk mozzarella with no added sodium or preservatives. Its natural mild flavor and creamy melt are irresistible for little food explorers!",
  },
  {
    title: "Quick Melt in Oven or Broiler",
    time: "4–5 min",
    body: "Return the baking sheet to the oven for 4–5 minutes (or 2 minutes under low broil) just until the mozzarella cheese is fully melted, bubbling, and slightly glossy.",
    tip: "Avoid over-browning the cheese so it stays soft and gooey rather than chewy or rubbery.",
  },
  {
    title: "Cool 5 Minutes & Perform the Squish Test",
    time: "5 min",
    body: "Transfer the baking sheet to a wire cooling rack and allow the mini pizzas to rest for 5 minutes. As the cheese settles, gently press one pizza between your thumb and forefinger — it should squash down effortlessly with gentle pressure.",
    tip: "Always test the temperature before offering to baby: melted cheese holds heat in the center longer than the crust!",
  },
  {
    title: "Plate & Serve by Age Stage",
    time: "2 min",
    body: "For babies 8–9 months, slice the rounds into 2 or 3 finger strips for a comfortable palmar grasp. For 10+ months and toddlers with developing pincer grasp, serve whole mini pizza rounds directly on a baby suction plate.",
  },
];

const baseIngredients = [
  { amount: 2, unit: "large", item: "sweet potatoes (scrubbed & sliced into 1/2-inch rounds)" },
  { amount: 1.5, unit: "tbsp", item: "extra virgin olive oil (rich in brain-nourishing healthy fats)" },
  { amount: 0.33, unit: "cup", item: "mild no-salt-added tomato puree or homemade baby marinara" },
  { amount: 0.75, unit: "cup", item: "whole milk mozzarella cheese, freshly shredded" },
  { amount: 0.25, unit: "tsp", item: "dried oregano or mild Italian herb blend" },
  { amount: 0.125, unit: "tsp", item: "garlic powder (optional gentle aromatic kick)" },
];

const appCarouselSlides = [
  {
    id: "recipes",
    badge: "Milestone Matched (6–36m)",
    title: "300+ Recipes adapted by age",
    subtitle: "End the daily anxiety of guessing what is safe for your baby.",
    problemTitle: "The Problem It Solves:",
    problemText:
      "Constantly wondering if food is cut safely, guessing texture readiness, or cooking separate meals for baby while the rest of the family eats.",
    solutionTitle: "The Solution:",
    solutionText:
      "Instant access to 300+ pediatrician-approved recipes strictly tailored to each age stage (6–8m smooth mashes, 8–12m safe finger foods like these mini pizzas, 12m+ toddler bites). Every meal is ready in under 20 minutes with 5 simple, wholesome ingredients.",
    image: appPreviewRecipes,
    alt: "BabyBites 300+ Recipes adapted by age screen showing Quinoa Veggie Medley, Mini Mac & Cheese, and tots",
    highlight: "300+ Recipes",
  },
  {
    id: "planner",
    badge: "1-Tap Weekly Organization",
    title: "Smart Meal Planner",
    subtitle: "Say goodbye to the 5 PM dinner panic and endless mental exhaustion.",
    problemTitle: "The Problem It Solves:",
    problemText:
      "The overwhelming mental fatigue of waking up every day asking 'what am I going to feed my baby today?' and worrying about nutritional gaps.",
    solutionTitle: "The Solution:",
    solutionText:
      "Your baby's entire week planned in one tap. Perfectly balanced menus covering Breakfast, Lunch, Dinner, and Snacks. Easily swap meals, preview prep times, and tick off 'Done' as your baby eats.",
    image: appPreviewPlanner,
    alt: "BabyBites Smart Meal Planner showing Monday and Tuesday schedules with mark-done buttons",
    highlight: "Smart Planner",
  },
  {
    id: "pantry",
    badge: "Cook What You Already Have",
    title: "Pantry Helper",
    subtitle: "Turn random fridge leftovers into instant wholesome baby meals.",
    problemTitle: "The Problem It Solves:",
    problemText:
      "Staring into a full pantry with zero inspiration, letting produce spoil, or ordering expensive takeout because you didn't have time to plan.",
    solutionTitle: "The Solution:",
    solutionText:
      "Simply type in 2 or 3 ingredients you have on hand (e.g. oats, banana, egg), and BabyBites instantly generates proven, age-safe baby meals you can cook in 10 minutes without grocery shopping.",
    image: appPreviewPantry,
    alt: "BabyBites Pantry Helper showing ingredients on hand and instant cookbook recipes",
    highlight: "Pantry Helper",
  },
  {
    id: "shopping",
    badge: "Automated & Zero-Waste",
    title: "Smart Shopping List",
    subtitle: "Supermarket runs on autopilot with zero forgotten ingredients.",
    problemTitle: "The Problem It Solves:",
    problemText:
      "Rushing through supermarket aisles with a fussy baby, buying duplicate items, or getting home only to realize you forgot the main baby staple.",
    solutionTitle: "The Solution:",
    solutionText:
      "Your weekly meal plan automatically compiles a clean, interactive grocery list organized by supermarket aisles (Grains, Dairy, Produce). Check items off with one tap and eliminate food waste.",
    image: appPreviewShopping,
    alt: "BabyBites Smart Grocery Shopping List sorted by Grains and Dairy categories",
    highlight: "Shopping List",
  },
  {
    id: "community",
    badge: "Supportive Parent Village",
    title: "Moms Community (BabyGram)",
    subtitle: "A judgment-free haven to share real wins, messy plates, and get support.",
    problemTitle: "The Problem It Solves:",
    problemText:
      "Feeling lonely, anxious, and second-guessing yourself when your baby gags, throws food on the floor, or enters a picky eating phase.",
    solutionTitle: "The Solution:",
    solutionText:
      "Connect with thousands of real moms navigating the exact same feeding milestones. Share photos of real baby plates, celebrate wins, exchange tips, and receive warm daily encouragement.",
    image: appPreviewCommunity,
    alt: "BabyBites Moms Community BabyGram social feed sharing baby plate photo and warm message",
    highlight: "Moms Community",
  },
];

const SweetPotatoMiniPizzas = () => {
  const [multiplier, setMultiplier] = useState<1 | 2>(1);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % appCarouselSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? appCarouselSlides.length - 1 : prev - 1
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sweet Potato Mini Pizzas for Babies",
          text: "Check out these super healthy, soft sweet potato mini pizzas for baby-led weaning!",
          url: window.location.href,
        });
      } catch {
        // user canceled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Recipe link copied to clipboard!");
    }
  };

  const currentSlide = appCarouselSlides[activeSlide];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D312E] antialiased pb-24">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black text-xs tracking-tight text-orange-950 block leading-tight">
              BabyBites
            </span>
            <span className="text-[9.5px] text-muted-foreground block -mt-0.5">
              Pediatrician Guided
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className={`p-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              saved
                ? "bg-amber-100 text-amber-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            title="Save recipe"
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-amber-600" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Share recipe"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <a
            href="#launch"
            className="bg-orange-600 hover:bg-orange-700 text-white text-[10.5px] font-bold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1 transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span>App Launch</span>
          </a>
        </div>
      </header>

      {/* Top Launch Notice Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-center py-2 px-3 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>
          The BabyBites App officially launches on <strong>November 30</strong>!
        </span>
        <a
          href="#launch"
          className="underline decoration-white/70 hover:decoration-white font-extrabold ml-1 flex items-center gap-0.5"
        >
          See Sneak Peek ↓
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative max-w-2xl mx-auto">
        <div className="relative overflow-hidden sm:rounded-b-3xl shadow-sm">
          <img
            src={sweetPotatoPizzasImg}
            alt="Warm golden sweet potato mini pizzas with mild tomato sauce and bubbly melted mozzarella cheese on a baby ceramic plate"
            width={1200}
            height={1500}
            className="w-full h-[330px] sm:h-[420px] object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/20" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-4 right-4 flex justify-between items-center">
            <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-orange-900 shadow-sm border border-orange-100 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-600" />
              Nutrient-Dense Superfood
            </span>
            <span className="bg-orange-600 text-white px-3.5 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              8+ Months
            </span>
          </div>

          <div className="absolute bottom-2 left-4 right-4 flex items-center gap-2 flex-wrap">
            <span className="bg-orange-800/85 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Beta-Carotene Rich
            </span>
            <span className="bg-amber-900/85 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Easy BLW Grip
            </span>
            <span className="bg-stone-900/75 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Melt-in-Mouth Crust
            </span>
          </div>
        </div>

        {/* Title & Quick Stats Card */}
        <div className="px-4 pt-3 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black tracking-wider uppercase text-orange-600 bg-orange-100/70 px-2 py-0.5 rounded-full">
              BLW Finger Food • Toddler Snack
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-1.5">
            Sweet Potato Mini Pizzas
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
            Naturally sweet roasted sweet potato rounds baked to pillowy perfection, topped with
            gentle baby tomato sauce and warm bubbly mozzarella cheese. Tender enough to mash with
            infant gums, zero hard crust, and packed with beta-carotene, healthy fats, and calcium!
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            {[
              { icon: Clock, label: "Prep Time", value: "10 min" },
              { icon: Flame, label: "Bake Time", value: "24 min" },
              {
                icon: Users,
                label: "Makes",
                value: multiplier === 1 ? "8 Pizzas" : "16 Pizzas",
              },
              { icon: Snowflake, label: "Freezes", value: "3 Months" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-amber-200/70 py-2.5 px-1 shadow-xs hover:border-amber-300 transition-colors"
              >
                <Icon className="w-4 h-4 mx-auto text-orange-600 mb-1" />
                <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-[11.5px] font-extrabold text-gray-900 mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Explicit Age Appropriateness Banner */}
          <div className="bg-orange-50/90 border border-orange-200 rounded-xl p-2.5 flex items-center gap-2 text-xs text-orange-950">
            <span className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 shadow-2xs">
              8m+
            </span>
            <p className="leading-snug">
              <strong>Age Recommendation: 8+ Months &amp; Toddlers.</strong> Specially formulated for babies who have moved past early purees and are actively chewing finger foods. (Not intended for younger infants under 8 months).
            </p>
          </div>
        </div>
      </section>

      {/* Why it works / Health Benefits */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            {
              icon: Eye,
              label: "Vision & Skin",
              desc: "Beta-Carotene (Vit A)",
              color: "text-orange-700 bg-orange-50 border-orange-200/80",
            },
            {
              icon: Zap,
              label: "Bone Builder",
              desc: "Calcium Rich Cheese",
              color: "text-amber-700 bg-amber-50 border-amber-200/80",
            },
            {
              icon: Brain,
              label: "Gut & Immunity",
              desc: "Dietary Prebiotic Fiber",
              color: "text-rose-700 bg-rose-50 border-rose-200/80",
            },
            {
              icon: HeartHandshake,
              label: "Safe BLW Texture",
              desc: "Gums Squish Easy",
              color: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
            },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div
              key={label}
              className={`p-2 rounded-xl border ${color} flex flex-col items-center justify-center`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <p className="text-[10px] font-bold text-gray-800 leading-tight">
                {label}
              </p>
              <p className="text-[8.5px] text-gray-500 font-medium">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-3.5 bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-emerald-50/60 p-3.5 rounded-xl border border-orange-200/60 text-xs text-gray-700 leading-relaxed shadow-2xs">
          <p>
            <strong>Why pediatric dietitians love sweet potato crusts:</strong> Regular pizza crusts
            made from refined white flour can form gummy, sticky balls in baby mouths that pose
            swallowing challenges. Sweet potato rounds naturally roast into a soft, tender disc that
            liquefies safely with saliva and gentle gum compression — delivering 300% of baby's
            daily vitamin A plus healthy fats from cold-pressed olive oil.
          </p>
        </div>
      </section>

      {/* Interactive Ingredients Section */}
      <section className="px-4 py-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
              Ingredients
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Tap items to check off as you prepare
            </p>
          </div>

          {/* Batch Multiplier Toggle */}
          <div className="flex items-center gap-1 bg-amber-100/70 p-1 rounded-lg border border-amber-200 text-xs font-bold">
            <button
              onClick={() => setMultiplier(1)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                multiplier === 1
                  ? "bg-orange-600 text-white shadow-2xs"
                  : "text-amber-800 hover:text-amber-950"
              }`}
            >
              1x (8 pizzas)
            </button>
            <button
              onClick={() => setMultiplier(2)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                multiplier === 2
                  ? "bg-orange-600 text-white shadow-2xs"
                  : "text-amber-800 hover:text-amber-950"
              }`}
            >
              2x (Freezer Batch)
            </button>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="bg-white rounded-2xl border border-amber-200/70 p-3 shadow-xs divide-y divide-gray-100">
          {baseIngredients.map((item, idx) => {
            const isChecked = checkedItems[idx] || false;
            const scaledAmount = Number((item.amount * multiplier).toFixed(2));
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className="py-2.5 px-1.5 flex items-start gap-3 cursor-pointer group hover:bg-orange-50/40 rounded-lg transition-colors"
              >
                <div
                  className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-orange-600 text-white"
                      : "border border-gray-300 group-hover:border-orange-400 bg-white"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="flex-1 text-xs">
                  <span
                    className={`font-semibold ${
                      isChecked
                        ? "line-through text-gray-400"
                        : "text-gray-900"
                    }`}
                  >
                    {scaledAmount} {item.unit}
                  </span>{" "}
                  <span
                    className={`${
                      isChecked ? "line-through text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {item.item}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Allergy & Dietary Swap Box */}
        <div className="mt-2.5 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Allergy &amp; Dietary Substitutions:</strong>
            <span className="block text-amber-800/90 mt-0.5">
              • <strong>Dairy-free:</strong> Substitute mozzarella with melted dairy-free shreds or a dollop of mashed avocado / nutritional yeast after baking.<br />
              • <strong>Nightshade-sensitive:</strong> Swap tomato sauce for mashed steamed carrots, butternut squash puree, or sweet pea pesto.<br />
              • <strong>100% Grain-Free &amp; Gluten-Free:</strong> Naturally grain-free with no flour or grains required!
            </span>
          </div>
        </div>
      </section>

      {/* Step by Step Section */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
              Step by Step Instructions
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Follow these simple steps for soft, golden sweet potato pizzas
            </p>
          </div>
          <span className="text-[10px] font-bold text-orange-900 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Timer className="w-3 h-3" />
            30 min total
          </span>
        </div>

        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li
              key={i}
              className="bg-white border border-amber-100 rounded-2xl p-3.5 shadow-2xs hover:border-orange-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 text-white flex items-center justify-center text-[11px] font-black flex-shrink-0 shadow-xs mt-0.5">
                  {i + 1}
                </span>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">
                      {step.title}
                    </p>
                    {step.time && (
                      <span className="text-[9.5px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                        {step.time}
                      </span>
                    )}
                  </div>

                  <p className="text-[11.5px] text-gray-600 leading-relaxed mt-1">
                    {step.body}
                  </p>

                  {step.tip && (
                    <div className="mt-2 text-[10.5px] text-orange-950 bg-orange-50/80 border border-orange-200/70 rounded-lg p-2 flex items-start gap-1.5 leading-snug">
                      <span className="flex-shrink-0">💡</span>
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Serving by Age & Texture Stage */}
      <section className="px-4 py-4 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-1">
          Serving by Age &amp; Chewing Milestones
        </h2>
        <p className="text-[11px] text-muted-foreground mb-3">
          How to safely cut and present sweet potato mini pizzas as baby develops
        </p>

        <div className="space-y-2.5">
          {[
            {
              age: "8–9 mo",
              title: "Finger Strips (Palmar Grasp)",
              badgeBg: "bg-emerald-600",
              text: "Slice each cooled sweet potato round into 2–3 finger-width strips (about the length of an adult finger). Babies at this stage use their whole palm to grasp foods and bite safely off the protruding top.",
            },
            {
              age: "9–12 mo",
              title: "Bite-Sized Pizza Coins (Pincer Grasp)",
              badgeBg: "bg-amber-600",
              text: "Cut the rounds into small 1-cm cubes or coin halves. At 9–10 months, babies begin picking up small morsels with thumb and pointer finger, learning self-pacing and chewing coordination.",
            },
            {
              age: "12+ mo & Toddlers",
              title: "Whole Mini Pizzas & Lunchbox Star",
              badgeBg: "bg-orange-600",
              text: "Serve the mini pizza rounds whole! Toddlers love holding their very own mini pizza like a grown-up, taking independent bites and dipping in cool plain yogurt or guacamole.",
            },
          ].map((row) => (
            <div
              key={row.age}
              className="bg-white border border-amber-100/90 rounded-xl p-3 flex flex-col sm:flex-row sm:items-start gap-2 shadow-2xs"
            >
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-[10px] font-black text-white ${row.badgeBg} rounded-full px-2.5 py-0.5 tracking-wide`}
                >
                  {row.age}
                </span>
                <span className="text-xs font-bold text-gray-800 sm:hidden">
                  {row.title}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-800 hidden sm:block mb-0.5">
                  {row.title}
                </p>
                <p className="text-[11px] text-gray-600 leading-snug">
                  {row.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pediatrician Squish Test Note */}
        <div className="mt-3 bg-white border border-orange-200 rounded-xl p-3 text-[11px] text-gray-700 flex gap-2.5 shadow-2xs items-start">
          <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
            ✓
          </div>
          <div>
            <strong className="text-gray-900 block font-bold mb-0.5">
              The Pediatrician Squish Test for Choking Prevention
            </strong>
            Before offering any finger food to baby, pinch it firmly between your thumb and index
            finger. If it crushes easily with the same pressure you can apply to the tip of your
            tongue, it is safe for gumming. Sweet potato rounds baked until fork-tender pass this
            test flawlessly!
          </div>
        </div>
      </section>

      {/* Freezing & Reheating Storage Guide */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-2">
          Freezing &amp; 3-Minute Reheating
        </h2>
        <div className="bg-white rounded-2xl border border-amber-200/80 p-3.5 space-y-2.5 shadow-2xs">
          {[
            {
              title: "Flash Freeze on Tray",
              text: "Arrange cooled mini pizzas on a parchment-lined baking sheet without touching. Freeze for 2 hours until solid.",
            },
            {
              title: "Airtight Storage",
              text: "Transfer frozen pizza coins into a silicone freezer bag or glass container with parchment between layers. Keeps fresh for up to 3 months.",
            },
            {
              title: "Reheat in 3 Minutes",
              text: "Warm directly from frozen in a toaster oven or air fryer at 175°C (350°F) for 3–4 minutes until warm throughout and cheese is softly melted again.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs">
              <Snowflake className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">{item.title}:</strong>{" "}
                <span className="text-gray-600">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* APP LAUNCH & INTERACTIVE SNEAK PEEK CAROUSEL (AS REQUESTED) */}
      {/* ========================================================================= */}
      <section id="launch" className="px-4 py-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-orange-300 p-4 sm:p-7 shadow-lg relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-950 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-2xs border border-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-spin" />
              <span>Official App Launch • November 30</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              A Sneak Peek Inside The BabyBites App
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug mt-1.5 max-w-lg mx-auto">
              Everything you need to feed your baby with zero stress, backed by pediatric
              nutritionists — unified in one beautiful companion.
            </p>
          </div>

          {/* Interactive Feature Pills (Tabs) */}
          <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none no-scrollbar">
            {appCarouselSlides.map((slide, index) => {
              const isActive = activeSlide === index;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-full transition-all flex-shrink-0 flex items-center gap-1.5 border ${
                    isActive
                      ? "bg-orange-600 text-white border-orange-600 shadow-xs scale-[1.02]"
                      : "bg-orange-50/70 text-gray-700 border-orange-200/70 hover:bg-orange-100"
                  }`}
                >
                  <span>{slide.highlight}</span>
                </button>
              );
            })}
          </div>

          {/* Carousel Slide Card */}
          <div className="relative z-10 bg-gradient-to-b from-[#FFFDF9] to-amber-50/30 rounded-2xl border border-orange-200/80 p-3.5 sm:p-5 shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Phone Mockup Screen */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[240px] sm:max-w-[260px] rounded-[28px] overflow-hidden border-[5px] border-gray-900 shadow-xl bg-white aspect-[9/18.5]">
                  {/* Speaker Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-gray-900 rounded-full z-20" />
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.alt}
                    className="w-full h-full object-cover object-top transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* Feature Content & Problem-Solution Copy */}
              <div className="md:col-span-7 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider mb-1.5 w-fit">
                  {currentSlide.badge}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-snug">
                  {currentSlide.title}
                </h3>
                <p className="text-xs font-semibold text-orange-700 mb-3">
                  {currentSlide.subtitle}
                </p>

                {/* The Problem It Solves */}
                <div className="mb-2.5 bg-rose-50/90 border border-rose-200/80 rounded-xl p-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-rose-900 mb-0.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    <span>{currentSlide.problemTitle}</span>
                  </div>
                  <p className="text-[11px] text-rose-950/80 leading-relaxed">
                    {currentSlide.problemText}
                  </p>
                </div>

                {/* The Solution */}
                <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-2.5 mb-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-900 mb-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 stroke-[3]" />
                    <span>{currentSlide.solutionTitle}</span>
                  </div>
                  <p className="text-[11px] text-emerald-950/80 leading-relaxed">
                    {currentSlide.solutionText}
                  </p>
                </div>

                {/* Carousel Controls (Previous / Next) */}
                <div className="flex items-center justify-between pt-2 border-t border-orange-100">
                  <div className="flex items-center gap-1">
                    {appCarouselSlides.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        onClick={() => setActiveSlide(dotIdx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeSlide === dotIdx
                            ? "w-6 bg-orange-600"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                    <span className="text-[10px] font-bold text-gray-400 ml-2">
                      {activeSlide + 1} of {appCarouselSlides.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevSlide}
                      className="p-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors shadow-2xs"
                      title="Previous feature"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="px-3 py-1.5 rounded-full bg-orange-600 text-white font-extrabold text-xs flex items-center gap-1 hover:bg-orange-700 transition-all shadow-xs"
                      title="Next feature"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Highlight Banner */}
          <div className="mt-4 bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-amber-100/90 border border-amber-300/80 rounded-xl px-3.5 py-2.5 text-center text-xs font-extrabold text-amber-950 shadow-2xs relative z-10">
            ✨ Launching November 30: 300+ recipes, weekly meal plans, pantry helper, grocery lists &amp; supportive mom community — all in ONE app!
          </div>

          {/* WhatsApp VIP Announcement Box */}
          <div className="mt-4 bg-gradient-to-br from-amber-50 via-white to-orange-50/50 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 text-center relative z-10 shadow-xs">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>VIP Waiting List Now Open</span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-gray-900 mb-1">
              Want Exclusive Launch Perks &amp; Secret Discount?
            </h3>
            <p className="text-[11.5px] sm:text-xs text-gray-600 leading-relaxed mb-4 max-w-md mx-auto">
              Our official app download link, private launch walkthrough, and exclusive founding-member
              pricing will drop directly inside our VIP WhatsApp group on <strong>November 30</strong>.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl py-3.5 px-4 shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all transform active:scale-[0.98] hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Join the VIP WhatsApp Group</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </a>

            <p className="text-[10px] text-gray-500 mt-2.5 flex items-center justify-center gap-1">
              <span>🔒 100% Free to join • No spam • Unsubscribe anytime</span>
            </p>
          </div>
        </div>
      </section>

      {/* Floating Sticky Mobile Quick Action */}
      <div className="fixed bottom-3 left-4 right-4 max-w-md mx-auto z-40 sm:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white font-extrabold py-3 px-4 rounded-full shadow-lg flex items-center justify-between text-xs border border-white/30 backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Join VIP WhatsApp Group</span>
          </div>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-0.5 font-bold">
            Nov 30 Launch →
          </span>
        </a>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 text-center border-t border-amber-100/60 mt-6">
        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-orange-100 flex items-center justify-center text-orange-800">
          <ChefHat className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold text-gray-700">BabyBites</p>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
          Nourishing tiny bodies with whole, joyful foods. 🍕🍠
        </p>
      </footer>
    </div>
  );
};

export default SweetPotatoMiniPizzas;
