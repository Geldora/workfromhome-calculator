
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormProvider } from "@/context/FormContext";

// Import pages
import WorkFromHome from "./pages/WorkFromHome";
import CostCalculation from "./pages/CostCalculation";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import WorkingDaysCalculatorPage from "./pages/WorkingDaysCalculatorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FormProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WorkFromHome />} />
            <Route path="/index" element={<Navigate to="/" replace />} />
            <Route path="/costs" element={<CostCalculation />} />
            <Route path="/results" element={<Results />} />
            <Route path="/working-days" element={<WorkingDaysCalculatorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
