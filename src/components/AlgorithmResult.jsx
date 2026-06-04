import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, XCircle } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export const AlgorithmResult = ({
  name,
  result,
  blocks,
  processes,
  isBest
}) => {
  const {
    allocation,
    remainingBlocks,
    allocatedCount,
    totalWastage,
    utilization
  } = result;
  const unallocatedCount = processes.length - allocatedCount;
  return /*#__PURE__*/_jsxs(Card, {
    className: `p-6 relative overflow-hidden transition-all ${isBest ? "ring-2 ring-success shadow-elegant" : "shadow-card hover:shadow-elegant"}`,
    children: [isBest && /*#__PURE__*/_jsxs("div", {
      className: "absolute top-0 right-0 bg-success text-success-foreground px-4 py-1.5 rounded-bl-lg flex items-center gap-1.5",
      children: [/*#__PURE__*/_jsx(Award, {
        className: "h-4 w-4"
      }), /*#__PURE__*/_jsx("span", {
        className: "text-sm font-semibold",
        children: "Best"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "space-y-4",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h3", {
          className: "text-xl font-bold mb-2",
          children: name
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [/*#__PURE__*/_jsxs(Badge, {
            variant: "outline",
            className: "bg-primary/5 border-primary/20",
            children: [allocatedCount, "/", processes.length, " Allocated"]
          }), /*#__PURE__*/_jsxs(Badge, {
            variant: "outline",
            className: "bg-accent/5 border-accent/20",
            children: [utilization.toFixed(1), "% Utilized"]
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-2 gap-4 py-4 border-t border-b",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground mb-1",
            children: "Allocated"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2",
            children: [/*#__PURE__*/_jsx(CheckCircle2, {
              className: "h-4 w-4 text-success"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-2xl font-bold",
              children: allocatedCount
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground mb-1",
            children: "Unallocated"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2",
            children: [/*#__PURE__*/_jsx(XCircle, {
              className: "h-4 w-4 text-destructive"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-2xl font-bold",
              children: unallocatedCount
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground mb-1",
            children: "Utilization"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-2xl font-bold",
            children: [utilization.toFixed(1), "%"]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("p", {
            className: "text-sm text-muted-foreground mb-1",
            children: "Wastage"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-2xl font-bold",
            children: [totalWastage, " KB"]
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-sm font-semibold mb-3",
          children: "Allocation Details"
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-2",
          children: processes.map((process, idx) => {
            const blockIdx = allocation[idx];
            const isAllocated = blockIdx !== -1;
            return /*#__PURE__*/_jsxs("div", {
              className: `flex items-center justify-between p-3 rounded-md text-sm ${isAllocated ? "bg-success/10 text-success-foreground" : "bg-destructive/10 text-destructive-foreground"}`,
              children: [/*#__PURE__*/_jsxs("span", {
                className: "font-medium",
                children: ["Process P", idx + 1, " (", process, " KB)"]
              }), /*#__PURE__*/_jsx("span", {
                className: "text-xs",
                children: isAllocated ? /*#__PURE__*/_jsxs(_Fragment, {
                  children: ["\u2192 Block ", blockIdx + 1, " (", blocks[blockIdx], " KB)"]
                }) : "Not Allocated"
              })]
            }, idx);
          })
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("p", {
          className: "text-sm font-semibold mb-3",
          children: "Remaining Memory"
        }), /*#__PURE__*/_jsx("div", {
          className: "flex flex-wrap gap-2",
          children: remainingBlocks.map((remaining, idx) => /*#__PURE__*/_jsxs("div", {
            className: "px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium",
            children: ["Block ", idx + 1, ": ", remaining, " KB"]
          }, idx))
        })]
      })]
    })]
  });
};