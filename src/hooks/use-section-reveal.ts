import { useEffect, type RefObject } from "react";

export function useSectionReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !root ||
      preference.matches ||
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    )
      return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches) continue;
          // Content is visible before enhancement; animation never gates reading.
          const animation = entry.target.animate(
            [
              { opacity: 0.65, transform: "translateY(10px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 550, easing: "cubic-bezier(.22,1,.36,1)" },
          );
          animations.add(animation);
          animation.finished.then(() => animations.delete(animation)).catch(() => {});
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );

    root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    const stopMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stopMotion);
    };
  }, [ref]);
}
