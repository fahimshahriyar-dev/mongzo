"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

export interface LanguageItem {
  label: string;
  native: string;
}

export const LANGUAGES: LanguageItem[] = [
  { label: "English", native: "English" },
  { label: "Bengali", native: "বাংলা" },
  { label: "Arabic", native: "العربية" },
  { label: "French", native: "Français" },
  { label: "Spanish", native: "Español" },
  { label: "German", native: "Deutsch" },
  { label: "Chinese", native: "中文" },
  { label: "Japanese", native: "日本語" },
  { label: "Hindi", native: "हिन्दी" },
  { label: "Urdu", native: "اردو" },
  { label: "Russian", native: "Русский" },
  { label: "Portuguese", native: "Português" },
  { label: "Italian", native: "Italiano" },
  { label: "Dutch", native: "Nederlands" },
  { label: "Turkish", native: "Türkçe" },
  { label: "Korean", native: "한국어" },
  { label: "Indonesian", native: "Bahasa Indonesia" },
  { label: "Thai", native: "ไทย" },
  { label: "Vietnamese", native: "Tiếng Việt" },
  { label: "Swahili", native: "Kiswahili" },
  { label: "Greek", native: "Ελληνικά" },
  { label: "Hebrew", native: "עברית" },
  { label: "Persian", native: "فارسی" },
  { label: "Polish", native: "Polski" },
  { label: "Ukrainian", native: "Українська" },
  { label: "Romanian", native: "Română" },
  { label: "Czech", native: "Čeština" },
  { label: "Hungarian", native: "Magyar" },
  { label: "Swedish", native: "Svenska" },
  { label: "Norwegian", native: "Norsk" },
  { label: "Danish", native: "Dansk" },
  { label: "Finnish", native: "Suomi" },
  { label: "Malay", native: "Bahasa Melayu" },
  { label: "Filipino", native: "Filipino" },
  { label: "Tamil", native: "தமிழ்" },
  { label: "Telugu", native: "తెలుగు" },
  { label: "Marathi", native: "मराठी" },
  { label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { label: "Gujarati", native: "ગુજરાતી" },
  { label: "Nepali", native: "नेपाली" },
];

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (language: LanguageItem) => void;
}

const LanguageModal = ({ open, onClose, selected, onSelect }: LanguageModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Frosted / Dim Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col max-h-[88vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors mb-2"
            >
              <FaTimes className="text-sm" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Choose a language
            </h2>
          </div>
        </div>

        {/* Scrollable Grid of Languages */}
        <div className="px-6 sm:px-8 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {LANGUAGES.map((lang) => {
              const isSelected = selected === lang.label;
              return (
                <button
                  key={lang.label}
                  type="button"
                  onClick={() => {
                    onSelect(lang);
                    onClose();
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600"
                      : "border-neutral-200/80 hover:border-blue-400/80 hover:bg-neutral-50/80 hover:shadow-sm"
                  }`}
                >
                  <span className="text-xs font-semibold text-neutral-900 leading-tight">
                    {lang.label}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">
                    {lang.native}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LanguageModal;
