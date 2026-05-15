
// // "use client";
// // import { useEffect, useRef } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // if (typeof window !== "undefined") {
// //   gsap.registerPlugin(ScrollTrigger);
// // }

// // export default function HeroScroll() {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const triggerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     let ctx = gsap.context(() => {
// //       const tl = gsap.timeline({
// //         scrollTrigger: {
// //           trigger: triggerRef.current,
// //           start: "top top",
// //           end: "+=1000%", // Slightly longer for the extra step
// //           pin: true,
// //           scrub: 1.5,
// //         },
// //       });

// //       // 1. INITIAL STATE: Vape enters
// //       tl.fromTo(".main-vape-final",
// //         { scale: 0.2, opacity: 0, z: -1000 },
// //         { scale: 0.6, opacity: 1, z: 0, duration: 2 }
// //       )

// //       // 2. TEXT BREAKTHROUGH: Letters explode
// //       .to(".char-left", { 
// //         x: "-400%", 
// //         y: () => (Math.random() - 0.5) * 600,
// //         rotation: () => (Math.random() - 0.5) * 1000,
// //         opacity: 0, 
// //         duration: 2, 
// //         stagger: 0.03,
// //         ease: "power4.in" 
// //       }, "-=0.5")
// //       .to(".char-right", { 
// //         x: "400%", 
// //         y: () => (Math.random() - 0.5) * 600,
// //         rotation: () => (Math.random() - 0.5) * 1000,
// //         opacity: 0, 
// //         duration: 2, 
// //         stagger: 0.03,
// //         ease: "power4.in" 
// //       }, "-=2")

// //       // 3. WATER EXIT
// //       .to(".side-element-left", { x: "-150%", scale: 1.5, opacity: 0, duration: 2, ease: "power2.in" }, "-=1.5")
// //       .to(".side-element-right", { x: "150%", scale: 1.5, opacity: 0, duration: 2, ease: "power2.in" }, "-=2")

// //       // 4. FLOATING ITEMS REVEAL (Fruits)
// //       .from(".extra-item", {
// //         y: 600,
// //         scale: 0,
// //         stagger: 0.3,
// //         opacity: 0,
// //         duration: 2,
// //         ease: "back.out(1.7)"
// //       }, "-=1")

// //       // 5. NEW STEP: Shift Bottle & Fruits to Right, Paragraph enters Left
// //       .to(".main-vape-final", {
// //         x: "25%", // Move bottle to the right
// //         scale: 0.8,
// //         duration: 3,
// //         ease: "power3.inOut"
// //       })
// //       .fromTo(".content-paragraph", 
// //         { x: "-100%", opacity: 0 },
// //         { x: "0%", opacity: 1, duration: 3, ease: "power3.out" },
// //         "-=3" // Run simultaneously with bottle movement
// //       );

// //     }, containerRef);

// //     return () => ctx.revert();
// //   }, []);

// //   const splitText = (text: string, className: string) => {
// //     return text.split("").map((char, index) => (
// //       <span key={index} className={`${className} inline-block`}>
// //         {char === " " ? "\u00A0" : char}
// //       </span>
// //     ));
// //   };

// //   return (
// //     <div ref={containerRef} className="bg-black w-full overflow-hidden">
// //       <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center px-10 md:px-20">

// //         {/* Text Layer (Intro) */}
// //         <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
// //           <div className="flex text-white font-black text-7xl md:text-[12rem] uppercase italic tracking-tighter leading-[0.9]">
// //             <div className="mr-6">{splitText("Johnny", "char-left")}</div>
// //             <div className="ml-6">{splitText("Boy", "char-right")}</div>
// //           </div>
// //         </div>

// //         {/* Content Paragraph (Initially Hidden on Left) */}
// //         <div className="content-paragraph absolute left-10 md:left-20 z-50 w-full max-w-lg pointer-events-none opacity-0">
// //           <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">Pure Freshness.</h2>
// //           <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
// //             Experience the explosion of flavors with our premium blend. 
// //             Crafted with ice-cold precision and the finest fruit extracts 
// //             to give you a refreshing sensation in every puff.
// //           </p>
// //         </div>

