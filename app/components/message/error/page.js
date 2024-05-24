import { X } from "lucide-react";

export default function ErrorMessage({ message,onClose }) {
  return (
    <div className="max-w-sm mx-auto relative">
       <X className="absolute right-0 p-2" size={35} onClick={onClose} />
      <div className="bg-red-100 p-4 rounded-lg">{message}</div>
    </div>
  );
}
