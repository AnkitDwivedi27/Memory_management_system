import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MemoryInput = ({
  onRunComparison
}) => {
  const [blocks, setBlocks] = useState([100, 500, 200, 300, 600]);
  const [processes, setProcesses] = useState([212, 417, 112, 426]);
  const [newBlock, setNewBlock] = useState("");
  const [newProcess, setNewProcess] = useState("");
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(["First Fit", "Best Fit", "Worst Fit", "Next Fit"]);
  const handleAddBlock = () => {
    const value = parseInt(newBlock);
    if (value > 0) {
      setBlocks([...blocks, value]);
      setNewBlock("");
    }
  };
  const handleAddProcess = () => {
    const value = parseInt(newProcess);
    if (value > 0) {
      setProcesses([...processes, value]);
      setNewProcess("");
    }
  };
  const handleRemoveBlock = index => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };
  const handleRemoveProcess = index => {
    setProcesses(processes.filter((_, i) => i !== index));
  };
  const handleAlgorithmToggle = algorithm => {
    setSelectedAlgorithms(prev => prev.includes(algorithm) ? prev.filter(a => a !== algorithm) : [...prev, algorithm]);
  };
  const handleRunComparison = () => {
    if (blocks.length > 0 && processes.length > 0 && selectedAlgorithms.length > 0) {
      onRunComparison(blocks, processes, selectedAlgorithms);
    }
  };
  return /*#__PURE__*/_jsx(Card, {
    className: "p-6 shadow-card",
    children: /*#__PURE__*/_jsxs("div", {
      className: "space-y-6",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "space-y-3",
        children: [/*#__PURE__*/_jsx(Label, {
          className: "text-base font-semibold",
          children: "Memory Blocks (KB)"
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex gap-2",
          children: [/*#__PURE__*/_jsx(Input, {
            type: "number",
            placeholder: "Enter block size",
            value: newBlock,
            onChange: e => setNewBlock(e.target.value),
            onKeyDown: e => e.key === "Enter" && handleAddBlock(),
            className: "flex-1"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleAddBlock,
            size: "icon",
            variant: "secondary",
            children: /*#__PURE__*/_jsx(Plus, {
              className: "h-4 w-4"
            })
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "flex flex-wrap gap-2",
          children: blocks.map((block, index) => /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-md text-sm font-medium",
            children: [block, " KB", /*#__PURE__*/_jsx("button", {
              onClick: () => handleRemoveBlock(index),
              className: "hover:text-destructive transition-colors",
              children: /*#__PURE__*/_jsx(Trash2, {
                className: "h-3 w-3"
              })
            })]
          }, index))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "space-y-3",
        children: [/*#__PURE__*/_jsx(Label, {
          className: "text-base font-semibold",
          children: "Processes (KB)"
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex gap-2",
          children: [/*#__PURE__*/_jsx(Input, {
            type: "number",
            placeholder: "Enter process size",
            value: newProcess,
            onChange: e => setNewProcess(e.target.value),
            onKeyDown: e => e.key === "Enter" && handleAddProcess(),
            className: "flex-1"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleAddProcess,
            size: "icon",
            variant: "secondary",
            children: /*#__PURE__*/_jsx(Plus, {
              className: "h-4 w-4"
            })
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "flex flex-wrap gap-2",
          children: processes.map((process, index) => /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-md text-sm font-medium",
            children: ["P", index + 1, ": ", process, " KB", /*#__PURE__*/_jsx("button", {
              onClick: () => handleRemoveProcess(index),
              className: "hover:text-destructive transition-colors",
              children: /*#__PURE__*/_jsx(Trash2, {
                className: "h-3 w-3"
              })
            })]
          }, index))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "space-y-3",
        children: [/*#__PURE__*/_jsx(Label, {
          className: "text-base font-semibold",
          children: "Select Algorithms to Run"
        }), /*#__PURE__*/_jsx("div", {
          className: "flex flex-col gap-3",
          children: ["First Fit", "Best Fit", "Worst Fit", "Next Fit"].map(algorithm => /*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/_jsx(Checkbox, {
              id: algorithm,
              checked: selectedAlgorithms.includes(algorithm),
              onCheckedChange: () => handleAlgorithmToggle(algorithm)
            }), /*#__PURE__*/_jsx("label", {
              htmlFor: algorithm,
              className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
              children: algorithm
            })]
          }, algorithm))
        })]
      }), /*#__PURE__*/_jsx(Button, {
        onClick: handleRunComparison,
        className: "w-full bg-gradient-primary text-white font-semibold shadow-elegant hover:opacity-90 transition-opacity",
        size: "lg",
        disabled: blocks.length === 0 || processes.length === 0 || selectedAlgorithms.length === 0,
        children: "Run Comparison"
      })]
    })
  });
};