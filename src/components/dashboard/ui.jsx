import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Play } from "lucide-react";

export default function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-[#0B2A45]/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`max-h-[90vh] w-full ${wide ? "max-w-3xl" : "max-w-xl"} overflow-y-auto rounded-3xl bg-white shadow-2xl`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
              <h3 className="text-lg font-semibold text-[#0B2A45]">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-[#115D98]/10">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Click-to-play YouTube embed. Replace the placeholder IDs in your mock data with real video IDs.
export function VideoEmbed({ id, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0B2A45]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play ${title}`}>
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#115D98] shadow-xl transition-transform group-hover:scale-110"><Play size={22} fill="currentColor" /></span>
          </span>
        </button>
      )}
    </div>
  );
}