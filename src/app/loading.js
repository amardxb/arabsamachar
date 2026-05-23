 
import { Roller } from "react-css-spinners";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Roller color="rgba(208,2,27,1)" size={70} />
    </div>
  );
}