import { Card } from "@/components/ui/card";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const MemoryVisualization = ({
  blocks,
  processes,
  allocation,
  title
}) => {
  const maxBlock = Math.max(...blocks);

  // Calculate which processes are allocated to each block
  const blockAllocations = blocks.map((_, blockIdx) => {
    return processes.map((process, processIdx) => allocation[processIdx] === blockIdx ? {
      processIdx,
      size: process
    } : null).filter(Boolean);
  });
  return /*#__PURE__*/_jsxs(Card, {
    className: "p-6 shadow-card",
    children: [/*#__PURE__*/_jsx("h3", {
      className: "text-lg font-semibold mb-4",
      children: title
    }), /*#__PURE__*/_jsx("div", {
      className: "space-y-3",
      children: blocks.map((blockSize, blockIdx) => {
        const allocated = blockAllocations[blockIdx];
        const usedSpace = allocated.reduce((sum, a) => sum + a.size, 0);
        const freeSpace = blockSize - usedSpace;
        const usedPercentage = usedSpace / blockSize * 100;
        return /*#__PURE__*/_jsxs("div", {
          className: "space-y-1",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex justify-between items-center text-xs text-muted-foreground",
            children: [/*#__PURE__*/_jsxs("span", {
              className: "font-medium",
              children: ["Block ", blockIdx + 1, " (", blockSize, " KB)"]
            }), /*#__PURE__*/_jsxs("span", {
              children: [usedPercentage.toFixed(0), "% used"]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "relative h-10 bg-secondary rounded-lg overflow-hidden",
            children: [allocated.map((alloc, idx) => {
              const percentage = alloc.size / blockSize * 100;
              const previousPercentage = allocated.slice(0, idx).reduce((sum, a) => sum + a.size / blockSize * 100, 0);
              return /*#__PURE__*/_jsxs("div", {
                className: "absolute top-0 bottom-0 bg-gradient-primary flex items-center justify-center text-xs font-semibold text-white",
                style: {
                  left: `${previousPercentage}%`,
                  width: `${percentage}%`
                },
                children: ["P", alloc.processIdx + 1]
              }, idx);
            }), freeSpace > 0 && /*#__PURE__*/_jsx("div", {
              className: "absolute top-0 bottom-0 flex items-center justify-center text-xs text-muted-foreground",
              style: {
                left: `${usedPercentage}%`,
                width: `${100 - usedPercentage}%`
              },
              children: freeSpace > blockSize * 0.15 && `${freeSpace} KB free`
            })]
          })]
        }, blockIdx);
      })
    })]
  });
};