import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomComparison from "./pages/CustomComparison";
import Paging from "./pages/Paging";
import PageReplacement from "./pages/PageReplacement";
import NotFound from "./pages/NotFound";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const queryClient = new QueryClient();
const App = () => /*#__PURE__*/_jsx(QueryClientProvider, {
  client: queryClient,
  children: /*#__PURE__*/_jsxs(TooltipProvider, {
    children: [/*#__PURE__*/_jsx(Toaster, {}), /*#__PURE__*/_jsx(Sonner, {}), /*#__PURE__*/_jsx(BrowserRouter, {
      children: /*#__PURE__*/_jsxs(Routes, {
        children: [/*#__PURE__*/_jsx(Route, {
          path: "/",
          element: /*#__PURE__*/_jsx(Index, {})
        }), /*#__PURE__*/_jsx(Route, {
          path: "/custom",
          element: /*#__PURE__*/_jsx(CustomComparison, {})
        }), /*#__PURE__*/_jsx(Route, {
          path: "/paging",
          element: /*#__PURE__*/_jsx(Paging, {})
        }), /*#__PURE__*/_jsx(Route, {
          path: "/page-replacement",
          element: /*#__PURE__*/_jsx(PageReplacement, {})
        }), /*#__PURE__*/_jsx(Route, {
          path: "*",
          element: /*#__PURE__*/_jsx(NotFound, {})
        })]
      })
    })]
  })
});
export default App;