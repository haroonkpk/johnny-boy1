
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=800%", // Scroll depth for smooth animation
          pin: true,
          scrub: 1.5,
        },
      });

      // 1. INITIAL STATE: Vape enters from background
      tl.fromTo(".main-vape-final",
        { scale: 0.2, opacity: 0, z: -1000 },
        { scale: 0.6, opacity: 1, z: 0, duration: 2 }
      )

      // 2. TEXT BREAKTHROUGH: Letters explode
      .to(".char-left", { 
        x: "-400%", 
        y: () => (Math.random() - 0.5) * 600,
        rotation: () => (Math.random() - 0.5) * 1000,
        opacity: 0, 
        duration: 2, 
        stagger: 0.03,
        ease: "power4.in" 
      }, "-=0.5")
      
      .to(".char-right", { 
        x: "400%", 
        y: () => (Math.random() - 0.5) * 600,
        rotation: () => (Math.random() - 0.5) * 1000,
        opacity: 0, 
        duration: 2, 
        stagger: 0.03,
        ease: "power4.in" 
      }, "-=2")

      // 3. WATER EXIT: Blast outwards to the sides
      .to(".side-element-left", { x: "-150%", scale: 1.5, opacity: 0, duration: 2, ease: "power2.in" }, "-=1.5")
      .to(".side-element-right", { x: "150%", scale: 1.5, opacity: 0, duration: 2, ease: "power2.in" }, "-=2")

      // 4. WATER BG ZOOM: Transition background
      .fromTo(".full-page-water",
        { scale: 0.5, opacity: 0, y: "20%" },
        { scale: 1, opacity: 1, y: "0%", duration: 2, ease: "expo.out" }
      )
      .to(".full-page-water", {
        scale: 1.2,
        duration: 3,
        ease: "none"
      })

      // 5. FINAL PRODUCT ZOOM
      .to(".main-vape-final", {
        scale: 1.1,
        y: 0,
        duration: 3,
        ease: "power3.out"
      }, "-=4")

      // Floating Extra Items (Fruits and Ice) Reveal
      .from(".extra-item", {
        y: 600,
        scale: 0,
        stagger: 0.3,
        opacity: 0,
        duration: 2,
        ease: "back.out(1.7)"
      }, "-=2.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string, className: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className={`${className} inline-block`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="bg-black w-full overflow-hidden">
      <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center">

        {/* Text Layer */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="flex text-white  font-black text-7xl md:text-[12rem] uppercase italic tracking-tighter  sweep-text leading-[0.9]">
            <div className="mr-6">
              {splitText("Johnny", "char-left")}
            </div>
            <div className="ml-6">
              {splitText("Boy", "char-right")}
            </div>
          </div>
        </div>

        {/* Side Splash Elements */}
        <div className="side-element-left absolute left-0 z-20">
          <img src="/images/water1.png" alt="Splash Left" className="w-[400px] md:w-[600px] h-auto" />
        </div>
        <div className="side-element-right absolute right-0 z-20">
          <img src="/images/water22.png" alt="Splash Right" className="w-[400px] md:w-[600px] h-auto" />
        </div>

        {/* Transition Water Layer */}
        <div className="full-page-water absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0">
          <img
            src="/images/water7.png"
            alt="Transition Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Product & Fruits */}
        <div className="main-vape-final absolute z-30 flex flex-col items-center">
          <img
            src="/images/vape1.png"
            alt="Hero Device"
            className="w-[300px] md:w-[500px] h-auto drop-shadow-[0_0_150px_rgba(255,255,255,0.3)]"
          />

          {/* Floating Ingredients: Change these image paths as needed */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {/* New Fruit Image */}
             <img 
               src="/images/new-fruit.png" 
               className="extra-item w-32 h-auto -translate-x-64 -translate-y-20 object-contain" 
               alt="fresh fruit" 
             />
             {/* Ice/Other Ingredient */}
             <img 
               src="/images/new-ice.png" 
               className="extra-item w-28 h-auto translate-x-64 translate-y-32 object-contain" 
               alt="ice cube" 
             />
          </div>
        </div>

      </div>
    </div>
  );
}

// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function HeroScroll() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: triggerRef.current,
//           start: "top top",
//           end: "+=800%",
//           pin: true,
//           scrub: 1.5,
//         },
//       });

//       // --- STEP 1: SIDE WATER INFLOW ---
//       tl.from(".side-element-left", { x: "-100%", opacity: 0, duration: 2 })
//         .from(".side-element-right", { x: "100%", opacity: 0, duration: 2 }, "-=2")

//       // --- STEP 2: NAME & CENTER DEVICE REVEAL ---
//       // Name initial position par aate hain
//         .from(".text-johnny", { x: "-200%", opacity: 0, duration: 2 }, "-=1")
//         .from(".text-boy", { x: "200%", opacity: 0, duration: 2 }, "-=2")
//         .from(".main-vape-final", { scale: 0, opacity: 0, duration: 2 }, "-=1.5")

//       // --- STEP 3: WATER BURST & TEXT EXIT (ULT-PULTA LOGIC) ---
//       // Johnny left rotate hoga, Boy right rotate hoga aur bahar jayenge
//         .to(".text-johnny", {
//             x: "-150%",
//             y: "-100px",
//             rotation: -360, // 360 degree rotate (ult-pulta)
//             opacity: 0,
//             duration: 2.5,
//             ease: "power2.inOut"
//         })
//         .to(".text-boy", {
//             x: "150%",
//             y: "100px",
//             rotation: 360, // 360 degree rotate (ult-pulta)
//             opacity: 0,
//             duration: 2.5,
//             ease: "power2.inOut"
//         }, "-=2.5")
//         .to(".side-element-left, .side-element-right", {
//             scale: 0.5,
//             opacity: 0,
//             duration: 1.5
//         }, "-=2")

//       // --- STEP 3.5: FULL SCREEN WATER SPLASH ---
//         .fromTo(".full-page-water",
//           { y: "100%", scale: 1, opacity: 0 },
//           { y: "0%", scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
//         )
//         .to(".full-page-water", {
//           scale: 25,
//           opacity: 0,
//           filter: "blur(30px)",
//           duration: 3,
//           ease: "power4.in"
//         })

//       // --- STEP 4: FINAL COMPOSITION ---
//         .to(".main-vape-final", {
//           scale: 1,
//           opacity: 1,
//           y: 0,
//           duration: 3,
//           ease: "expo.out"
//         }, "-=2")
//         .from(".extra-item", {
//           y: 500,
//           scale: 0,
//           stagger: 0.2,
//           opacity: 0,
//           duration: 2
//         }, "-=2.5");

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className="relative bg-black w-full overflow-hidden">
//       <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center">

//         {/* Side Water Elements */}
//         <div className="side-element-left absolute left-0 z-20">
//           <img src="/images/water1.png" alt="Splash" className="w-[300px] md:w-[500px] h-auto" />
//         </div>
//         <div className="side-element-right absolute right-0 z-20">
//           <img src="/images/water2.png" alt="Splash" className="w-[300px] md:w-[500px] h-auto" />
//         </div>

//         {/* Animated Text */}
//         <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none px-4">
//           <div className="flex items-center justify-between w-full max-w-7xl font-black text-6xl md:text-9xl uppercase italic tracking-tighter text-white">
//             <span className="text-johnny inline-block">Johnny</span>
//             <div className="w-[100px] md:w-[300px]"></div>
//             <span className="text-boy inline-block">Boy</span>
//           </div>
//         </div>

//         {/* Full Page Splash Overlay */}
//         <div className="full-page-water absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
//           <img
//             src="/images/wateri.webp"
//             alt="Full Splash"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Main Product & Decorative Items */}
//         <div className="main-vape-final absolute z-30 flex flex-col items-center">
//           <img
//             src="/images/vape1.png"
//             alt="Hero Device"
//             className="w-[280px] md:w-[480px] h-auto drop-shadow-[0_0_100px_rgba(255,255,255,0.4)]"
//           />

//           <div className="absolute flex gap-48 pointer-events-none">
//              <img src="/images/cloud-bg.webp" className="extra-item w-32 h-auto" alt="fruit" />
//              <img src="/images/ice.webp" className="extra-item w-28 h-auto mt-32" alt="ice" />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
