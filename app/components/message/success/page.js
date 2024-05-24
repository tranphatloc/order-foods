import { X } from "lucide-react";
import { cn } from "../../../../lib/utils";

/**
 *
 * @param {import("react").HTMLAttributes<HTMLDivElement> & { message: string, onClose:()=>void}} p
 * @returns
 */
export default function SuccessMessage({ message, onClose, ...props }) {
  return (
    <div
      {...props}
      className={cn("max-w-sm mx-auto relative", props.className)}
    >
      <X className="absolute right-0 p-2" size={35} onClick={onClose} />
      <div className="bg-green-100 p-4 text-center rounded-lg">{message}</div>
    </div>
  );
}