// //         {/* Side Splash Elements */}
// //         <div className="side-element-left absolute left-0 z-20">
// //           <img src="/images/water1.png" alt="Splash" className="w-[400px] h-auto" />
// //         </div>
// //         <div className="side-element-right absolute right-0 z-20">
// //           <img src="/images/water22.png" alt="Splash" className="w-[400px] h-auto" />
// //         </div>

// //         {/* Main Product & Fruits Container */}
// //         <div className="main-vape-final absolute z-30 flex flex-col items-center">
// //           <img
// //             src="/images/vape1.png"
// //             alt="Hero Device"
// //             className="w-[300px] md:w-[450px] h-auto drop-shadow-[0_0_100px_rgba(255,255,255,0.2)]"
// //           />

// //           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //              <img 
// //                src="/images/fruit1.png" 
// //                className="extra-item w-32 h-auto -translate-x-48 -translate-y-20 object-contain" 
// //                alt="fruit" 
// //              />
// //              <img 
// //                src="/images/fruit2.png" 
// //                className="extra-item w-28 h-auto translate-x-48 translate-y-32 object-contain" 
// //                alt="ice" 
// //              />
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { LayoutDashboard, LogIn, UserPlus } from "lucide-react";
// import  Button  from "@/components/ui/Button";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function HeroScroll({ dynamicContent, isLoggedIn, handleDashboardClick, router }: any) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: triggerRef.current,
//           start: "top top",
//           end: "+=900%", 
//           pin: true,
//           scrub: 1.5,
//         },
//       });

//       // 1. INITIAL: Vape aur Water Splashes ka entry
//       tl.fromTo(".main-vape-container",
//         { scale: 0.2, opacity: 0 },
//         { scale: 0.7, opacity: 1, duration: 2 }
//       )
//       .from(".side-water", {
//         scale: 0,
//         opacity: 0,
//         duration: 1.5,
//         stagger: 0.2,
//         ease: "back.out(1.7)"
//       }, "-=1")

//       // 2. TEXT EXPLOSION & WATER BLAST: Letters aur side water bahar ki taraf phatenge
//       .to(".char-left", { x: "-500%", y: () => (Math.random() - 0.5) * 800, rotation: -360, opacity: 0, duration: 2.5, stagger: 0.05, ease: "power4.in" }, "-=0.5")
//       .to(".char-right", { x: "500%", y: () => (Math.random() - 0.5) * 800, rotation: 360, opacity: 0, duration: 2.5, stagger: 0.05, ease: "power4.in" }, "-=2.5")
      
//       // Side water splashes fly out
//       .to(".side-water-left", { x: "-150%", opacity: 0, scale: 1.5, duration: 2 }, "-=2")
//       .to(".side-water-right", { x: "150%", opacity: 0, scale: 1.5, duration: 2 }, "-=2")

//       // 3. TRANSITION WATER: Pura background water layer zoom in
//       .fromTo(".full-bg-water", 
//         { scale: 0.8, opacity: 0 },
//         { scale: 1.1, opacity: 0.4, duration: 2 }
//       )

//       // 4. FRUITS REVEAL
//       .from(".extra-item", {
//         y: 500,
//         scale: 0,
//         stagger: 0.3,
//         opacity: 0,
//         duration: 2,
//         ease: "back.out(1.2)"
//       }, "-=1")

