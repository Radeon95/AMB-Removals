import { useEffect, useState, useRef } from "react";

export function useMultiIntersectionObserver<T extends HTMLElement>(
  count: number
) {
  const refs = useRef<(T | null)[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleIndexes = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number(entry.target.getAttribute("data-index")));
        setVisibleIndexes((prev) =>
          Array.from(new Set([...prev, ...newVisibleIndexes]))
        );
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((el, index) => {
      if (el) {
        el.setAttribute("data-index", index.toString());
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [count]);

  return { refs, visibleIndexes };
}
