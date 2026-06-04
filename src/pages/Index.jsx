import { useState } from "react";
import { MemoryInputSimple } from "@/components/MemoryInputSimple";
import { AlgorithmResult } from "@/components/AlgorithmResult";
import { MemoryVisualization } from "@/components/MemoryVisualization";
import { firstFit, bestFit, worstFit, nextFit, compareResults } from "@/lib/memoryAlgorithms";
import { Cpu, Settings, Layers, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Index = () => {
  const [results, setResults] = useState(null);
  const handleRunComparison = (blocks, processes) => {
    const firstFitResult = firstFit(blocks, processes);
    const bestFitResult = bestFit(blocks, processes);
    const worstFitResult = worstFit(blocks, processes);
    const nextFitResult = nextFit(blocks, processes);
    const bestAlgorithm = compareResults(firstFitResult, bestFitResult, worstFitResult, nextFitResult);
    setResults({
      firstFit: firstFitResult,
      bestFit: bestFitResult,
      worstFit: worstFitResult,
      nextFit: nextFitResult,
      bestAlgorithm,
      blocks,
      processes
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen bg-background",
    children: [/*#__PURE__*/_jsx("header", {
      className: "border-b bg-card shadow-card",
      children: /*#__PURE__*/_jsx("div", {
        className: "container mx-auto px-4 py-6",
        children: /*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsx("div", {
              className: "p-2 bg-gradient-primary rounded-lg",
              children: /*#__PURE__*/_jsx(Cpu, {
                className: "h-6 w-6 text-white"
              })
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h1", {
                className: "text-3xl font-bold",
                children: "Memory Management Comparison"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-muted-foreground",
                children: "Compare First Fit, Best Fit, Worst Fit, and Next Fit algorithms"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex gap-2",
            children: [/*#__PURE__*/_jsx(Link, {
              to: "/custom",
              children: /*#__PURE__*/_jsxs(Button, {
                variant: "outline",
                className: "gap-2",
                children: [/*#__PURE__*/_jsx(Settings, {
                  className: "h-4 w-4"
                }), "Custom Selection"]
              })
            }), /*#__PURE__*/_jsx(Link, {
              to: "/paging",
              children: /*#__PURE__*/_jsxs(Button, {
                variant: "outline",
                className: "gap-2",
                children: [/*#__PURE__*/_jsx(Layers, {
                  className: "h-4 w-4"
                }), "Paging Simulation"]
              })
            }), /*#__PURE__*/_jsx(Link, {
              to: "/page-replacement",
              children: /*#__PURE__*/_jsxs(Button, {
                variant: "outline",
                className: "gap-2",
                children: [/*#__PURE__*/_jsx(RefreshCw, {
                  className: "h-4 w-4"
                }), "Page Replacement"]
              })
            })]
          })]
        })
      })
    }), /*#__PURE__*/_jsx("main", {
      className: "container mx-auto px-4 py-8",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto space-y-8",
        children: [/*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx(MemoryInputSimple, {
            onRunComparison: handleRunComparison
          })
        }), results && /*#__PURE__*/_jsxs("div", {
          className: "space-y-8 animate-in fade-in duration-500",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-2xl font-bold mb-4",
              children: "Algorithm Comparison"
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
              children: [/*#__PURE__*/_jsx(AlgorithmResult, {
                name: "First Fit",
                result: results.firstFit,
                blocks: results.blocks,
                processes: results.processes,
                isBest: results.bestAlgorithm === "First Fit"
              }), /*#__PURE__*/_jsx(AlgorithmResult, {
                name: "Best Fit",
                result: results.bestFit,
                blocks: results.blocks,
                processes: results.processes,
                isBest: results.bestAlgorithm === "Best Fit"
              }), /*#__PURE__*/_jsx(AlgorithmResult, {
                name: "Worst Fit",
                result: results.worstFit,
                blocks: results.blocks,
                processes: results.processes,
                isBest: results.bestAlgorithm === "Worst Fit"
              }), /*#__PURE__*/_jsx(AlgorithmResult, {
                name: "Next Fit",
                result: results.nextFit,
                blocks: results.blocks,
                processes: results.processes,
                isBest: results.bestAlgorithm === "Next Fit"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-2xl font-bold mb-4",
              children: "Memory Layout"
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
              children: [/*#__PURE__*/_jsx(MemoryVisualization, {
                blocks: results.blocks,
                processes: results.processes,
                allocation: results.firstFit.allocation,
                title: "First Fit"
              }), /*#__PURE__*/_jsx(MemoryVisualization, {
                blocks: results.blocks,
                processes: results.processes,
                allocation: results.bestFit.allocation,
                title: "Best Fit"
              }), /*#__PURE__*/_jsx(MemoryVisualization, {
                blocks: results.blocks,
                processes: results.processes,
                allocation: results.worstFit.allocation,
                title: "Worst Fit"
              }), /*#__PURE__*/_jsx(MemoryVisualization, {
                blocks: results.blocks,
                processes: results.processes,
                allocation: results.nextFit.allocation,
                title: "Next Fit"
              })]
            })]
          })]
        })]
      })
    })]
  });
};
export default Index;