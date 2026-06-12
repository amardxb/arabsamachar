"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function GratuityCalculator() {
  const [salary, setSalary] = useState("");
  const [joinDay, setJoinDay] = useState("");
  const [joinMonth, setJoinMonth] = useState("");
  const [joinYear, setJoinYear] = useState("");
  
  const [leaveDay, setLeaveDay] = useState("");
  const [leaveMonth, setLeaveMonth] = useState("");
  const [leaveYear, setLeaveYear] = useState("");
  
  const [contractType, setContractType] = useState("limited");
  const [exitType, setExitType] = useState("resignation");
  const [result, setResult] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // ✅ HELPER: Convert DD/MM/YYYY to Date object
  const createDateFromDMY = (day, month, year) => {
    if (!day || !month || !year) return null;
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900) return null;
    
    const date = new Date(y, m - 1, d);
    
    // Validate date (handles Feb 30, etc)
    if (date.getDate() !== d || date.getMonth() !== m - 1) return null;
    
    return date;
  };

  // ✅ HELPER: Format date for display
  const formatDateForDisplay = (day, month, year) => {
    if (!day || !month || !year) return "DD/MM/YYYY";
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  };

  const getService = (join, leave) => {
    let years = leave.getFullYear() - join.getFullYear();
    let months = leave.getMonth() - join.getMonth();
    let days = leave.getDate() - join.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(leave.getFullYear(), leave.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years -= 1; months += 12; }

    return { years, months, days };
  };

  const fmtD = (n) => parseFloat(n.toFixed(2)).toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt = (n) => Math.round(n).toLocaleString("en-AE");

  const calculate = () => {
    setResult(null);

    if (!salary || !joinDay || !joinMonth || !joinYear || !leaveDay || !leaveMonth || !leaveYear) {
      setResult({ 
        error: "सभी फ़ील्ड भरें।",
        eligible: false,
        amount: 0,
        service: { years: 0, months: 0, days: 0 }
      });
      return;
    }

    const basic = Number(salary);
    
    if (!basic || basic <= 0) {
      setResult({ 
        error: "वेतन एक सकारात्मक संख्या होनी चाहिए।",
        eligible: false,
        amount: 0,
        service: { years: 0, months: 0, days: 0 }
      });
      return;
    }

    const join = createDateFromDMY(joinDay, joinMonth, joinYear);
    const leave = createDateFromDMY(leaveDay, leaveMonth, leaveYear);

    if (!join || !leave) {
      setResult({ 
        error: "कृपया सही तारीख डालें।",
        eligible: false,
        amount: 0,
        service: { years: 0, months: 0, days: 0 }
      });
      return;
    }

    if (leave <= join) {
      setResult({ 
        error: "अंतिम कार्य दिवस, जॉइनिंग तारीख के बाद होना चाहिए।",
        eligible: false,
        amount: 0,
        service: { years: 0, months: 0, days: 0 }
      });
      return;
    }

    const service = getService(join, leave);
    const totalMonths = service.years * 12 + service.months;
    const totalYears = totalMonths / 12;
    const dailySalary = basic / 30;

    if (totalYears < 1) {
      setResult({
        service,
        amount: 0,
        eligible: false,
        chips: [{ label: "पात्र नहीं", color: "red" }],
        steps: [{
          title: "न्यूनतम 1 वर्ष आवश्यक",
          calc: `वर्तमान सेवा: ${service.years} साल ${service.months} महीने ${service.days} दिन`,
          result: "UAE Labour Law के अनुसार ग्रेच्युटी के लिए कम से कम 1 पूर्ण वर्ष की सेवा अनिवार्य है।",
        }],
        error: null,
      });
      return;
    }

    let eligibleYears = totalYears;
    let reductionNote = "";
    let reductionApplied = false;

    if (contractType === "unlimited" && exitType === "resignation") {
      if (totalYears >= 1 && totalYears < 3) {
        eligibleYears = totalYears * (1 / 3);
        reductionNote = "1–3 साल सेवा + इस्तीफा (Unlimited): 1/3 हिस्सा";
        reductionApplied = true;
      } else if (totalYears >= 3 && totalYears < 5) {
        eligibleYears = totalYears * (2 / 3);
        reductionNote = "3–5 साल सेवा + इस्तीफा (Unlimited): 2/3 हिस्सा";
        reductionApplied = true;
      }
    }

    const steps = [];
    let gratuity = 0;

    steps.push({ title: "दैनिक वेतन", calc: `${basic} ÷ 30`, result: `${fmtD(dailySalary)} AED प्रति दिन` });

    if (reductionApplied) {
      steps.push({ title: "इस्तीफा कटौती लागू", calc: reductionNote, result: `पात्र वर्ष = ${fmtD(eligibleYears)}` });
    }

    if (eligibleYears <= 5) {
      gratuity = dailySalary * 21 * eligibleYears;
      steps.push({
        title: "21 दिन × सेवा वर्ष",
        calc: `${fmtD(dailySalary)} × 21 × ${fmtD(eligibleYears)}`,
        result: `AED ${fmtD(gratuity)}`,
      });
    } else {
      const first5 = dailySalary * 21 * 5;
      const extra = dailySalary * 30 * (eligibleYears - 5);
      gratuity = first5 + extra;
      steps.push({ title: "पहले 5 साल @ 21 दिन/साल", calc: `${fmtD(dailySalary)} × 21 × 5`, result: `AED ${fmtD(first5)}` });
      steps.push({ title: "5 साल से अधिक @ 30 दिन/साल", calc: `${fmtD(dailySalary)} × 30 × ${fmtD(eligibleYears - 5)}`, result: `AED ${fmtD(extra)}` });
      steps.push({ title: "कुल", calc: `${fmtD(first5)} + ${fmtD(extra)}`, result: `AED ${fmtD(gratuity)}` });
    }

    const cap = basic * 24;
    const capApplied = gratuity > cap;
    if (capApplied) gratuity = cap;

    const chips = [
      { label: "पात्र", color: "green" },
      contractType === "limited" ? { label: "Limited Contract", color: "blue" } : { label: "Unlimited Contract", color: "amber" },
      exitType === "resignation" ? { label: "इस्तीफा", color: "amber" } : exitType === "termination" ? { label: "बर्खास्तगी", color: "blue" } : { label: "अनुबंध समाप्ति", color: "green" },
      ...(reductionApplied ? [{ label: "आंशिक हक़", color: "amber" }] : []),
      ...(capApplied ? [{ label: "2-साल सीमा लागू", color: "amber" }] : []),
      ...(totalYears > 5 ? [{ label: "30-दिन दर (5+ वर्ष)", color: "blue" }] : []),
    ];

    const joinDateStr = formatDateForDisplay(joinDay, joinMonth, joinYear);
    const leaveDateStr = formatDateForDisplay(leaveDay, leaveMonth, leaveYear);

    setResult({
      service,
      amount: Math.round(gratuity),
      eligible: true,
      chips,
      steps,
      reductionApplied,
      reductionNote,
      capApplied,
      basic,
      totalYears,
      contractType,
      exitType,
      joinDate: joinDateStr,
      leaveDate: leaveDateStr,
      error: null,
    });
  };
  const resetForm = () => {
  setSalary("");
  setJoinDay("");
  setJoinMonth("");
  setJoinYear("");
  setLeaveDay("");
  setLeaveMonth("");
  setLeaveYear("");
  setContractType("limited");
  setExitType("resignation");
  setResult(null);
};

 const downloadPDF = async () => {
  if (!result || result.error || !result.eligible) return;

  setIsDownloading(true);
  try {
    const element = document.getElementById("pdf-report-content");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      // ✅ Fixed width - screen size se independent
      windowWidth: 800,
      width: 800,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 10;
    const usableWidth = pdfWidth - margin * 2;

    // ✅ Canvas ka actual height calculate karo
    const imgHeight = (canvas.height * usableWidth) / canvas.width;

    if (imgHeight <= pdfHeight - margin * 2) {
      // ✅ Sab kuch ek hi page par fit ho jata hai
      const yOffset = (pdfHeight - imgHeight) / 2; // vertically center
      pdf.addImage(imgData, "PNG", margin, yOffset, usableWidth, imgHeight);
    } else {
      // ✅ Agar content lamba ho to multiple pages - lekin scale down karke ek page try karo pehle
      const scaledHeight = pdfHeight - margin * 2;
      const scaledWidth = (canvas.width * scaledHeight) / canvas.height;

      if (scaledWidth <= usableWidth) {
        // Vertically fit karo, horizontally center karo
        const xOffset = (pdfWidth - scaledWidth) / 2;
        pdf.addImage(imgData, "PNG", xOffset, margin, scaledWidth, scaledHeight);
      } else {
        // Width ke hisaab se fit karo, multiple pages allow karo
        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);
        heightLeft -= pdfHeight - margin * 2;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);
          heightLeft -= pdfHeight - margin * 2;
        }
      }
    }

    pdf.save(`UAE_Gratuity_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    setIsDownloading(false);
  }
};

  const chipColors = {
    green: "bg-green-100 text-green-800 border-green-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    red: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-amber-50 py-4 px-2">
      <div className="max-w-2xl mx-auto">
              {/* Header */}
        <div className="text-center mb-4">
  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-full mb-2 shadow-md">
    🇦🇪 UAE MOHRE Latest 2026
  </div>
  <p className="text-xs text-gray-500 mb-4">Federal Decree-Law No. 33 of 2021</p>
  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-tight md:leading-none p-1">UAE ग्रेच्युटी कैलकुलेटर</h1>
  <p className="text-lg text-gray-600 mt-3">सेवा अवधि लाभ • पारदर्शी गणना</p>
</div>


        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 mb-8">
          <div className="space-y-8">
            {/* Salary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Basic Salary: As per Labour Contract
                <span className="block text-xs font-normal text-gray-500 mt-1">(बेसिक सैलरी : लेबर कान्ट्रैक्ट के हिसाब से)</span>
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400">AED</span>
               <input
  type="number"
  placeholder="4000"
  value={salary}
  onChange={(e) => {
    const val = e.target.value;
    if (val === "" || (Number(val) >= 0 && val.length <= 6)) {
      setSalary(val);
    }
  }}
  min="0"
  max="999999"
  className="w-full pl-16 pr-6 py-2 text-xl border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
/>
              </div>
            </div>

                       {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Joining Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Joining Date :
                  <span className="block text-xs font-normal text-gray-500 mt-1">(नौकरी शुरू करने की तारीख)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="DD"
                    value={joinDay}
                    onChange={(e) => setJoinDay(e.target.value)}
                    className="w-1/4 px-2 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all text-center font-semibold"
                  />
                  <span className="flex items-center text-gray-400 text-xl">/</span>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="MM"
                    value={joinMonth}
                    onChange={(e) => setJoinMonth(e.target.value)}
                    className="w-1/4 px-2 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all text-center font-semibold"
                  />
                  <span className="flex items-center text-gray-400 text-xl">/</span>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="YYYY"
                    value={joinYear}
                    onChange={(e) => setJoinYear(e.target.value)}
                    className="flex-1 px-2 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all text-center font-semibold"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">फॉर्मेट: DD/MM/YYYY</p>
              </div>

              {/* Last Working Day */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Working Day :
                  <span className="block text-xs font-normal text-gray-500 mt-1">(आखिरी कार्य दिवस)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="DD"
                    value={leaveDay}
                    onChange={(e) => setLeaveDay(e.target.value)}
                    className="w-1/4 px-2 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all text-center font-semibold"
                  />
                  <span className="flex items-center text-gray-400 text-xl">/</span>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="MM"
                    value={leaveMonth}
                    onChange={(e) => setLeaveMonth(e.target.value)}
                    className="w-1/4 px-2 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all text-center font-semibold"
                  />
                  <span className="flex items-center text-gray-400 text-xl">/</span>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    placeholder="YYYY"
                    value={leaveYear}
                    onChange={(e) => setLeaveYear(e.target.value)}
                    className="flex-1 px-2 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all text-center font-semibold"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">फॉर्मेट: DD/MM/YYYY</p>
              </div>
            </div>

                 {/* Contract Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Contract Type :
                <span className="block text-xs font-normal text-gray-500 mt-1">(कॉन्ट्रैक्ट प्रकार)</span>
              </label>
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:bg-gray-100 md:p-1.5 md:rounded-2xl">
                <button
                  onClick={() => setContractType("limited")}
                  className={`w-full md:flex-1 py-4 md:py-3 rounded-xl md:rounded-lg font-semibold transition-all ${contractType === "limited" ? "bg-blue-600 text-white md:bg-white md:text-blue-700 md:shadow" : "bg-gray-100 text-gray-500 md:bg-transparent md:hover:text-gray-700"}`}
                >
                  Limited (सीमित)
                </button>
                <button
                  onClick={() => setContractType("unlimited")}
                  className={`w-full md:flex-1 py-4 md:py-3 rounded-xl md:rounded-lg font-semibold transition-all ${contractType === "unlimited" ? "bg-blue-600 text-white md:bg-white md:text-blue-700 md:shadow" : "bg-gray-100 text-gray-500 md:bg-transparent md:hover:text-gray-700"}`}
                >
                  Unlimited (असीमित)
                </button>
              </div>
            </div>


            {/* Exit Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Reason for Leaving :
                <span className="block text-xs font-normal text-gray-500 mt-1">(नौकरी छोड़ने का कारण :)</span>
              </label>
              <div className="space-y-3">
                {[
                  { value: "resignation", label: "इस्तीफा (Resignation)", sub: "कर्मचारी ने खुद नौकरी छोड़ी", icon: "🚪" },
                  { value: "termination", label: "बर्खास्तगी (Termination)", sub: "कंपनी ने नौकरी से निकाला", icon: "📋" },
                  { value: "contract_expiry", label: "अनुबंध समाप्ति (Contract)", sub: "तय अवधि पूरी हुई", icon: "📅" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setExitType(opt.value)}
                    className={`w-full flex items-center gap-4 px-2 py-2 rounded-2xl border transition-all text-left ${exitType === opt.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-semibold text-md">{opt.label}</div>
                      <div className="text-sm text-gray-500">{opt.sub}</div>
                    </div>
                    {exitType === opt.value && <span className="ml-auto text-2xl text-blue-600">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 active:scale-[0.985] text-white py-5 rounded-2xl text-lg font-semibold shadow-lg shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-3 sm:text-md"
            >
              Gratuity Calculate करें
            </button>
          </div>
        </div>

        {/* ✅ ERROR RESULT */}
        {result?.error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl text-center">
            ⚠️ {result.error}
          </div>
        )}

        {/* ✅ INELIGIBLE RESULT */}
        {result && !result.error && !result.eligible && result.service && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-8 py-10 text-center">
              <p className="text-orange-100 text-sm font-medium tracking-widest">NOT ELIGIBLE</p>
              <p className="text-4xl font-bold mt-2">AED 0</p>
              <p className="mt-3 text-orange-100">
                {result.service?.years || 0} साल {result.service?.months || 0} महीने {result.service?.days || 0} दिन
              </p>
            </div>

            <div className="px-8 py-6 flex flex-wrap gap-2 border-b">
              {result.chips?.map((chip, i) => (
                <span key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${chipColors[chip.color]}`}>
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="p-8">
              <h3 className="font-semibold text-lg mb-6">Information</h3>
              <div className="space-y-8">
                {result.steps?.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{step.title}</div>
                      <div className="font-mono text-sm text-gray-500 mt-1">{step.calc}</div>
                      <div className="text-orange-700 font-medium mt-1">{step.result}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ✅ ELIGIBLE RESULT */}
        {result && !result.error && result.eligible && (
          <>
            {/* ✅ CONTENT TO BE CAPTURED FOR PDF - NO BUTTON HERE */}
            <div id="pdf-report-content" className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
              {/* Hero Result */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-10 text-center">
                <p className="text-blue-100 text-sm font-medium tracking-widest">अनुमानित ग्रेच्युटी</p>
                <p className="text-6xl font-bold mt-2">AED {(result.amount || 0).toLocaleString("en-AE")}</p>
                <p className="mt-3 text-blue-100">
                  {result.service?.years || 0} साल {result.service?.months || 0} महीने {result.service?.days || 0} दिन
                </p>
              </div>

              {/* Chips */}
              <div className="px-8 py-6 flex flex-wrap gap-2 border-b">
                {result.chips?.map((chip, i) => (
                  <span key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${chipColors[chip.color]}`}>
                    {chip.label}
                  </span>
                ))}
              </div>

              {/* Input Details */}
              <div className="px-8 py-6 border-b bg-gray-50">
                <h3 className="font-semibold text-lg mb-4">Input Details (दर्ज की गई जानकारी)</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Basic Salary</p>
                    <p className="font-semibold">AED {(result.basic || 0).toLocaleString("en-AE")}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Contract Type (कॉन्ट्रैक्ट)</p>
                    <p className="font-semibold">{result.contractType === "limited" ? "Limited (सीमित)" : "Unlimited (असीमित)"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Joining Date (जॉइनिंग)</p>
                    <p className="font-semibold">{result.joinDate || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Working Day (आखिरी दिन)</p>
                    <p className="font-semibold">{result.leaveDate || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="p-8">
                <h3 className="font-semibold text-lg mb-6">Step-by-Step Calculation (चरण दर चरण गणना)</h3>
                <div className="space-y-8">
                  {result.steps?.map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{step.title}</div>
                        <div className="font-mono text-sm text-gray-500 mt-1">{step.calc}</div>
                        <div className="text-blue-700 font-medium mt-1">{step.result}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="px-8 py-6 border-t bg-gray-50">
                <h3 className="font-semibold text-lg mb-3">Legal Reference (कानूनी संदर्भ)</h3>
                <p className="text-sm text-gray-700 mb-2">Federal Decree-Law No. 33 of 2021 (MOHRE)</p>
                <p className="text-xs text-gray-600">
                  यह केवल एक अनुमान है। सटीक गणना के लिए MOHRE या कानूनी सलाहकार से संपर्क करें।
                </p>
              </div>
            </div>

            {/* ✅ DOWNLOAD BUTTON OUTSIDE PDF CONTENT - NOT CAPTURED IN PDF */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-6">
              <button
  onClick={async () => {
    await downloadPDF();
    resetForm();
  }}
  disabled={isDownloading}
  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
>
  {isDownloading ? "⏳ Generating PDF..." : "📄 Download Full Gratuity Report (PDF)"}
</button>
              <p className="text-center text-xs text-gray-500 mt-4">
                पूरी रिपोर्ट सभी विवरण और कानूनी नोट्स के साथ
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