//       // 5. FINAL SHIFT: Bottle moves Right, Content enters Left
//       .to(".main-vape-container", {
//         x: "28%", 
//         scale: 0.85,
//         duration: 3,
//         ease: "power3.inOut"
//       })
//       .fromTo(".hero-text-content", 
//         { x: "-100px", opacity: 0 },
//         { x: "0px", opacity: 1, duration: 3, ease: "power3.out" },
//         "-=3"
//       );

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   const splitText = (text: string, className: string) => {
//     return text.split("").map((char, index) => (
//       <span key={index} className={`${className} inline-block`}>
//         {char === " " ? "\u00A0" : char}
//       </span>
//     ));
//   };

//   return (
//     <div ref={containerRef} className="bg-black w-full overflow-hidden">
//       <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center">
        
//         {/* --- Background Water Layers --- */}
//         <div className="full-bg-water absolute inset-0 z-0 pointer-events-none opacity-0">
//           <img src="/images/water7.png" alt="water bg" className="w-full h-full object-cover mix-blend-screen" />
//         </div>

//         {/* --- Side Splashes (Intro) --- */}
//         <div className="side-water side-water-left absolute left-0 z-20 pointer-events-none">
//           <img src="/images/water1.png" alt="Splash" className="w-[300px] md:w-[600px] h-auto opacity-70" />
//         </div>
//         <div className="side-water side-water-right absolute right-0 z-20 pointer-events-none">
//           <img src="/images/water22.png" alt="Splash" className="w-[300px] md:w-[600px] h-auto opacity-70" />
//         </div>

//         {/* --- Exploding Intro Text --- */}
//         <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
//           <div className="flex text-white font-black text-6xl md:text-[10rem] lg:text-[14rem] uppercase italic tracking-tighter leading-[0.9] text-shadow-lg">
//             <div className="mr-4 md:mr-8">{splitText("JOHNNY", "char-left")}</div>
//             <div className="ml-4 md:ml-8">{splitText("BOY", "char-right")}</div>
//           </div>
//         </div>

//         {/* --- Main Section Layout --- */}
//         <div className="container mx-auto max-w-[1500px] px-6 z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left Column: Your Text Section */}
//             <div className="hero-text-content opacity-0 flex flex-col space-y-6 md:space-y-10 text-center lg:text-left order-2 lg:order-1">
//               <div className="space-y-4 md:space-y-6">
//                 <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter sweep-text leading-[0.9]">
//                   JOHNNY <br className="hidden md:block" /> BOY
//                 </h1>

//                 {dynamicContent ? (
//                   <div 
//                     className="dynamic-html-content text-base sm:text-lg md:text-2xl max-w-full md:max-w-lg mx-auto lg:mx-0 tracking-wide leading-relaxed text-gray-300"
//                     dangerouslySetInnerHTML={{ __html: dynamicContent }} 
//                   />
//                 ) : (
//                   <p className="text-base sm:text-lg md:text-2xl text-gray-400 font-light max-w-full md:max-w-lg mx-auto lg:mx-0 tracking-wide leading-relaxed">
//                     Smooth hits. Bold flavors. <br className="hidden sm:block" />
//                     Crafted for a premium vaping experience that defines excellence.
//                   </p>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
//                 {isLoggedIn ? (
//                   <Button className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#3ac8ee] to-[#937ef1] text-white font-black" onClick={handleDashboardClick}>
//                     <LayoutDashboard size={20} className="mr-2" /> DASHBOARD
//                   </Button>
//                 ) : (
//                   <>
//                     <Button variant="outline" className="rounded-full px-8 md:px-10 py-3 md:py-4 border-[#3ac8ee] text-white hover:bg-[#3ac8ee]/20" onClick={() => router.push("/login")}>
//                       <LogIn size={20} className="mr-2" /> LOGIN
//                     </Button>
//                     <Button className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#3ac8ee] to-[#937ef1] text-white font-black" onClick={() => router.push("/signup")}>
//                       <UserPlus size={20} className="mr-2" /> JOIN NOW
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Right Column: Visual Elements */}
//             <div className="main-vape-container relative flex justify-center items-center h-[400px] md:h-[700px] order-1 lg:order-2">
//               <div className="relative z-20">
//                 {/* Main Product */}
//                 <img
//                   src="/images/icestraight.png"
//                   alt="Product"
//                   className="w-[300px] sm:w-[450px] md:w-[550px] lg:w-[650px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(58,200,238,0.4)]"
//                 />
                
//                 {/* Floating Fruits */}
//                 <img src="/images/fruit1.png" className="extra-item absolute -left-10 md:-left-24 top-10 w-24 md:w-36 h-auto" alt="fruit" />
//                 <img src="/images/fruit2.png" className="extra-item absolute -right-10 md:-right-20 bottom-20 w-20 md:w-32 h-auto" alt="fruit" />
//               </div>

//               {/* Ambient Glow */}
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#3ac8ee]/10 rounded-full blur-[120px] -z-10"></div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }