import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ZucchiniBars from "./pages/ZucchiniBars";
import CarrotCheeseWaffles from "./pages/CarrotCheeseWaffles";
import SweetPotatoMiniPizzas from "./pages/SweetPotatoMiniPizzas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SweetPotatoMiniPizzas />} />
          <Route path="/sweet-potato-mini-pizzas" element={<SweetPotatoMiniPizzas />} />
          <Route path="/mini-pizzas" element={<SweetPotatoMiniPizzas />} />
          <Route path="/carrot-cheese-waffles" element={<CarrotCheeseWaffles />} />
          <Route path="/savory-carrot-cheese-waffles" element={<CarrotCheeseWaffles />} />
          <Route path="/waffles" element={<CarrotCheeseWaffles />} />
          <Route path="/zucchini-bars" element={<ZucchiniBars />} />
          <Route path="/baked-zucchini-bars" element={<ZucchiniBars />} />
          <Route path="/baked-zucchini-egg-cheese-bars" element={<ZucchiniBars />} />
          <Route path="/broccoli-tots" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
