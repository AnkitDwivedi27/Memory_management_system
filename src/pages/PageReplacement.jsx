import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fifoPageReplacement } from "@/lib/pageReplacement";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const PageReplacement = () => {
  const [framesCount, setFramesCount] = useState(3);
  const [pageString, setPageString] = useState("7,0,1,2,0,3,0,4,2,3,0,3,2");
  const [result, setResult] = useState(null);
  const handleSimulate = () => {
    const pages = pageString.split(",").map(p => parseInt(p.trim())).filter(p => !isNaN(p));
    if (pages.length === 0) {
      alert("Please enter valid page numbers");
      return;
    }
    if (framesCount < 1) {
      alert("Number of frames must be at least 1");
      return;
    }
    const fifoResult = fifoPageReplacement(pages, framesCount);
    setResult(fifoResult);
  };
  const handleReset = () => {
    setResult(null);
    setFramesCount(3);
    setPageString("7,0,1,2,0,3,0,4,2,3,0,3,2");
  };
  return /*#__PURE__*/_jsx("div", {
    className: "min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8",
    children: /*#__PURE__*/_jsxs("div", {
      className: "max-w-7xl mx-auto space-y-6",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-4 mb-6",
        children: [/*#__PURE__*/_jsx(Link, {
          to: "/",
          children: /*#__PURE__*/_jsx(Button, {
            variant: "ghost",
            size: "icon",
            children: /*#__PURE__*/_jsx(ArrowLeft, {
              className: "h-5 w-5"
            })
          })
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("h1", {
            className: "text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",
            children: "Page Replacement Simulator"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-muted-foreground mt-2",
            children: "Visualize virtual memory page replacement using FIFO algorithm"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        className: "border-primary/20 shadow-lg",
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          children: [/*#__PURE__*/_jsx(CardTitle, {
            children: "Simulation Parameters"
          }), /*#__PURE__*/_jsx(CardDescription, {
            children: "Configure the page replacement simulation"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid md:grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "space-y-2",
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "frames",
                children: "Number of Frames"
              }), /*#__PURE__*/_jsx(Input, {
                id: "frames",
                type: "number",
                min: "1",
                max: "10",
                value: framesCount,
                onChange: e => setFramesCount(parseInt(e.target.value) || 1),
                placeholder: "e.g., 3"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-2",
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "pages",
                children: "Page Reference String (comma-separated)"
              }), /*#__PURE__*/_jsx(Input, {
                id: "pages",
                type: "text",
                value: pageString,
                onChange: e => setPageString(e.target.value),
                placeholder: "e.g., 7,0,1,2,0,3,0,4"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex gap-3",
            children: [/*#__PURE__*/_jsx(Button, {
              onClick: handleSimulate,
              className: "flex-1",
              children: "Run FIFO Simulation"
            }), /*#__PURE__*/_jsx(Button, {
              onClick: handleReset,
              variant: "outline",
              children: "Reset"
            })]
          })]
        })]
      }), result && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "grid md:grid-cols-3 gap-4",
          children: [/*#__PURE__*/_jsxs(Card, {
            className: "border-destructive/20 bg-destructive/5",
            children: [/*#__PURE__*/_jsx(CardHeader, {
              className: "pb-3",
              children: /*#__PURE__*/_jsx(CardTitle, {
                className: "text-lg",
                children: "Page Faults"
              })
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "text-3xl font-bold text-destructive",
                children: result.pageFaults
              })
            })]
          }), /*#__PURE__*/_jsxs(Card, {
            className: "border-primary/20 bg-primary/5",
            children: [/*#__PURE__*/_jsx(CardHeader, {
              className: "pb-3",
              children: /*#__PURE__*/_jsx(CardTitle, {
                className: "text-lg",
                children: "Page Hits"
              })
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "text-3xl font-bold text-primary",
                children: result.pageHits
              })
            })]
          }), /*#__PURE__*/_jsxs(Card, {
            className: "border-accent/20 bg-accent/5",
            children: [/*#__PURE__*/_jsx(CardHeader, {
              className: "pb-3",
              children: /*#__PURE__*/_jsx(CardTitle, {
                className: "text-lg",
                children: "Hit Rate"
              })
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsxs("div", {
                className: "text-3xl font-bold text-accent-foreground",
                children: [result.hitRate.toFixed(1), "%"]
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs(Card, {
          className: "border-primary/20 shadow-lg",
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "FIFO Page Replacement Process"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "Step-by-step visualization of page replacement"
            })]
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsx("div", {
              className: "overflow-x-auto",
              children: /*#__PURE__*/_jsxs("table", {
                className: "w-full border-collapse",
                children: [/*#__PURE__*/_jsx("thead", {
                  children: /*#__PURE__*/_jsxs("tr", {
                    className: "border-b-2 border-primary/20",
                    children: [/*#__PURE__*/_jsx("th", {
                      className: "p-3 text-left font-semibold",
                      children: "Step"
                    }), /*#__PURE__*/_jsx("th", {
                      className: "p-3 text-left font-semibold",
                      children: "Page"
                    }), /*#__PURE__*/_jsx("th", {
                      className: "p-3 text-left font-semibold",
                      children: "Frames State"
                    }), /*#__PURE__*/_jsx("th", {
                      className: "p-3 text-left font-semibold",
                      children: "Status"
                    })]
                  })
                }), /*#__PURE__*/_jsx("tbody", {
                  children: result.steps.map((step, index) => /*#__PURE__*/_jsxs("tr", {
                    className: `border-b border-border/50 transition-colors ${step.fault ? 'bg-destructive/5' : 'bg-primary/5'}`,
                    children: [/*#__PURE__*/_jsx("td", {
                      className: "p-3 font-mono",
                      children: step.step
                    }), /*#__PURE__*/_jsx("td", {
                      className: "p-3",
                      children: /*#__PURE__*/_jsx(Badge, {
                        variant: "outline",
                        className: "font-mono text-base px-3 py-1",
                        children: step.page
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "p-3",
                      children: /*#__PURE__*/_jsxs("div", {
                        className: "flex gap-2",
                        children: [step.frames.map((frame, idx) => /*#__PURE__*/_jsx("div", {
                          className: `w-12 h-12 flex items-center justify-center rounded-lg border-2 font-mono font-semibold ${frame === step.page && step.fault ? 'border-destructive bg-destructive/10 text-destructive' : 'border-primary/30 bg-primary/5 text-primary'}`,
                          children: frame
                        }, idx)), Array.from({
                          length: framesCount - step.frames.length
                        }).map((_, idx) => /*#__PURE__*/_jsx("div", {
                          className: "w-12 h-12 flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30",
                          children: "-"
                        }, `empty-${idx}`))]
                      })
                    }), /*#__PURE__*/_jsx("td", {
                      className: "p-3",
                      children: /*#__PURE__*/_jsx(Badge, {
                        variant: step.fault ? "destructive" : "default",
                        className: "font-medium",
                        children: step.fault ? "Page Fault" : "Page Hit"
                      })
                    })]
                  }, index))
                })]
              })
            })
          })]
        })]
      })]
    })
  });
};
export default PageReplacement;