import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, MousePointer2 } from "lucide-react";

const greeting = "Hey! I'm 13 years in Design and 6 in Product Design";

export function AnimatedHero() {
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number;
    let count = 0;

    const typeNextCharacter = () => {
      count += 1;
      setVisibleCharacters(count);
      if (count < greeting.length) {
        timer = window.setTimeout(typeNextCharacter, 32);
      }
    };
    const showFullGreeting = () => {
      if (preference.matches) {
        window.clearTimeout(timer);
        setVisibleCharacters(greeting.length);
      }
    };

    if (preference.matches) {
      showFullGreeting();
    } else {
      timer = window.setTimeout(typeNextCharacter, 80);
    }
    preference.addEventListener("change", showFullGreeting);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener("change", showFullGreeting);
    };
  }, []);

  const groupRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    const cursor = cursorRef.current;
    const button = group?.querySelector<HTMLAnchorElement>(".primary-action");
    const motion = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 761px)",
    );
    if (!group || !cursor || !button || !motion.matches || !("animate" in cursor)) return;

    const width = button.getBoundingClientRect().width;
    cursor.style.left = `${button.offsetLeft}px`;
    cursor.style.offsetPath =
      'path("M ' +
      (width + 235) +
      " -30 C " +
      (width + 275) +
      " 85, " +
      (width + 80) +
      " 120, " +
      (width - 24) +
      ' 26")';
    const animation = cursor.animate(
      [
        { opacity: 0, offsetDistance: "0%", offset: 0 },
        { opacity: 1, offsetDistance: "0%", offset: 0.1 },
        { opacity: 1, offsetDistance: "0%", offset: 0.16, easing: "cubic-bezier(.25,.7,.3,1)" },
        { opacity: 1, offsetDistance: "100%", offset: 0.6 },
        { opacity: 1, offsetDistance: "100%", offset: 0.94 },
        { opacity: 0, offsetDistance: "100%", offset: 1 },
      ],
      { delay: 2100, duration: 5000, easing: "linear", fill: "none" },
    );

    const timers = [
      window.setTimeout(() => {
        button.classList.add("is-cursor-hovered", "is-cursor-pressed");
        cursor.classList.add("cursor-press");
      }, 5100),
      window.setTimeout(() => {
        button.classList.remove("is-cursor-hovered", "is-cursor-pressed");
      }, 5450),
    ];
    const stop = () => {
      animation.cancel();
      cursor.classList.remove("cursor-press");
      timers.forEach(window.clearTimeout);
      button.classList.remove("is-cursor-hovered", "is-cursor-pressed");
    };
    // Keep the intro demonstration running even when the pointer happens to
    // rest over the CTA while the page loads. Keyboard focus and viewport
    // changes still stop it to avoid fighting an active interaction.
    button.addEventListener("focus", stop, { once: true });
    window.addEventListener("resize", stop, { once: true });
    motion.addEventListener("change", stop, { once: true });
    return () => {
      stop();
      button.removeEventListener("focus", stop);
      window.removeEventListener("resize", stop);
      motion.removeEventListener("change", stop);
    };
  }, []);

  return (
    <section className="site-container home-introduction" aria-labelledby="hero-title">
      <p className="hero-greeting">
        <span className="sr-only">(O_O) ﾉ {greeting}</span>
        <span aria-hidden="true">
          <span className="hero-symbol">
            <span className="hero-face">(O_O)</span>
            <span className="hero-wave">ﾉ</span>
          </span>{" "}
          {greeting.split(" ").map((word, wordIndex, words) => {
            const offset = words.slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
            return (
              <span key={wordIndex}>
                {wordIndex > 0 && " "}
                <span className="hero-typed-word">
                  {Array.from(word).map((character, index) => (
                    <span
                      key={index}
                      className="hero-typed-character"
                      style={{
                        visibility: offset + index < visibleCharacters ? "visible" : "hidden",
                      }}
                    >
                      {character}
                    </span>
                  ))}
                </span>
              </span>
            );
          })}
        </span>
      </p>
      <h1 id="hero-title" className="introduction-title hero-statement hero-reveal">
        Turning complex, regulated workflows into{"\u00a0"}
        <span className="hero-accent">clear, human-friendly products.</span>
      </h1>
      <div className="hero-cta-group" ref={groupRef}>
        <Link to="/" hash="contact" className="secondary-action hero-contact-action hero-reveal focus-ring">
          Contact me
          <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" />
        </Link>
        <Link to="/work" className="primary-action hero-work-action hero-reveal focus-ring">
          View my work
          <ArrowDownRight size={22} strokeWidth={1.7} aria-hidden="true" />
        </Link>
        <span ref={cursorRef} className="animated-cursor" aria-hidden="true">
          <MousePointer2 size={34} strokeWidth={1.5} fill="currentColor" />
          <span className="cursor-rays">
            <i />
            <i />
            <i />
          </span>
          <span className="cursor-bubble">welcome to my portfolio</span>
        </span>
      </div>
    </section>
  );
}
