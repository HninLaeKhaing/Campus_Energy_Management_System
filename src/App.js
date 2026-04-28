import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  AlertTriangle,
  Wrench,
  FileText,
  Zap,
  IndianRupee,
  Leaf,
  Activity,
  Lightbulb,
  Thermometer,
  Power,
  User,
  Menu,
  X,
  ChevronRight,
  Search,
  Info,
  Plus,
  Calculator,
  Wind,
  Database,
} from "lucide-react";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Dashboard");

  // --- FOOTPRINT STATE ---
  const [activeSource, setActiveSource] = useState("Grid");

  const sources = {
    Grid: {
      factor: 0.85,
      icon: Activity,
      color: "text-blue-400",
      potential: "Baseline usage",
    },
    Solar: {
      factor: 0.05,
      icon: Lightbulb,
      color: "text-yellow-400",
      potential: "94% saving potential",
    },
    Wind: {
      factor: 0.01,
      icon: Wind,
      color: "text-cyan-400",
      potential: "98% saving potential",
    },
    Coal: {
      factor: 1.15,
      icon: Database,
      color: "text-slate-400",
      potential: "High impact zone",
    },
  };

  // Input state for real-time analysis
  const [userInput, setUserInput] = useState({
    blockName: "Block A",
    reading: "",
    deptName: "Engineering",
  });

  // Dynamic Data States
  const [blockData, setBlockData] = useState([
    { name: "Block A", consumption: 450, status: "high" },
    { name: "Block B", consumption: 320, status: "normal" },
    { name: "Library", consumption: 210, status: "normal" },
    { name: "Hostel", consumption: 580, status: "high" },
    { name: "Labs", consumption: 390, status: "warning" },
  ]);

  const [deptData, setDeptData] = useState([
    { name: "Engineering", value: 40, color: "#2563eb" },
    { name: "Sciences", value: 25, color: "#10b981" },
    { name: "Arts", value: 15, color: "#f59e0b" },
    { name: "Admin", value: 20, color: "#6366f1" },
  ]);

  const [consumptionData, setConsumptionData] = useState([
    { day: "Mon", usage: 1100, saved: 200 },
    { day: "Tue", usage: 1300, saved: 150 },
    { day: "Wed", usage: 1250, saved: 180 },
    { day: "Thu", usage: 1400, saved: 100 },
    { day: "Fri", usage: 1200, saved: 220 },
    { day: "Sat", usage: 900, saved: 300 },
    { day: "Sun", usage: 800, saved: 350 },
  ]);

  // Dynamic Carbon Footprint Calculation linked to activeSource
  const carbonMetrics = useMemo(() => {
    const totalConsumption = blockData.reduce(
      (acc, curr) => acc + curr.consumption,
      0
    );
    const factor = sources[activeSource].factor;
    const tons = (totalConsumption * factor) / 1000;
    const target = 1.2;
    const percentage = Math.min(100, (tons / target) * 100);
    return { tons: tons.toFixed(2), percentage };
  }, [blockData, activeSource]);

  // Control states
  const [controls, setControls] = useState({
    lights: false,
    hvac: true,
    temp: 22,
    smartPlug: true,
    autoMode: true,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handler for manual data update
  const handleDataUpdate = (e) => {
    e.preventDefault();
    if (!userInput.reading || isNaN(userInput.reading)) return;

    const val = parseFloat(userInput.reading);

    setBlockData((prev) =>
      prev.map((block) =>
        block.name === userInput.blockName
          ? {
              ...block,
              consumption: val,
              status: val > 500 ? "high" : val > 350 ? "warning" : "normal",
            }
          : block
      )
    );

    setDeptData((prev) =>
      prev.map((dept) =>
        dept.name === userInput.deptName
          ? { ...dept, value: Math.min(60, dept.value + 2) }
          : { ...dept, value: Math.max(10, dept.value - 0.5) }
      )
    );

    setConsumptionData((prev) => {
      const newData = [...prev];
      newData[6] = { ...newData[6], usage: newData[6].usage + val / 10 };
      return newData;
    });

    setUserInput({ ...userInput, reading: "" });
  };

  const alerts = [
    {
      id: 1,
      title: "High Usage Detected",
      location: "Block A",
      type: "critical",
      msg: "Consumption 25% above baseline.",
    },
    {
      id: 2,
      title: "Lights Left ON",
      location: "Room 101",
      type: "warning",
      msg: "Manual override required.",
    },
    {
      id: 3,
      title: "HVAC Overuse",
      location: "Admin Wing",
      type: "warning",
      msg: "Thermostat set too low.",
    },
    {
      id: 4,
      title: "Power Spike",
      location: "Main Lab",
      type: "info",
      msg: "Momentary voltage fluctuation.",
    },
  ];

  const Toggle = ({ enabled, onClick, label }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={onClick}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            U
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-lg tracking-tight text-blue-900">
              EduEnergy
            </span>
          )}
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { name: "Dashboard", icon: LayoutDashboard },
            { name: "Analytics", icon: BarChart3 },
            { name: "Alerts", icon: AlertTriangle },
            { name: "Maintenance", icon: Wrench },
            { name: "Reports", icon: FileText },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.name
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={20} />
            {isSidebarOpen && (
              <span className="font-medium text-sm">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Campus Energy Management
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Central Monitoring Hub
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-bold text-slate-700">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-xs text-slate-400">
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 border-l pl-6">
              <button className="p-2 text-slate-400 hover:text-blue-600 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3 ml-2 cursor-pointer hover:bg-slate-50 p-1 rounded-full transition-all">
                <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <User size={20} className="text-slate-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-none">
                    Admin Profile
                  </p>
                  <p className="text-[10px] text-slate-400">Chief Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD GRID */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <Calculator size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Real-time Data Entry</h2>
                <p className="text-blue-100 text-sm">
                  Update campus metrics to analyze immediate footprint impact.
                </p>
              </div>
            </div>
            <form
              onSubmit={handleDataUpdate}
              className="flex flex-wrap gap-4 items-end"
            >
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-blue-200">
                  Select Block
                </label>
                <select
                  value={userInput.blockName}
                  onChange={(e) =>
                    setUserInput({ ...userInput, blockName: e.target.value })
                  }
                  className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:bg-white/20 transition-all text-white"
                >
                  {blockData.map((b) => (
                    <option key={b.name} className="text-slate-800">
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-blue-200">
                  Current kWh
                </label>
                <input
                  type="text"
                  placeholder="e.g. 450"
                  value={userInput.reading}
                  onChange={(e) =>
                    setUserInput({ ...userInput, reading: e.target.value })
                  }
                  className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm placeholder:text-blue-200 focus:outline-none focus:bg-white/20 transition-all w-32"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus size={18} /> Update Analysis
              </button>
            </form>
          </section>

          {/* SUMMARY CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Total Energy Usage",
                value: (
                  consumptionData.reduce((acc, curr) => acc + curr.usage, 0) / 7
                ).toFixed(0),
                unit: "kWh",
                icon: Zap,
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                label: "Avg Block Load",
                value: (
                  blockData.reduce((acc, curr) => acc + curr.consumption, 0) / 5
                ).toFixed(0),
                unit: "kW",
                icon: Activity,
                color: "text-purple-600",
                bg: "bg-purple-100",
              },
              {
                label: "Monthly Energy Cost",
                value: "₹18,500",
                unit: "",
                icon: IndianRupee,
                color: "text-green-600",
                bg: "bg-green-100",
              },
              {
                label: "Energy Saved",
                value: "18",
                unit: "%",
                icon: Leaf,
                color: "text-emerald-600",
                bg: "bg-emerald-100",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5"
              >
                <div className={`p-4 ${card.bg} rounded-xl`}>
                  <card.icon className={card.color} size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    {card.label}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-800">
                      {card.value}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {card.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">
                    Weekly Consumption Trend
                  </h3>
                  <select className="text-xs font-semibold bg-slate-50 border-none rounded-lg p-2 focus:ring-2 focus:ring-blue-100">
                    <option>Current Week</option>
                    <option>Last Week</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={consumptionData}>
                      <defs>
                        <linearGradient
                          id="colorUsage"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2563eb"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2563eb"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="usage"
                        stroke="#2563eb"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorUsage)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 text-slate-800">
                    Block Comparison
                  </h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={blockData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#f1f5f9"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip
                          cursor={{ fill: "#f8fafc" }}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                          }}
                        />
                        <Bar dataKey="consumption" radius={[6, 6, 0, 0]}>
                          {blockData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.status === "high"
                                  ? "#ef4444"
                                  : entry.status === "warning"
                                  ? "#f59e0b"
                                  : "#10b981"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 text-slate-800">
                    Department Usage %
                  </h3>
                  <div className="h-[250px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deptData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {deptData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                          iconType="circle"
                          wrapperStyle={{
                            fontSize: "11px",
                            paddingTop: "20px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="text-blue-600" size={20} />
                  <h3 className="font-bold text-lg">Smart Controls</h3>
                </div>
                <div className="space-y-4">
                  <Toggle
                    label="Master Lighting"
                    enabled={controls.lights}
                    onClick={() =>
                      setControls((prev) => ({ ...prev, lights: !prev.lights }))
                    }
                  />
                  <Toggle
                    label="HVAC / AC Units"
                    enabled={controls.hvac}
                    onClick={() =>
                      setControls((prev) => ({ ...prev, hvac: !prev.hvac }))
                    }
                  />
                  <div className="p-3 bg-gray-50 rounded-xl space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                      <span>AC Temperature</span>
                      <span className="text-blue-600 font-bold">
                        {controls.temp}°C
                      </span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="30"
                      value={controls.temp}
                      onChange={(e) =>
                        setControls((prev) => ({
                          ...prev,
                          temp: e.target.value,
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <Toggle
                    label="Smart Plug Main"
                    enabled={controls.smartPlug}
                    onClick={() =>
                      setControls((prev) => ({
                        ...prev,
                        smartPlug: !prev.smartPlug,
                      }))
                    }
                  />
                  <button
                    onClick={() =>
                      setControls((prev) => ({
                        ...prev,
                        autoMode: !prev.autoMode,
                      }))
                    }
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                      controls.autoMode
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-slate-100 text-slate-50"
                    }`}
                  >
                    {controls.autoMode
                      ? "Auto Mode Active"
                      : "Enable Auto Mode"}
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Live Alerts</h3>
                  <span className="bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest">
                    Live
                  </span>
                </div>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-2xl border border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 p-2 rounded-lg ${
                            alert.type === "critical"
                              ? "bg-red-100 text-red-600"
                              : alert.type === "warning"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <AlertTriangle size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-slate-800">
                              {alert.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-medium">
                              2m ago
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {alert.location}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                            {alert.msg}
                          </p>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER STATS */}
          <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="bg-emerald-50 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <Leaf size={18} />
                  <span className="font-bold text-sm">
                    Sustainability Score
                  </span>
                </div>
                <p className="text-xs text-emerald-600/80 mb-4">
                  {carbonMetrics.percentage < 80
                    ? "Campus is currently in an efficient zone."
                    : "Optimization suggested for peak hours."}
                </p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-700">
                  {carbonMetrics.percentage < 50
                    ? "A+"
                    : carbonMetrics.percentage < 75
                    ? "A"
                    : "B"}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Real-time Rank
                </span>
              </div>
            </div>

            {/* UPDATED FOOTPRINT CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl text-white transition-all shadow-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Activity size={18} />
                  <span className="font-bold text-sm uppercase tracking-wider">
                    Carbon Footprint
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {Object.keys(sources).map((key) => {
                    const SIcon = sources[key].icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveSource(key)}
                        title={key}
                        className={`p-1.5 rounded-lg transition-all border ${
                          activeSource === key
                            ? "bg-white/10 border-white/30 text-white scale-110"
                            : "border-transparent text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        <SIcon size={14} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-tighter mb-1 ${sources[activeSource].color}`}
                    >
                      Source: {activeSource}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">
                        {carbonMetrics.tons}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase">
                        Tons CO2
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">
                      Efficiency
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        carbonMetrics.percentage < 50
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {sources[activeSource].potential}
                    </p>
                  </div>
                </div>

                <div className="relative pt-2">
                  <div className="flex justify-between text-[10px] mb-2 font-bold text-slate-500 uppercase">
                    <span>Low Impact</span>
                    <span>Target: 1.2T</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-[2px]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_12px] ${
                        activeSource === "Coal"
                          ? "bg-red-500 shadow-red-900/50"
                          : activeSource === "Grid"
                          ? "bg-blue-500 shadow-blue-900/50"
                          : "bg-emerald-400 shadow-emerald-900/50"
                      }`}
                      style={{ width: `${carbonMetrics.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Info size={18} className="text-blue-500" />
                <span className="font-bold text-sm text-slate-800">
                  Saving Suggestions
                </span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {carbonMetrics.percentage > 80
                    ? "URGENT: Curtail non-essential loads."
                    : "Schedule HVAC for Library after 8 PM."}
                </li>
                <li className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Replace Hallway lights in Block B with LEDs.
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </main>

      {!isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  );
};

export default App;
