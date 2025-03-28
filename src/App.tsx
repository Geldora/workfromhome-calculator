
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormProvider } from "@/context/FormContext";
import { lazy, Suspense } from "react";

// Lazily load pages
const WorkFromHome = lazy(() => import("./pages/WorkFromHome"));
const CostCalculation = lazy(() => import("./pages/CostCalculation"));
const Results = lazy(() => import("./pages/Results"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WorkingDaysCalculatorPage = lazy(() => import("./pages/WorkingDaysCalculatorPage"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

// Create query client with better performance settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FormProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<WorkFromHome />} />
              <Route path="/index" element={<Navigate to="/" replace />} />
              <Route path="/costs" element={<CostCalculation />} />
              <Route path="/results" element={<Results />} />
              <Route path="/working-days" element={<WorkingDaysCalculatorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
