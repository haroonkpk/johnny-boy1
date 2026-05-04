
"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import { ArrowRight, LogIn, UserPlus } from 'lucide-react';

// --- Particle Background Component ---
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      x: number; y: number; baseX: number; baseY: number;
      size: number; density: number; vx: number; vy: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.baseX += this.vx;
        this.baseY += this.vy;
        if (this.baseX > canvas!.width) this.baseX = 0;
        if (this.baseX < 0) this.baseX = canvas!.width;
        if (this.baseY > canvas!.height) this.baseY = 0;
        if (this.baseY < 0) this.baseY = canvas!.height;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 150;
        if (distance < maxDistance) {
          let force = (maxDistance - distance) / maxDistance;
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        } else {
          if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 20;
          if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 20;
        }
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1200})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center">
      <ParticleBackground />

      <style jsx>{`
        @keyframes sweepFill {
          0% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
       
.sweep-text {
          -webkit-text-stroke: 1.5px white;
          /* Color Combo: #937ef1 (Purple) aur #3ac8ee (Cyan) */
          background: linear-gradient(
            to right, 
            #3ac8ee 0%, 
            #937ef1 25%, 
            #3ac8ee 50%, 
            transparent 50%, 
            transparent 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: sweepFill 4s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-8 text-left pointer-events-none">
          
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter sweep-text leading-[1.1] pointer-events-auto">
              JOHNNY  <br /> BOY
            </h1>
            
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-xl tracking-wide">
  Smooth hits. Bold flavors. Crafted for a premium vaping experience.
</p>
        <div className="flex items-center gap-4 pt-4 pointer-events-auto">
  {/* Login Button: Glassy Border with Purple Glow hover */}
  <Link 
    href="/login" 
    className="px-6 py-2 rounded-full border border-[#937ef1]/30 text-white hover:border-[#937ef1] hover:bg-[#937ef1]/10 hover:shadow-[0_0_15px_rgba(147,126,241,0.3)] transition-all font-medium flex items-center gap-2"
  >
    <LogIn size={18} />
    Login
  </Link>

  {/* Signup Button: Cyan & Purple Gradient */}
  <Link 
    href="/signup" 
    className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3ac8ee]/20 to-[#937ef1]/20 border border-[#3ac8ee]/50 text-white hover:from-[#3ac8ee] hover:to-[#937ef1] hover:shadow-[0_0_20px_rgba(58,200,238,0.4)] transition-all font-medium flex items-center gap-2"
  >
    <UserPlus size={18} />
    Signup
  </Link>
</div>
            
          </div>

          {/* Right Side: Image Area */}
          <div className="relative flex justify-center items-center pointer-events-auto">
            <div className="relative w-full aspect-square max-w-[500px]">
              {/* Floating Image Placeholder */}
              <img 
                src="/images/water.png" 
                alt="Product"
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-[bounce_4s_ease-in-out_infinite]"
              />
              {/* Image ke peeche ek light glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>

        </div>
      </div>
      
    </div>

  );
}
