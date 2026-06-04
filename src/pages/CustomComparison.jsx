import { useState } from "react";
import { MemoryInput } from "@/components/MemoryInput";
import { AlgorithmResult } from "@/components/AlgorithmResult";
import { MemoryVisualization } from "@/components/MemoryVisualization";
import { firstFit, bestFit, worstFit, nextFit } from "@/lib/memoryAlgorithms";
import { Cpu, ArrowLeft, Layers, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const CustomComparison = () => {
  const [results, setResults] = useState(null);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const handleRunComparison = (blocks, processes, algorithms) => {
    const firstFitResult = algorithms.includes("First Fit") ? firstFit(blocks, processes) : null;
    const bestFitResult = algorithms.includes("Best Fit") ? bestFit(blocks, processes) : null;
    const worstFitResult = algorithms.includes("Worst Fit") ? worstFit(blocks, processes) : null;
    const nextFitResult = algorithms.includes("Next Fit") ? nextFit(blocks, processes) : null;

    // Only compare the algorithms that were actually run
    const results = [{
      name: "First Fit",
      result: firstFitResult
    }, {
      name: "Best Fit",
      result: bestFitResult
    }, {
      name: "Worst Fit",
      result: worstFitResult
    }, {
      name: "Next Fit",
      result: nextFitResult
    }].filter(item => item.result !== null);
    let bestAlgorithm = "";
    if (results.length > 0) {
      bestAlgorithm = results.reduce((best, current) => {
        const bestScore = best.result.allocatedCount + best.result.utilization / 100;
        const currentScore = current.result.allocatedCount + current.result.utilization / 100;
        return currentScore > bestScore ? current : best;
      }).name;
    }
    setResults({
      firstFit: firstFitResult,
      bestFit: bestFitResult,
      worstFit: worstFitResult,
      nextFit: nextFitResult,
      bestAlgorithm,
      blocks,
      processes
    });
    setSelectedAlgorithms(algorithms);
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
                children: "Custom Algorithm Selection"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-muted-foreground",
                children: "Choose which algorithms to compare"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex gap-2",
            children: [/*#__PURE__*/_jsx(Link, {
              to: "/",
              children: /*#__PURE__*/_jsxs(Button, {
                variant: "outline",
                className: "gap-2",
                children: [/*#__PURE__*/_jsx(ArrowLeft, {
                  className: "h-4 w-4"
                }), "Compare All"]
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
          children: /*#__PURE__*/_jsx(MemoryInput, {
            onRunComparison: handleRunComparison
          })
        }), results && /*#__PURE__*/_jsxs("div", {
          className: "space-y-8 animate-in fade-in duration-500",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h2", {
              className: "text-2xl font-bold mb-4",
              children: "Algorithm Comparison"
            }), /*#__PURE__*/_jsxs("div", {
              className: `grid grid-cols-1 ${selectedAlgorithms.length === 2 ? 'md:grid-cols-2' : selectedAlgorithms.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`,
              children: [selectedAlgorithms.includes("First Fit") && results.firstFit && /*#__PURE__*/_jsx(AlgorithmResult, {
                name: "First Fit",
                result: results.firstFit,
                blocks: results.blocks,
                processes: results.processes,
                isBest: results.bestAlgorithm === "First Fit"
              }), selectedAlgorithms.includes("Best Fit") && results.bestFit && /*#__PURE__*/_jsx(AlgorithmResult, {
                name: "Best Fit",
                result: results.bestFit,
                blocks: results.blocks,
                processes: results.processes,
                isBest: results.bestAlgorithm === "Best Fit"
              }), selectedAlgorithms.includes("Worst Fit") && results.worstFit && /*#__PURE__*/_jsx(AlgorithmResult, {
                name: "Worst Fit",
                result: results.worstFit,
                blocks: results.blocks,
                processes: results.processes,
                isBest: results.bestAlgorithm === "Worst Fit"
              }), selectedAlgorithms.includes("Next Fit") && results.nextFit && /*#__PURE__*/_jsx(AlgorithmResult, {
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
              className: `grid grid-cols-1 ${selectedAlgorithms.length === 2 ? 'md:grid-cols-2' : selectedAlgorithms.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`,
              children: [selectedAlgorithms.includes("First Fit") && results.firstFit && /*#__PURE__*/_jsx(MemoryVisualization, {
                blocks: results.blocks,
                processes: results.processes,
                allocation: results.firstFit.allocation,
                title: "First Fit"
              }), selectedAlgorithms.includes("Best Fit") && results.bestFit && /*#__PURE__*/_jsx(MemoryVisualization, {
                blocks: results.blocks,
                processes: results.processes,
                allocation: results.bestFit.allocation,
                title: "Best Fit"
              }), selectedAlgorithms.includes("Worst Fit") && results.worstFit && /*#__PURE__*/_jsx(MemoryVisualization, {
                blocks: results.blocks,
                processes: results.processes,
                allocation: results.worstFit.allocation,
                title: "Worst Fit"
              }), selectedAlgorithms.includes("Next Fit") && results.nextFit && /*#__PURE__*/_jsx(MemoryVisualization, {
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
export default CustomComparison;