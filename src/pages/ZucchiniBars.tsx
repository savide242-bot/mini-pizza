import { useState } from "react";
import zucchiniImg from "@/assets/recipe-zucchini-bars.webp";
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
  Timer,
  Zap,
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
    title: "Coarsely grate the zucchini",
    time: "4 min",
    body: "Wash and dry the zucchini thoroughly. Using the coarse side of a box grater, grate into long ribbons. Leave the skin intact—it softens completely during baking, retains essential fiber, and creates beautiful vibrant green flecks.",
    tip: "Do not peel the zucchini! The dark skin is packed with gentle lutein and antioxidants for baby's vision.",
  },
  {
    title: "Squeeze out all moisture (The golden secret!)",
    time: "3 min",
    body: "Place the grated zucchini into a clean kitchen tea towel or cheesecloth. Twist the towel firmly and squeeze with both hands over the sink until no more green liquid drips out.",
    tip: "Squeezing out excess water is the #1 secret! Dry zucchini ensures bars that bake firm, golden, and easy to hold without turning soggy.",
  },
  {
    title: "Whisk eggs & seasonings",
    time: "2 min",
    body: "In a large mixing bowl, crack the 3 pasture-raised eggs. Whisk vigorously for 1 minute until bubbly and pale. Stir in garlic powder, mild onion powder, and finely minced fresh herbs.",
    tip: "Whisking incorporates tiny air bubbles that give the baked bars a light, pillowy, melt-on-the-gums texture.",
  },
  {
    title: "Fold in zucchini, cheese & oat flour",
    time: "3 min",
    body: "Add the dry squeezed zucchini, shredded cheddar cheese, grated parmesan, and oat flour into the bowl. Fold gently with a spatula until every shred is evenly coated in the egg and cheese batter.",
    tip: "Let the batter rest for 3 minutes so the oat flour absorbs any lingering moisture and binds everything tightly.",
  },
  {
    title: "Spread into baking dish or shape into bars",
    time: "3 min",
    body: "Line an 8x8 inch baking dish with parchment paper (or brush lightly with olive oil). Transfer the batter and spread evenly to about 1/2-inch (1.5 cm) thickness. Smooth the top with the back of a silicone spatula.",
    tip: "Pressing down lightly ensures a uniform thickness so the edges and center bake at the exact same speed.",
  },
  {
    title: "Bake to golden perfection",
    time: "22 min",
    body: "Oven: Bake at 190°C (375°F) for 20–22 minutes until puffed, golden brown on top, and a toothpick inserted in the center comes out clean. Air Fryer: Bake in silicone bar molds at 175°C (350°F) for 12–14 minutes.",
  },
  {
    title: "Cool 10 min, slice into bars & assemble plate",
    time: "5 min",
    body: "Let the bake rest in the pan for 10 minutes—the melted cheese firms up just enough to create a sturdy finger-grip that won't crumble. Slice into 12 finger-friendly bars. Test with the squish test, then serve with cool Greek yogurt and sweet diced strawberries!",
  },
];

