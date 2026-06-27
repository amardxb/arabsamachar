import LiveBadge from "../components/LiveBadge";

export default function GulfSilverTable({ data, country }) {
  if (!data) return null;

  const roundToQuarter = (value) => {
    if (value == null || value === "") return "-";
    return (Math.round(Number(value) * 4) / 4).toFixed(2);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-20">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] px-5 py-4 flex items-center justify-between">
        <div className="font-bold text-[#1e293b] text-[15px]">
           Silver Rate ({country?.toUpperCase()}) - {data.currency}/Kg
        </div>
        <LiveBadge />
      </div>

      {/* SUB HEADER */}
      <div className="px-4 py-2.5 text-xs text-[#475569] bg-[#f1f5f9] border-b border-[#cbd5e1]">
        Updated: {new Date(data.updated).toLocaleString()}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-gradient-to-br from-[#f8fafc] to-[#cbd5e1]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#64748b]/10">
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#1e293b]">प्योरिटी</span>
                  <span className="text-[11px] text-[#64748b]">Purity</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#1e293b]">सुबह</span>
                  <span className="text-[11px] text-[#64748b]">Morning</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#1e293b]">दोपहर</span>
                  <span className="text-[11px] text-[#64748b]">Afternoon</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#1e293b]">शाम</span>
                  <span className="text-[11px] text-[#64748b]">Evening</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#1e293b]">कल</span>
                  <span className="text-[11px] text-[#64748b]">Yesterday</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {[["999", data["silver999"]]].map((row, i) => (
              <tr key={i} className="border-b border-[#cbd5e1] bg-white/50">
                <td className="p-2.5 text-center font-bold text-[#1e293b]">
                  {row[0]} Silver
                </td>
                <td className="p-2.5 text-center text-[#1e293b]">
                  {row[1]?.morning != null ? roundToQuarter(row[1].morning) : "-"}
                </td>
                <td className={`p-2.5 text-center ${row[1]?.afternoon ? "text-emerald-700 font-semibold" : "text-[#1e293b]"}`}>
                  {row[1]?.afternoon != null ? roundToQuarter(row[1].afternoon) : "-"}
                </td>
                <td className={`p-2.5 text-center ${row[1]?.evening ? "text-emerald-700 font-semibold" : "text-[#1e293b]"}`}>
                  {row[1]?.evening != null ? roundToQuarter(row[1].evening) : "-"}
                </td>
                <td className="p-2.5 text-center text-[#64748b]">
                  {row[1]?.yesterday != null ? roundToQuarter(row[1].yesterday) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-2.5 text-[11px] text-[#1e293b] bg-[#f1f5f9] border-t border-[#cbd5e1]">
        ⚡ Live indicative retail price in {data.currency}
      </div>
    </div>
  );
}