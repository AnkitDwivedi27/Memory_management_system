import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, ArrowLeft, Trash2, RotateCcw, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PROCESS_COLORS = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-cyan-500", "bg-yellow-500", "bg-red-500"];
const Paging = () => {
  const {
    toast
  } = useToast();
  const [totalMemory, setTotalMemory] = useState(1000);
  const [frameSize, setFrameSize] = useState(100);
  const [processName, setProcessName] = useState("");
  const [processSize, setProcessSize] = useState(0);
  const [frames, setFrames] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [logicalAddress, setLogicalAddress] = useState("");
  const [translationResult, setTranslationResult] = useState(null);
  const numFrames = Math.floor(totalMemory / frameSize);

  // Initialize frames when memory settings change
  const initializeMemory = () => {
    const newFrames = Array(Math.floor(totalMemory / frameSize)).fill(null);
    setFrames(newFrames);
    setProcesses([]);
    setTranslationResult(null);
    toast({
      title: "Memory Initialized",
      description: `${Math.floor(totalMemory / frameSize)} frames created`
    });
  };
  const allocateProcess = () => {
    if (!processName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a process name",
        variant: "destructive"
      });
      return;
    }
    if (processSize <= 0) {
      toast({
        title: "Error",
        description: "Process size must be greater than 0",
        variant: "destructive"
      });
      return;
    }

    // Check if process already exists
    if (processes.find(p => p.name === processName)) {
      toast({
        title: "Error",
        description: "Process name already exists",
        variant: "destructive"
      });
      return;
    }
    const numPages = Math.ceil(processSize / frameSize);
    const freeFrames = frames.map((frame, index) => frame === null ? index : -1).filter(index => index !== -1);
    if (freeFrames.length < numPages) {
      toast({
        title: "Allocation Failed",
        description: `Not enough free memory. Need ${numPages} frames, only ${freeFrames.length} available.`,
        variant: "destructive"
      });
      return;
    }

    // Allocate pages to random free frames
    const pageTable = [];
    const newFrames = [...frames];
    const color = PROCESS_COLORS[processes.length % PROCESS_COLORS.length];
    for (let page = 0; page < numPages; page++) {
      const randomIndex = Math.floor(Math.random() * freeFrames.length);
      const frameNum = freeFrames[randomIndex];
      freeFrames.splice(randomIndex, 1);
      pageTable.push({
        page,
        frame: frameNum
      });
      newFrames[frameNum] = `${processName} - Page ${page}`;
    }
    setFrames(newFrames);
    setProcesses([...processes, {
      name: processName,
      size: processSize,
      color,
      pageTable
    }]);
    setProcessName("");
    setProcessSize(0);
    toast({
      title: "Process Allocated",
      description: `${processName} allocated with ${numPages} pages`
    });
  };
  const deallocateProcess = processName => {
    const process = processes.find(p => p.name === processName);
    if (!process) return;
    const newFrames = [...frames];
    process.pageTable.forEach(entry => {
      newFrames[entry.frame] = null;
    });
    setFrames(newFrames);
    setProcesses(processes.filter(p => p.name !== processName));
    toast({
      title: "Process Deallocated",
      description: `${processName} removed from memory`
    });
  };
  const translateAddress = () => {
    const addr = parseInt(logicalAddress);
    if (isNaN(addr) || addr < 0) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid logical address",
        variant: "destructive"
      });
      return;
    }

    // Find which process this address belongs to
    let currentOffset = 0;
    let targetProcess = null;
    let relativeAddress = addr;
    for (const process of processes) {
      if (addr < currentOffset + process.size) {
        targetProcess = process;
        relativeAddress = addr - currentOffset;
        break;
      }
      currentOffset += process.size;
    }
    if (!targetProcess) {
      toast({
        title: "Address Out of Range",
        description: "This logical address doesn't belong to any allocated process",
        variant: "destructive"
      });
      return;
    }
    const page = Math.floor(relativeAddress / frameSize);
    const offset = relativeAddress % frameSize;
    const pageEntry = targetProcess.pageTable.find(entry => entry.page === page);
    if (!pageEntry) {
      toast({
        title: "Page Fault",
        description: "This page is not in memory",
        variant: "destructive"
      });
      return;
    }
    const physical = pageEntry.frame * frameSize + offset;
    setTranslationResult({
      process: targetProcess.name,
      logical: addr,
      page,
      offset,
      frame: pageEntry.frame,
      physical
    });
  };
  const resetAll = () => {
    setFrames([]);
    setProcesses([]);
    setTranslationResult(null);
    setProcessName("");
    setProcessSize(0);
    toast({
      title: "Reset Complete",
      description: "All memory cleared"
    });
  };
  const usedFrames = frames.filter(f => f !== null).length;
  const utilizationPercentage = frames.length > 0 ? (usedFrames / frames.length * 100).toFixed(1) : "0";
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
              children: /*#__PURE__*/_jsx(Layers, {
                className: "h-6 w-6 text-white"
              })
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h1", {
                className: "text-3xl font-bold",
                children: "Paging Simulation"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-muted-foreground",
                children: "Visualize memory paging and page table mapping"
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
                }), "Back to Algorithms"]
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
        className: "max-w-7xl mx-auto space-y-6",
        children: [/*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsx(CardHeader, {
            children: /*#__PURE__*/_jsx(CardTitle, {
              children: "Memory Configuration"
            })
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-4 gap-4",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(Label, {
                  htmlFor: "totalMemory",
                  children: "Total Memory (KB)"
                }), /*#__PURE__*/_jsx(Input, {
                  id: "totalMemory",
                  type: "number",
                  value: totalMemory,
                  onChange: e => setTotalMemory(parseInt(e.target.value) || 0)
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(Label, {
                  htmlFor: "frameSize",
                  children: "Frame Size (KB)"
                }), /*#__PURE__*/_jsx(Input, {
                  id: "frameSize",
                  type: "number",
                  value: frameSize,
                  onChange: e => setFrameSize(parseInt(e.target.value) || 1)
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "flex items-end",
                children: /*#__PURE__*/_jsx(Button, {
                  onClick: initializeMemory,
                  className: "w-full",
                  children: "Initialize Memory"
                })
              }), /*#__PURE__*/_jsx("div", {
                className: "flex items-end",
                children: /*#__PURE__*/_jsxs(Button, {
                  onClick: resetAll,
                  variant: "destructive",
                  className: "w-full gap-2",
                  children: [/*#__PURE__*/_jsx(RotateCcw, {
                    className: "h-4 w-4"
                  }), "Reset All"]
                })
              })]
            })
          })]
        }), frames.length > 0 && /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-4 gap-4",
          children: [/*#__PURE__*/_jsx(Card, {
            children: /*#__PURE__*/_jsxs(CardContent, {
              className: "pt-6",
              children: [/*#__PURE__*/_jsx("div", {
                className: "text-2xl font-bold text-primary",
                children: frames.length
              }), /*#__PURE__*/_jsx("div", {
                className: "text-sm text-muted-foreground",
                children: "Total Frames"
              })]
            })
          }), /*#__PURE__*/_jsx(Card, {
            children: /*#__PURE__*/_jsxs(CardContent, {
              className: "pt-6",
              children: [/*#__PURE__*/_jsx("div", {
                className: "text-2xl font-bold text-green-600",
                children: usedFrames
              }), /*#__PURE__*/_jsx("div", {
                className: "text-sm text-muted-foreground",
                children: "Frames Used"
              })]
            })
          }), /*#__PURE__*/_jsx(Card, {
            children: /*#__PURE__*/_jsxs(CardContent, {
              className: "pt-6",
              children: [/*#__PURE__*/_jsx("div", {
                className: "text-2xl font-bold text-blue-600",
                children: frames.length - usedFrames
              }), /*#__PURE__*/_jsx("div", {
                className: "text-sm text-muted-foreground",
                children: "Free Frames"
              })]
            })
          }), /*#__PURE__*/_jsx(Card, {
            children: /*#__PURE__*/_jsxs(CardContent, {
              className: "pt-6",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "text-2xl font-bold text-purple-600",
                children: [utilizationPercentage, "%"]
              }), /*#__PURE__*/_jsx("div", {
                className: "text-sm text-muted-foreground",
                children: "Memory Utilization"
              })]
            })
          })]
        }), frames.length > 0 && /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsx(CardHeader, {
            children: /*#__PURE__*/_jsx(CardTitle, {
              children: "Allocate Process"
            })
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-4 gap-4",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(Label, {
                  htmlFor: "processName",
                  children: "Process Name"
                }), /*#__PURE__*/_jsx(Input, {
                  id: "processName",
                  value: processName,
                  onChange: e => setProcessName(e.target.value),
                  placeholder: "e.g., P1"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(Label, {
                  htmlFor: "processSize",
                  children: "Process Size (KB)"
                }), /*#__PURE__*/_jsx(Input, {
                  id: "processSize",
                  type: "number",
                  value: processSize || "",
                  onChange: e => setProcessSize(parseInt(e.target.value) || 0),
                  placeholder: "e.g., 250"
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "flex items-end",
                children: /*#__PURE__*/_jsx(Button, {
                  onClick: allocateProcess,
                  className: "w-full",
                  children: "Allocate Process"
                })
              })]
            })
          })]
        }), frames.length > 0 && /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
          children: [/*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsx(CardHeader, {
              children: /*#__PURE__*/_jsx(CardTitle, {
                children: "Physical Memory (Frames)"
              })
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-4 gap-2",
                children: frames.map((frame, index) => {
                  const process = processes.find(p => p.pageTable.some(entry => entry.frame === index));
                  return /*#__PURE__*/_jsxs("div", {
                    className: `p-3 rounded border-2 text-center text-xs transition-all ${frame === null ? "bg-muted border-border" : `${process?.color} text-white border-primary`}`,
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-bold",
                      children: ["Frame ", index]
                    }), frame && /*#__PURE__*/_jsx("div", {
                      className: "mt-1 text-xs",
                      children: frame
                    })]
                  }, index);
                })
              })
            })]
          }), /*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsx(CardHeader, {
              children: /*#__PURE__*/_jsx(CardTitle, {
                children: "Page Tables"
              })
            }), /*#__PURE__*/_jsx(CardContent, {
              className: "space-y-4 max-h-[600px] overflow-y-auto",
              children: processes.length === 0 ? /*#__PURE__*/_jsx("p", {
                className: "text-muted-foreground text-center py-8",
                children: "No processes allocated yet"
              }) : processes.map(process => /*#__PURE__*/_jsxs("div", {
                className: "border rounded-lg p-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center justify-between mb-3",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `w-4 h-4 rounded ${process.color}`
                    }), /*#__PURE__*/_jsx("h3", {
                      className: "font-bold",
                      children: process.name
                    }), /*#__PURE__*/_jsxs("span", {
                      className: "text-sm text-muted-foreground",
                      children: ["(", process.size, " KB)"]
                    })]
                  }), /*#__PURE__*/_jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => deallocateProcess(process.name),
                    children: /*#__PURE__*/_jsx(Trash2, {
                      className: "h-4 w-4"
                    })
                  })]
                }), /*#__PURE__*/_jsxs(Table, {
                  children: [/*#__PURE__*/_jsx(TableHeader, {
                    children: /*#__PURE__*/_jsxs(TableRow, {
                      children: [/*#__PURE__*/_jsx(TableHead, {
                        children: "Page No."
                      }), /*#__PURE__*/_jsx(TableHead, {
                        children: "Frame No."
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableBody, {
                    children: process.pageTable.map(entry => /*#__PURE__*/_jsxs(TableRow, {
                      children: [/*#__PURE__*/_jsx(TableCell, {
                        children: entry.page
                      }), /*#__PURE__*/_jsx(TableCell, {
                        children: entry.frame
                      })]
                    }, entry.page))
                  })]
                })]
              }, process.name))
            })]
          })]
        }), processes.length > 0 && /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsx(CardHeader, {
            children: /*#__PURE__*/_jsx(CardTitle, {
              children: "Logical to Physical Address Translation"
            })
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "md:col-span-2",
                  children: [/*#__PURE__*/_jsx(Label, {
                    htmlFor: "logicalAddress",
                    children: "Logical Address"
                  }), /*#__PURE__*/_jsx(Input, {
                    id: "logicalAddress",
                    type: "number",
                    value: logicalAddress,
                    onChange: e => setLogicalAddress(e.target.value),
                    placeholder: "e.g., 220"
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "flex items-end",
                  children: /*#__PURE__*/_jsx(Button, {
                    onClick: translateAddress,
                    className: "w-full",
                    children: "Translate"
                  })
                })]
              }), translationResult && /*#__PURE__*/_jsxs("div", {
                className: "bg-muted p-4 rounded-lg space-y-2 animate-in fade-in",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "grid grid-cols-2 gap-4",
                  children: [/*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Process:"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "ml-2 font-bold",
                      children: translationResult.process
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Logical Address:"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "ml-2 font-bold",
                      children: translationResult.logical
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Page Number:"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "ml-2 font-bold",
                      children: translationResult.page
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Offset:"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "ml-2 font-bold",
                      children: translationResult.offset
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Frame Number:"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "ml-2 font-bold",
                      children: translationResult.frame
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Physical Address:"
                    }), /*#__PURE__*/_jsx("span", {
                      className: "ml-2 font-bold text-primary",
                      children: translationResult.physical
                    })]
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "mt-3 pt-3 border-t",
                  children: /*#__PURE__*/_jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["Calculation: Physical Address = (Frame \xD7 Frame Size) + Offset = (", translationResult.frame, " \xD7 ", frameSize, ") + ", translationResult.offset, " = ", translationResult.physical]
                  })
                })]
              })]
            })
          })]
        })]
      })
    })]
  });
};
export default Paging;