import { useRef, useEffect } from "react";

const TOTAL = 9;

const PLACEHOLDER = "/images/profile.png";

const lerp = (current, target, factor) => (1 - factor) * current + factor * target;

const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export default function ImageTrail() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mouse = { x: 0, y: 0 };
    const win = { width: window.innerWidth, height: window.innerHeight };
    const total = TOTAL;

    const handleMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { win.width = window.innerWidth; win.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);

    const transforms = Array.from({ length: total }, () => ({ x: 0, y: 0, rz: 0 }));

    el.innerHTML = Array.from({ length: total }, (_, i) => {
      const opacity = i === total - 1 ? 1 : (i + 1) / total;
      return `<img class="trail__img" src="${PLACEHOLDER}" style="opacity: ${opacity}" draggable="false" alt="">`;
    }).join("");

    const imgs = el.querySelectorAll(".trail__img");

    function render() {
      for (let i = 0; i < total; i++) {
        const factor = 0.02 * i + 0.05;
        const targetX = mapRange(mouse.x, 0, win.width, -200, 200);
        const targetY = mapRange(mouse.y, 0, win.height, -70, 70);
        const targetRz = mapRange(mouse.x, 0, win.width, -10, 10);

        transforms[i].x = lerp(transforms[i].x, targetX, factor);
        transforms[i].y = lerp(transforms[i].y, targetY, factor);
        transforms[i].rz = lerp(transforms[i].rz, targetRz, factor);

        imgs[i].style.transform =
          `translate(${transforms[i].x}px, ${transforms[i].y}px) rotateZ(${transforms[i].rz}deg)`;
      }
      rafId = requestAnimationFrame(render);
    }

    let rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="image-trail-grid"
      style={{
        display: "grid",
        placeItems: "center",
      }}
    />
  );
}
