import { useState } from "react";
import cauliflowerTotsImg from "@/assets/recipe-cauliflower-tots.webp";
import {
  Check,
  Clock,
  Brain,
  Leaf,
  Heart,
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
  CheckCircle2,
  Info,
  Timer,
  ThumbsUp,
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
    title: "Steam the cauliflower & broccoli",
    time: "7 min",
    body: "Cut cauliflower and broccoli into florets. Steam over boiling water for 6–8 minutes until completely fork-tender. Do not boil directly in water to prevent them from becoming waterlogged.",
    tip: "Steaming keeps natural sweetness high and preserves vital heat-sensitive vitamins.",
  },
  {
    title: "Squeeze out all moisture (Crucial step!)",
    time: "2 min",
    body: "Transfer the steamed florets to a clean kitchen towel or cheesecloth. Let cool slightly, then twist and squeeze firmly over the sink. Squeeze out as much liquid as you possibly can.",
    tip: "Dry veggies = tots that hold their shape, turn golden-crisp outside, and stay velvety inside.",
  },
  {
    title: "Finely pulse or mince",
    time: "2 min",
    body: "Pulse the squeezed florets in a food processor 4–6 times (or mince finely with a sharp knife). You want fine grain-like pieces similar to cooked rice, not a smooth puree.",
    tip: "Small tender flecks give toddlers the tactile chewing sensation they love without any choking risk.",
  },
  {
    title: "Fold with cheddar, egg & oats",
    time: "3 min",
    body: "In a mixing bowl, combine the pulsed veggies, finely grated cheddar cheese, egg, rolled oats, garlic powder, onion powder, and dried parsley. Fold with a spatula until evenly incorporated.",
    tip: "Let the bowl rest for 5 minutes so the oats absorb residual warmth and bind everything tightly.",
  },
  {
    title: "Shape into 16 tot cylinders",
    time: "4 min",
    body: "Lightly moisten your palms with water or olive oil. Scoop 1 rounded tablespoon of mixture and roll into compact tots (about thumb-length cylinders) or gentle nugget rounds.",
    tip: "Moist hands prevent sticking and create a smoother, prettier crust.",
  },
  {
    title: "Bake or Air Fry to golden bliss",
    time: "20 min",
    body: "Oven: Place tots on a parchment-lined baking sheet. Bake at 190°C (375°F) for 18–20 minutes, flipping gently at minute 12 until golden and lightly crisped. Air Fryer: 180°C (350°F) for 10–12 minutes.",
  },
  {
    title: "Rest, squish test & serve with dips",
    time: "5 min",
    body: "Let the tots rest for 5 minutes right out of the oven. The cheddar firms up as it settles, making them sturdy for tiny fists. Always test by squishing one between thumb and forefinger before serving.",
  },
];

