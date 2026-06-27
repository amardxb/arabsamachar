import LiveBadge from '../components/LiveBadge'
export default function GulfGoldTable({ data, country }) {
  if (!data) return null;

  const roundToQuarter = (value) => {
    if (value == null || value === "") return "-";
    return (Math.round(Number(value) * 4) / 4).toFixed(2);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-20">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#f5d98a] to-[#e8b84b] px-5 py-4 flex items-center justify-between">
        <div className="font-bold text-[#5c4314] text-[15px]">
           Gold Rates ({country?.toUpperCase()}) - {data.currency}/Gram
        </div>
        <LiveBadge />
      </div>

      {/* SUB HEADER */}
      <div className="px-4 py-2.5 text-xs text-[#8a6d2f] bg-[#fbe7b8] border-b border-[#e8b84b]/40">
        Updated: {new Date(data.updated).toLocaleString()}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-gradient-to-br from-[#fbe7b8] to-[#f3c969]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#5c4314]/10">
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#5c4314]">कैरट टाइप</span>
                  <span className="text-[11px] text-[#8a6d2f]">Karat Type</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#5c4314]">सुबह</span>
                  <span className="text-[11px] text-[#8a6d2f]">Morning</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#5c4314]">दोपहर</span>
                  <span className="text-[11px] text-[#8a6d2f]">Afternoon</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#5c4314]">शाम</span>
                  <span className="text-[11px] text-[#8a6d2f]">Evening</span>
                </div>
              </th>
              <th className="p-2.5 text-center">
                <div className="flex flex-col items-center leading-tight">
                  <span className="font-bold text-[#5c4314]">कल</span>
                  <span className="text-[11px] text-[#8a6d2f]">Yesterday</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {[
              ["24K", data["24k"]],
              ["22K", data["22k"]],
              ["21K", data["21k"]],
              ["18K", data["18k"]],
              ["14K", data["14k"]],
            ].map((row, i) => (
              <tr
                key={i}
                className={`border-b border-[#e8b84b]/30 ${i % 2 === 0 ? "bg-[#fffaf0]/40" : "bg-transparent"}`}
              >
                <td className="p-2.5 text-center font-bold text-[#5c4314]">
                  {row[0]} Gold
                </td>
                <td className="p-2.5 text-center text-[#5c4314]">
                  {row[1]?.morning != null ? roundToQuarter(row[1].morning) : "-"}
                </td>
                <td className={`p-2.5 text-center ${row[1]?.afternoon ? "text-green-700 font-semibold" : "text-[#5c4314]"}`}>
                  {row[1]?.afternoon != null ? roundToQuarter(row[1].afternoon) : "-"}
                </td>
                <td className={`p-2.5 text-center ${row[1]?.evening ? "text-green-700 font-semibold" : "text-[#5c4314]"}`}>
                  {row[1]?.evening != null ? roundToQuarter(row[1].evening) : "-"}
                </td>
                <td className="p-2.5 text-center text-[#8a6d2f]">
                  {row[1]?.yesterday != null ? roundToQuarter(row[1].yesterday) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-2.5 text-[11px] text-[#5c4314] bg-[#fbe7b8] border-t border-[#e8b84b]/40">
        ⚡ Live indicative retail price in {data.currency}
      </div>
    </div>
  );
}