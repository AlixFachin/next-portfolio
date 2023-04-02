import { useEffect, useState, useRef, useMemo } from "react";

export interface FadeInProps {
  children?: React.ReactNode;
  direction: "from-left" | "from-right" | "from-below" | "from-above" | "none";
  delay?: number;
}

const FadeIn = ({ children, direction, delay }: FadeInProps) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === (domRef.current as Element)) {
            if (delay && entry.isIntersecting) {
              // we don't take into account the delay when hide element
              setTimeout(() => setVisible(entry.isIntersecting), delay);
            } else {
              setVisible(entry.isIntersecting);
            }
          }
        });
      },
      { threshold: 0.8 }
    );
    observer.observe(domRef.current as Element);
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current as Element);
      }
    };
  }, [delay]);

  const classDirection = useMemo(() => {
    switch (direction) {
      case "from-above":
        return "from-above";
      case "from-below":
        return "from-below";
      case "from-left":
        return "from-left";
      case "from-right":
        return "from-right";
      default:
        return "";
    }
  }, [direction]);

  return (
    <div
      className={`fade-in-section ${classDirection} ${
        isVisible ? "is-visible" : ""
      }`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeIn;