const baseIngredients = [
  { amount: 2, unit: "cups", item: "cauliflower florets (steamed & squeezed dry)" },
  { amount: 0.5, unit: "cup", item: "broccoli florets (steamed for colorful green specks)" },
  { amount: 1, unit: "cup", item: "sharp cheddar cheese, finely grated (fresh melts best)" },
  { amount: 1, unit: "", item: "large egg (beaten, acts as binder)" },
  { amount: 0.5, unit: "cup", item: "rolled oats (blended or quick oats)" },
  { amount: 0.25, unit: "cup", item: "cooked quinoa or almond flour (adds protein & grip)" },
  { amount: 0.25, unit: "tsp", item: "garlic powder & mild onion powder" },
  { amount: 1, unit: "tbsp", item: "fresh parsley or chives, minced (optional)" },
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

const Index = () => {
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
          title: "Steamed Cauliflower & Cheddar Tots",
          text: "Check out this amazing toddler & baby-led weaning recipe!",
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
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white shadow-xs">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-xs tracking-tight text-emerald-900 block leading-tight">
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1"
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
            src={cauliflowerTotsImg}
            alt="Steamed cauliflower and cheddar tots arranged in a soft sage suction plate alongside cool Greek yogurt dip and creamy mashed avocado"
            width={1200}
            height={1500}
            className="w-full h-[320px] sm:h-[400px] object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/20" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-4 right-4 flex justify-between items-center">
            <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-800 shadow-sm border border-emerald-100/50 flex items-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-600" />
              Veggie &amp; Cheddar
            </span>
            <span className="bg-amber-500 text-white px-3.5 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              8+ Months
            </span>
          </div>

          <div className="absolute bottom-2 left-4 right-4 flex items-center gap-2">
            <span className="bg-emerald-700/80 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              BLW Approved
            </span>
            <span className="bg-amber-800/80 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Freezer-Friendly
            </span>
            <span className="bg-stone-900/70 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              No Added Salt
            </span>
          </div>
        </div>

        {/* Title & Quick Stats Card */}
        <div className="px-4 pt-3 pb-3">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-1.5">
            Steamed Cauliflower &amp; Cheddar Tots
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
            Golden, bite-sized veggie nuggets packed with steamed cauliflower,
            melted cheddar and wholesome grains. Crispy on the outside,
            pillowy-soft inside — engineered for tiny hands and curious eaters.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { icon: Clock, label: "Prep", value: "15 min" },
              { icon: Flame, label: "Steam & Bake", value: "20 min" },
              { icon: Users, label: "Makes", value: multiplier === 1 ? "16 Tots" : "32 Tots" },
              { icon: Snowflake, label: "Freezes", value: "3 Mo" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-amber-200/70 py-2.5 px-1 shadow-xs hover:border-amber-300 transition-colors"
              >
                <Icon className="w-4 h-4 mx-auto text-amber-600 mb-1" />
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
              icon: Brain,
              label: "Brain Fats",
              desc: "Cheddar & Avocado",
              color: "text-amber-600 bg-amber-50 border-amber-200/80",
            },
            {
              icon: Leaf,
              label: "Hidden Veg",
              desc: "Mild & Sweet",
              color: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
            },
            {
              icon: Heart,
              label: "Bone Builder",
              desc: "Calcium Rich",
              color: "text-rose-600 bg-rose-50 border-rose-200/80",
            },
            {
              icon: Sparkles,
              label: "Pincer Grasp",
              desc: "Easy Grip",
              color: "text-orange-600 bg-orange-50 border-orange-200/80",
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

        <div className="mt-3.5 bg-gradient-to-r from-amber-50/70 via-emerald-50/50 to-orange-50/60 p-3.5 rounded-xl border border-amber-200/60 text-xs text-gray-700 leading-relaxed shadow-2xs">
          <p>
            <strong>Why little ones finish the plate:</strong> Cauliflower when
            steamed turns remarkably gentle and sweet. Combined with melted sharp
            cheddar and hearty oats, it forms a cohesive, savory tot that won’t
            crumble into a dry mess in a baby’s fist. Served with cooling Greek
            yogurt and mashed avocado, this meal turns self-feeding into pure joy.
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
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "text-amber-800 hover:text-amber-950"
              }`}
            >
              1x (16 tots)
            </button>
            <button
              onClick={() => setMultiplier(2)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                multiplier === 2
                  ? "bg-amber-600 text-white shadow-2xs"
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
            const scaledAmount = item.amount * multiplier;
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className="py-2.5 px-1.5 flex items-start gap-3 cursor-pointer group hover:bg-amber-50/40 rounded-lg transition-colors"
              >
                <div
                  className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-emerald-600 text-white"
                      : "border border-gray-300 group-hover:border-amber-400 bg-white"
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

        {/* Dipping Duo Bonus Box */}
        <div className="mt-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The 2-Minute Dipping Duo (from the photo):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-900/90 mt-1.5">
            <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
              <strong>1. Cool Greek Yogurt Dip:</strong> 3 tbsp plain whole-milk Greek yogurt + 1 drop lemon juice + pinch of dried dill or mint.
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
              <strong>2. Fresh Avocado Mash:</strong> 1/2 ripe avocado mashed with 1 tsp warm water or breastmilk/formula until silky smooth.
            </div>
          </div>
        </div>

        {/* Allergy & Substitute Note */}
        <div className="mt-2.5 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Smart Allergy Swaps:</strong>
            <span className="block text-amber-800/90 mt-0.5">
              • <strong>Egg-free:</strong> 1 tbsp ground flaxseed mixed with 2.5 tbsp warm water (let sit 5 min).<br />
              • <strong>Dairy-free:</strong> Use shredded dairy-free cheddar or 2 tbsp nutritional yeast + pinch of oil.<br />
              • <strong>Gluten-free:</strong> Use certified gluten-free rolled oats.
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
              Follow these simple steps for golden, fail-proof tots
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Timer className="w-3 h-3" />
            35 min total
          </span>
        </div>

        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li
              key={i}
              className="bg-white border border-amber-100 rounded-2xl p-3.5 shadow-2xs hover:border-amber-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-[11px] font-black flex-shrink-0 shadow-xs mt-0.5">
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
                    <div className="mt-2 text-[10.5px] text-amber-800 bg-amber-50/80 border border-amber-200/70 rounded-lg p-2 flex items-start gap-1.5 leading-snug">
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

      {/* Serving by Age & Stage */}
      <section className="px-4 py-4 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-1">
          Serving by Age &amp; Texture Stage
        </h2>
        <p className="text-[11px] text-muted-foreground mb-3">
          Adapt the shape to your baby’s exact feeding stage
        </p>

        <div className="space-y-2.5">
          {[
            {
              age: "8–10 mo",
              title: "Palmar Grasp & Soft Halves",
              badgeBg: "bg-emerald-600",
              text: "Serve cut in half lengthwise into two finger-sized bars, or gently flatten into a mini patty. Baby can grasp with the palm and gum easily.",
            },
            {
              age: "10–12 mo",
              title: "Pincer Grasp Bites",
              badgeBg: "bg-amber-600",
              text: "Cut tots into quarter-sized chunks or coin slices. Encourages thumb-and-forefinger coordination and chewing practice.",
            },
            {
              age: "12+ mo & Toddlers",
              title: "Whole Tots & Dip Practice",
              badgeBg: "bg-orange-600",
              text: "Offer whole tots with the cooling yogurt dip and avocado mash! Great for dip-and-bite motor fun and self-feeding confidence.",
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
        <div className="mt-3 bg-white border border-amber-200 rounded-xl p-3 text-[11px] text-gray-700 flex gap-2.5 shadow-2xs items-start">
          <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
            ✓
          </div>
          <div>
            <strong className="text-gray-900 block font-bold mb-0.5">
              The Golden Rule: The Squish Test
            </strong>
            Always press a tot between your thumb and forefinger before serving.
            It should yield with gentle pressure — simulating how baby’s gums
            will effortlessly compress the food. Never serve piping hot!
          </div>
        </div>
      </section>

      {/* Why Moms Love It */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-2 flex items-center gap-1.5">
          <span>🧡 Why Moms Love It</span>
        </h2>
        <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-emerald-50/40 rounded-2xl p-4 border border-amber-200 shadow-2xs">
          <ul className="space-y-2 text-xs text-gray-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>
                <strong>Zero Fighting over Veggies:</strong> The aroma of
                melted cheddar completely wins over hesitant toddlers, getting
                whole florets of cauliflower and broccoli into happy tummies.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>
                <strong>Rich in Brain Fats &amp; Calcium:</strong> Real whole
                cheddar provides essential fats for rapid brain growth and strong
                teething bones.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>
                <strong>No Added Salt or Preservatives:</strong> Pure whole-food
                ingredients you can pronounce, portioned specifically for
                delicate developing kidneys.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>
                <strong>Sanity Saver Freezer Batch:</strong> Pop 3 frozen tots
                in the air fryer for 3 minutes, add sliced fruit, and lunch is
                served!
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
              text: "Store cooled tots in an airtight container for up to 4 days.",
            },
            {
              title: "Freezer (3 Months)",
              text: "Flash-freeze tots on a baking tray for 1 hour until solid, then transfer into a reusable silicone freezer bag. Won't stick together!",
            },
            {
              title: "How to Reheat in 3 Minutes",
              text: "Air fry from frozen at 170°C (340°F) for 3–4 minutes, or reheat in a toaster oven for 6–7 minutes until warm and crisp. Cool slightly before serving.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs">
              <Snowflake className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
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
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

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

          {/* Punchy Sales Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4 text-left relative z-10">
            {appFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 hover:bg-amber-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
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
          <div className="bg-gradient-to-r from-amber-100/90 to-emerald-100/80 border border-amber-300/80 rounded-xl px-3.5 py-2.5 text-center text-xs font-bold text-amber-950 mb-3.5 shadow-2xs relative z-10">
            ✨ 300+ recipes, meal planner, mom community &amp; smart tools — unified in ONE app.
          </div>

          {/* WhatsApp VIP Announcement Box */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-emerald-50/40 rounded-2xl p-4 border border-amber-200 text-center mb-3 relative z-10 shadow-xs">
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
        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
          <ChefHat className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold text-gray-700">BabyBites</p>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
          Nourishing tiny bodies with whole, joyful foods. 🧡
        </p>
      </footer>
    </div>
  );
};

export default Index;