const baseIngredients = [
  { amount: 2, unit: "medium", item: "fresh zucchinis (coarsely grated & squeezed bone-dry in a towel)" },
  { amount: 3, unit: "large", item: "pasture-raised eggs (whisked — complete protein & brain choline)" },
  { amount: 1, unit: "cup", item: "cheddar or mozzarella cheese, freshly shredded (calcium powerhouse)" },
  { amount: 0.33, unit: "cup", item: "oat flour (or rolled oats lightly blended / whole wheat flour)" },
  { amount: 2, unit: "tbsp", item: "parmesan cheese, finely grated (adds savory golden crust)" },
  { amount: 0.25, unit: "tsp", item: "garlic powder & mild onion powder" },
  { amount: 1, unit: "tbsp", item: "fresh parsley or dill, finely chopped (optional)" },
  { amount: 1, unit: "tsp", item: "extra virgin olive oil (to lightly grease parchment paper)" },
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

const ZucchiniBars = () => {
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
          title: "Baked Zucchini, Egg & Cheese Bars",
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
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-xs tracking-tight text-emerald-950 block leading-tight">
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
            src={zucchiniImg}
            alt="Baked zucchini egg and cheese finger bars served in a sage suction plate with cool Greek yogurt dip and sweet diced strawberries"
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
              Zucchini &amp; Egg Superfood
            </span>
            <span className="bg-amber-500 text-white px-3.5 py-1 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              8+ Months
            </span>
          </div>

          <div className="absolute bottom-2 left-4 right-4 flex items-center gap-2">
            <span className="bg-emerald-700/80 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Brain Choline
            </span>
            <span className="bg-amber-800/80 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              Freezer-Friendly
            </span>
            <span className="bg-stone-900/70 backdrop-blur-md text-white text-[9.5px] font-semibold px-2.5 py-0.5 rounded-md">
              BLW Approved
            </span>
          </div>
        </div>

        {/* Title & Quick Stats Card */}
        <div className="px-4 pt-3 pb-3">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-1.5">
            Baked Zucchini, Egg &amp; Cheese Bars
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
            Golden, oven-baked veggie finger bars loaded with freshly shredded zucchini,
            pasture-raised eggs, and rich melted cheese. Crispy on the outside with a soft,
            pillowy center — engineered for tiny fists, easy gumming, and zero mess.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { icon: Clock, label: "Prep", value: "12 min" },
              { icon: Flame, label: "Bake Time", value: "22 min" },
              { icon: Users, label: "Makes", value: multiplier === 1 ? "12 Bars" : "24 Bars" },
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
              icon: Zap,
              label: "Brain Choline",
              desc: "Whole Pasture Eggs",
              color: "text-amber-700 bg-amber-50 border-amber-200/80",
            },
            {
              icon: Brain,
              label: "Tender Digestion",
              desc: "Gentle Zucchini Fiber",
              color: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
            },
            {
              icon: Heart,
              label: "Strong Bones",
              desc: "Calcium Rich Cheese",
              color: "text-rose-600 bg-rose-50 border-rose-200/80",
            },
            {
              icon: Sparkles,
              label: "Palmar Grasp",
              desc: "Hold Without Break",
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

        <div className="mt-3.5 bg-gradient-to-r from-emerald-50/70 via-amber-50/50 to-orange-50/60 p-3.5 rounded-xl border border-emerald-200/60 text-xs text-gray-700 leading-relaxed shadow-2xs">
          <p>
            <strong>The power of zucchini, eggs &amp; cheese:</strong> Whole eggs supply choline, essential fatty acids, and complete bioavailable protein for brain growth leaps, while zucchini delivers gentle soluble fiber, potassium, and vitamins A &amp; C. Melted cheese binds the grated shreds into savory golden finger bars that babies can easily grasp in a fist and gum safely!
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
                  ? "bg-emerald-700 text-white shadow-2xs"
                  : "text-amber-800 hover:text-amber-950"
              }`}
            >
              1x (12 bars)
            </button>
            <button
              onClick={() => setMultiplier(2)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                multiplier === 2
                  ? "bg-emerald-700 text-white shadow-2xs"
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
                className="py-2.5 px-1.5 flex items-start gap-3 cursor-pointer group hover:bg-emerald-50/40 rounded-lg transition-colors"
              >
                <div
                  className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-emerald-600 text-white"
                      : "border border-gray-300 group-hover:border-emerald-400 bg-white"
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

        {/* Dipping & Fruit Duo Bonus Box (from the photo) */}
        <div className="mt-3 bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Plating Complements (from the photo):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-900/95 mt-1.5">
            <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
              <strong>1. Cool Greek Yogurt Dip:</strong> 3 tbsp whole-milk plain Greek yogurt + 1 drop fresh lemon juice + pinch of fresh dill or mint.
            </div>
            <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
              <strong>2. Sweet Strawberry Bites:</strong> 4–5 ripe strawberries, washed and quartered or diced into safe bite-sized pincer pieces.
            </div>
          </div>
        </div>

        {/* Allergy & Substitute Note */}
        <div className="mt-2.5 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Smart Allergy Swaps:</strong>
            <span className="block text-amber-800/90 mt-0.5">
              • <strong>Egg-free:</strong> 3/4 cup mashed silken tofu or chickpea flour slurry (3/4 cup chickpea flour + 1/2 cup warm water).<br />
              • <strong>Dairy-free:</strong> Use shredded vegan cheddar/mozzarella or 3 tbsp nutritional yeast + 1 tbsp olive oil.<br />
              • <strong>Gluten-free:</strong> Naturally 100% gluten-free when using certified gluten-free oat flour or almond flour.
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
              Follow these simple steps for golden, fail-proof zucchini bars
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Timer className="w-3 h-3" />
            35 min total
          </span>
        </div>

        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li
              key={i}
              className="bg-white border border-amber-100 rounded-2xl p-3.5 shadow-2xs hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-amber-500 text-white flex items-center justify-center text-[11px] font-black flex-shrink-0 shadow-xs mt-0.5">
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
                    <div className="mt-2 text-[10.5px] text-emerald-900 bg-emerald-50/80 border border-emerald-200/70 rounded-lg p-2 flex items-start gap-1.5 leading-snug">
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
              title: "Palmar Grasp & Finger Bars",
              badgeBg: "bg-emerald-600",
              text: "Serve 1 whole finger-length bar (approx. 3 inches long). Baby grasps it comfortably with a full fist and chews off tender bites without the bar crumbling.",
            },
            {
              age: "10–12 mo",
              title: "Pincer Grasp Cubes",
              badgeBg: "bg-amber-600",
              text: "Slice bars into bite-sized 1-cm cubes. Perfect for encouraging thumb-and-forefinger coordination and chewing confidence.",
            },
            {
              age: "12+ mo & Toddlers",
              title: "Whole Bars & Dipping Fun",
              badgeBg: "bg-orange-600",
              text: "Serve whole bars alongside the Greek yogurt dip and fresh strawberries! Toddlers love practicing motor dipping skills and self-feeding independence.",
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
        <div className="mt-3 bg-white border border-emerald-200 rounded-xl p-3 text-[11px] text-gray-700 flex gap-2.5 shadow-2xs items-start">
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
            ✓
          </div>
          <div>
            <strong className="text-gray-900 block font-bold mb-0.5">
              The Golden Rule: The Squish Test
            </strong>
            Always press a bar between your thumb and forefinger before offering to baby.
            It should easily yield and flatten with gentle pressure — simulating how baby’s gums
            will compress and chew the food. Never serve piping hot!
          </div>
        </div>
      </section>

      {/* Why Moms Love It */}
      <section className="px-4 py-3 max-w-2xl mx-auto">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight mb-2 flex items-center gap-1.5">
          <span>🧡 Why Moms Love It</span>
        </h2>
        <div className="bg-gradient-to-br from-emerald-50/70 via-amber-50/60 to-orange-50/40 rounded-2xl p-4 border border-emerald-200/80 shadow-2xs">
          <ul className="space-y-2 text-xs text-gray-800">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Sneaky Veggie Triumph:</strong> The irresistible savory aroma of melted cheddar mask the green vegetable taste so even picky toddlers happily gobble zucchini.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Brain-Fueling Choline &amp; Protein:</strong> 3 pasture eggs deliver complete bioavailable amino acids and choline for neurological leaps.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>No Salt, No Additives:</strong> Clean, wholesome ingredients that protect developing kidneys while delighting baby's palate.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Freezer Batch Savior:</strong> Double the batch, freeze flat, and warm 2 bars in the toaster oven or air fryer in under 4 minutes.
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
              text: "Store cooled bars in an airtight container lined with a paper towel for up to 4 days.",
            },
            {
              title: "Freezer (3 Months)",
              text: "Flash-freeze sliced bars on a baking tray for 1 hour until solid, then transfer into an airtight freezer container or silicone bag.",
            },
            {
              title: "How to Reheat in 3 Minutes",
              text: "Air fry from frozen at 170°C (340°F) for 3–4 minutes, or reheat in a toaster oven for 6–7 minutes until warm and slightly crisp. Cool slightly before serving.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs">
              <Snowflake className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
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
        <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
          <ChefHat className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold text-gray-700">BabyBites</p>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
          Nourishing tiny bodies with whole, joyful foods. 🥒🧀
        </p>
      </footer>
    </div>
  );
};

export default ZucchiniBars;
