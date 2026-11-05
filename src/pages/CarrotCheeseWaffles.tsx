import { useState } from "react";
import carrotWafflesImg from "@/assets/recipe-carrot-cheese-waffles.webp";
import {
  Check,
  Clock,
  Brain,
  Sparkles,
  ShieldCheck,
  Flame,
  Snowflake,
  Download,
  CalendarCheck,
  Users,
  ChevronRight,
  MessageCircle,
  Utensils,
  Repeat,
  Package,
  TrendingUp,
  ChefHat,
  Share2,
  Bookmark,
  Timer,
  Zap,
  Eye,
  HeartHandshake,
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
    title: "Finely grate the carrots",
    time: "3 min",
    body: "Wash and peel the fresh carrots. Using the finest side of a box grater or microplane, grate into delicate shreds. Finely grating is essential so the carrot strands soften completely inside the waffle iron, creating a silky, melt-in-the-mouth texture without any hard raw pieces.",
    tip: "Finely grated carrots blend effortlessly with melted cheese, releasing natural sweetness that babies adore!",
  },
  {
    title: "Whisk eggs, milk & melted butter",
    time: "2 min",
    body: "In a medium mixing bowl, whisk the 2 pasture-raised eggs until light and frothy. Pour in the milk (whole cow's milk, breast milk, or unsweetened plant milk) and melted unsalted butter or extra virgin olive oil. Whisk for 30 seconds until fully emulsified.",
    tip: "Pasture-raised eggs provide choline and healthy fats essential for baby's neural and brain development.",
  },
  {
    title: "Fold in dry ingredients & grated cheese",
    time: "2 min",
    body: "Add the oat flour (or whole wheat flour), aluminum-free baking powder, garlic powder, and mild dried herbs to the wet bowl. Stir gently until just combined. Fold in the finely grated carrots and freshly shredded cheddar or mozzarella cheese.",
    tip: "Do not overmix! A gentle fold keeps the waffle interior fluffy, airy, and soft for tender gums.",
  },
  {
    title: "Preheat & brush your waffle maker",
    time: "2 min",
    body: "Preheat your waffle iron on medium heat. Lightly brush the top and bottom plates with extra virgin olive oil or melted butter so the waffles release cleanly and develop a delicate golden crust.",
    tip: "Using a regular or Belgian waffle maker works great. The grid pockets provide natural grip traction for baby fingers!",
  },
  {
    title: "Cook to golden, fragrant perfection",
    time: "5 min",
    body: "Spoon about 1/3 to 1/2 cup of batter into the center of each waffle section. Close the lid and cook for 4–5 minutes until steam stops escaping and the waffles are lightly crispy on the edges and golden-orange in color.",
    tip: "Resist opening the waffle maker during the first 3 minutes so the batter puffs up evenly without tearing.",
  },
  {
    title: "Cool 5 min & slice into waffle sticks",
    time: "4 min",
    body: "Transfer waffles to a wire cooling rack for 5 minutes. As the melted cheese cools slightly, the waffles firm up enough to hold their shape without getting soggy. Slice along the waffle grooves into finger-length sticks (about 2 fingers wide).",
    tip: "Always perform the Squish Test before serving to ensure the sticks flatten easily between your fingers!",
  },
  {
    title: "Plate with cool Greek yogurt dip",
    time: "2 min",
    body: "Arrange the warm savory waffle sticks in baby's suction plate alongside a generous dollop of cool, unsweetened plain Greek yogurt. Serve with mealtime sips of water in a baby training cup.",
  },
];

const baseIngredients = [
  { amount: 1.5, unit: "cups", item: "fresh carrots (peeled & finely grated — rich in beta-carotene)" },
  { amount: 2, unit: "large", item: "pasture-raised eggs (whisked — complete protein & brain choline)" },
  { amount: 1, unit: "cup", item: "mild cheddar or mozzarella cheese, freshly shredded (calcium & savory crust)" },
  { amount: 0.75, unit: "cup", item: "oat flour (or blended rolled oats / whole wheat flour)" },
  { amount: 0.25, unit: "cup", item: "whole milk (or breast milk / unsweetened plant milk)" },
  { amount: 2, unit: "tbsp", item: "unsalted butter melted (or extra virgin olive oil)" },
  { amount: 0.5, unit: "tsp", item: "aluminum-free baking powder (creates pillowy soft interior)" },
  { amount: 0.25, unit: "tsp", item: "garlic powder & dried mild parsley (optional savory aromatics)" },
];

const appFeatures = [
  {
    icon: Utensils,
    title: "300+ Recipes (6–36 Mo)",
    text: "Age-adapted with pediatrician guidelines & texture stages",
  },
  {
    icon: CalendarCheck,
    title: "Weekly Meal Planner & Feeds",
    text: "Done-for-you menus with automated grocery shopping lists",
  },
  {
    icon: Users,
    title: "In-App Mom Community",
    text: "Moms share real photos, feeding videos, wins & experiences",
  },
  {
    icon: ShieldCheck,
    title: "Safe Allergen Tracker",
    text: "Step-by-step introduction of top allergens & reaction log",
  },
  {
    icon: Snowflake,
    title: "Freezer Prep & Batch Cook",
    text: "Cook once, freeze safely & ready in under 3 minutes",
  },
  {
    icon: Package,
    title: "Smart Pantry Helper",
    text: "Cook nutritious meals with what you already have at home",
  },
  {
    icon: Repeat,
    title: "1-Tap Ingredient Swap",
    text: "Safe substitutions for allergies or missing ingredients",
  },
  {
    icon: TrendingUp,
    title: "Growth & Milestones",
    text: "Track chewing, self-feeding leaps & food variety score",
  },
];

const CarrotCheeseWaffles = () => {
  const [multiplier, setMultiplier] = useState<1 | 2>(1);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Savory Carrot & Cheese Waffle Sticks",
          text: "Check out this super nutritious baby-led weaning & toddler finger food recipe!",
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

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D312E] antialiased pb-20">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100/80 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-xs tracking-tight text-orange-950 block leading-tight">
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
            className="bg-orange-600 hover:bg-orange-700 text-white text-[10.5px] font-bold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>App Launch</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-2xl mx-auto">
        <div className="relative overflow-hidden sm:rounded-b-3xl shadow-sm">
          <img
            src={carrotWafflesImg}
            alt="Golden savory carrot and cheese waffle sticks served in a sage suction plate with cool Greek yogurt dip and baby cup"
            width={1200}
            height={1500}
            className="w-full h-[320px] sm:h-[400px] object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/20" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-4 right-4 flex justify-between items-center">
            <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-orange-800 shadow-sm border border-orange-100/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-600" />
              Carrot &amp; Cheese Superfood
            </span>
            <span className="bg-orange-500 text-white px-3.5 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              6+ Months (BLW)
            </span>
          </div>

          <div className="absolute bottom-2 left-4 right-4 flex items-center gap-2">
            <span className="bg-orange-700/80 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Beta-Carotene Vision
            </span>
            <span className="bg-amber-800/80 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Freezer-Friendly
            </span>
            <span className="bg-stone-900/70 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              BLW Waffle Sticks
            </span>
          </div>
        </div>

        {/* Title & Quick Stats Card */}
        <div className="px-4 pt-3 pb-3">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-1.5">
            Savory Carrot &amp; Cheese Waffle Sticks
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
            Golden, grid-baked savory waffle sticks loaded with finely shredded sweet carrots,
            pasture-raised eggs, and melted savory cheddar. Crispy-soft on the edges with a tender,
            pillowy interior — perfectly sized for tiny baby fists, easy gumming, and zero mess.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { icon: Clock, label: "Prep", value: "10 min" },
              { icon: Flame, label: "Cook Time", value: "8 min" },
              { icon: Users, label: "Makes", value: multiplier === 1 ? "8 Sticks" : "16 Sticks" },
              { icon: Snowflake, label: "Freezes", value: "3 Mo" },
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
              icon: Brain,
              label: "Brain Choline",
              desc: "Whole Pasture Eggs",
              color: "text-amber-700 bg-amber-50 border-amber-200/80",
            },
            {
              icon: Zap,
              label: "Bone Builder",
              desc: "Calcium Rich Cheese",
              color: "text-rose-600 bg-rose-50 border-rose-200/80",
            },
            {
              icon: HeartHandshake,
              label: "Easy Waffle Grip",
              desc: "Anti-Slip Grooves",
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
            <strong>The nutritional magic of carrots, eggs &amp; cheese:</strong> Fresh carrots provide provitamin A (beta-carotene) to support developing eyesight, healthy skin, and gut immunity. Whole eggs deliver bioavailable choline and amino acids for critical brain leaps, while melted cheese adds healthy fats, calcium, and savory flavor that helps picky eaters happily accept vegetables!
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
              1x (8 sticks)
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

        {/* Dipping & Plating Complements Box (from the photo) */}
        <div className="mt-3 bg-orange-50/80 border border-orange-200/90 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>The Plating Complements (from the photo):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-orange-900/95 mt-1.5">
            <div className="bg-white/90 p-2.5 rounded-lg border border-orange-100 shadow-2xs">
              <strong>1. Cool Greek Yogurt Dip:</strong> 3 tbsp whole-milk plain Greek yogurt with a pinch of fresh mint or gentle lemon drop. Soothes warm gums and adds calcium.
            </div>
            <div className="bg-white/90 p-2.5 rounded-lg border border-orange-100 shadow-2xs">
              <strong>2. Toddler Hydration Sip:</strong> Offer small sips of water in baby's open training cup between bites to assist chewing and swallowing.
            </div>
          </div>
        </div>

        {/* Allergy & Substitute Note */}
        <div className="mt-2.5 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Smart Allergy &amp; Dietary Swaps:</strong>
            <span className="block text-amber-800/90 mt-0.5">
              • <strong>Egg-free:</strong> Use 1/2 cup unsweetened applesauce or mashed sweet potato + 1 tbsp ground flaxseed mixed with 3 tbsp warm water.<br />
              • <strong>Dairy-free:</strong> Substitute cheese with shredded plant-based cheddar or 3 tbsp nutritional yeast + plant milk.<br />
              • <strong>Gluten-free:</strong> Naturally 100% gluten-free when made with certified gluten-free oat flour.
            </span>
          </div>
        </div>
      </section>

      {/* Step by Step Section */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
              Step by Step Method
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Follow these simple steps for soft, golden carrot &amp; cheese waffles
            </p>
          </div>
          <span className="text-[10px] font-bold text-orange-900 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Timer className="w-3 h-3" />
            20 min total
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

      {/* Serving by Age & Stage (Adapted for Savory Waffles!) */}
      <section className="px-4 py-4 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-1">
          Serving by Age &amp; Texture Stage
        </h2>
        <p className="text-[11px] text-muted-foreground mb-3">
          Adapt the waffle shape to match your baby’s exact chewing and motor leaps
        </p>

        <div className="space-y-2.5">
          {[
            {
              age: "6–8 mo",
              title: "Palmar Grasp Waffle Fingers (Thick & Soft)",
              badgeBg: "bg-emerald-600",
              text: "Slice waffle into long sticks about 2 adult fingers wide (approx. 3–4 inches long). At this stage baby grasps food with their whole fist, so the stick must be long enough to stick out above and below their tiny fist. Ensure the waffle is tender and passes the squish test.",
            },
            {
              age: "9–11 mo",
              title: "Pincer Grasp Cubes & First Dips",
              badgeBg: "bg-amber-600",
              text: "Cut waffle sticks into 1-cm bite-sized squares. This challenges baby's thumb-and-forefinger coordination. Offer a dab of cool plain Greek yogurt on the tray for sensory tasting and gentle dipping exploration.",
            },
            {
              age: "12+ mo & Toddlers",
              title: "Whole Dipper Sticks & Lunchbox Prep",
              badgeBg: "bg-orange-600",
              text: "Serve whole waffle sticks alongside the Greek yogurt dip and mild fruit slices. Toddlers love practicing independent dipping skills! You can also spread a thin layer of cream cheese or avocado purée between two sticks.",
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
              Pediatrician Squish Test &amp; Carrot Choking Safety
            </strong>
            Always press a waffle stick between your thumb and forefinger before serving. It should compress and flatten easily with gentle pressure — replicating how your baby’s gums mash food against their palate. Raw hard carrots are a choking risk, but finely grating them ensures they soften completely during cooking for 100% safe baby-led weaning!
          </div>
        </div>
      </section>

      {/* Why Moms Love It */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-2 flex items-center gap-1.5">
          <span>🧡 Why Moms Love It</span>
        </h2>
        <div className="bg-gradient-to-br from-orange-50/70 via-amber-50/60 to-emerald-50/40 rounded-2xl p-4 border border-orange-200/80 shadow-2xs">
          <ul className="space-y-2 text-xs text-gray-800">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>
                <strong>Zero-Mess Finger Food:</strong> Unlike crumbly muffins or slippery steamed veggies, waffle sticks hold together in tiny fists without collapsing into mush.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>
                <strong>Natural Carrot Sweetness + Savory Cheese:</strong> The gentle caramelization of carrot and cheddar creates an aroma that even the most selective toddlers cannot resist.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>
                <strong>No Added Sugar or Salt:</strong> Wholesome real ingredients that nurture healthy taste buds and protect developing kidneys.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span>
                <strong>Ultimate Toaster Breakfast Hero:</strong> Batch-cook and freeze. Warm 2 waffle sticks directly in your toaster in just 2 minutes on busy weekday mornings!
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Storage & Reheating Instructions */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-2">
          Storage &amp; Freezing Guide
        </h2>
        <div className="bg-white rounded-2xl border border-amber-100 p-3.5 shadow-2xs space-y-2">
          {[
            {
              title: "Refrigerator",
              text: "Store cooled waffle sticks in an airtight glass container lined with a dry paper towel for up to 4 days.",
            },
            {
              title: "Freezer (Up to 3 Months)",
              text: "Place sticks separated on a parchment-lined baking sheet and flash-freeze for 1 hour. Once firm, transfer into silicone freezer bags.",
            },
            {
              title: "How to Reheat in 2 Minutes",
              text: "Pop frozen sticks directly into your slot toaster on medium-low for 2 minutes, or reheat in an air fryer at 170°C (340°F) for 3 minutes for crisp edges and a soft warm center.",
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

      {/* ================= APP LAUNCH ================= */}
      <section id="launch" className="px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-4 sm:p-6 shadow-md relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-orange-200/40 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Launch • November 30</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
              The BabyBites App
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-snug mt-1 max-w-md mx-auto">
              Everything you need to feed your baby from 6 to 36 months — in one single app.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4 text-left relative z-10">
            {appFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 hover:bg-amber-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {feat.title}
                    </p>
                    <p className="text-[10.5px] text-gray-600 leading-snug mt-0.5">
                      {feat.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sales Highlight Banner */}
          <div className="bg-gradient-to-r from-amber-100/90 to-orange-100/80 border border-amber-300/80 rounded-xl px-3.5 py-2.5 text-center text-xs font-bold text-amber-950 mb-3.5 shadow-2xs relative z-10">
            ✨ 300+ recipes, meal planner, mom community &amp; smart tools — unified in ONE app.
          </div>

          {/* WhatsApp VIP Announcement Box */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/40 rounded-2xl p-4 border border-amber-200 text-center mb-3 relative z-10 shadow-xs">
            <p className="text-xs sm:text-sm font-extrabold text-gray-900 mb-1 flex items-center justify-center gap-1.5">
              <span>Exclusive details &amp; download link drop in WhatsApp first</span>
              <span className="text-amber-600">🔔</span>
            </p>
            <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed mb-3 max-w-sm mx-auto">
              Early app walkthrough videos, sneak peeks, and founding-member perks are shared strictly inside our VIP group.
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
          </div>

          <p className="text-center text-[10.5px] text-gray-500 flex items-center justify-center gap-1.5 relative z-10">
            <Download className="w-3.5 h-3.5 text-amber-600" />
            The app will be free to download on November 30 — details in the group
          </p>
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
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
            Free Access →
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
          Nourishing tiny bodies with whole, joyful foods. 🥕🧀
        </p>
      </footer>
    </div>
  );
};

export default CarrotCheeseWaffles;
