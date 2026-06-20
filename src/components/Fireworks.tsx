import React, { useEffect, useRef } from 'react';

export const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.06; // gravity
        this.alpha -= this.decay;
      }
    }

    class Firework {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      color: string;
      exploded: boolean;
      particles: Particle[];

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.tx = Math.random() * width;
        this.ty = Math.random() * (height * 0.4) + height * 0.1;
        
        const dx = this.tx - this.x;
        const dy = this.ty - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.random() * 6 + 10;
        
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;
        this.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
        this.exploded = false;
        this.particles = [];
      }

      draw() {
        if (!ctx) return;
        if (!this.exploded) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          this.particles.forEach((p) => p.draw());
        }
      }

      update() {
        if (!this.exploded) {
          this.x += this.vx;
          this.y += this.vy;
          // check if near target
          if (this.vy >= 0 || this.y <= this.ty) {
            this.exploded = true;
            const count = Math.floor(Math.random() * 30) + 40;
            for (let i = 0; i < count; i++) {
              this.particles.push(new Particle(this.x, this.y, this.color));
            }
          }
        } else {
          this.particles.forEach((p) => p.update());
          this.particles = this.particles.filter((p) => p.alpha > 0);
        }
      }
    }

    let fireworks: Firework[] = [];

    const animate = () => {
      // translucent background for trails
      ctx.fillStyle = 'rgba(7, 2, 13, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Spawn rate
      if (Math.random() < 0.045 && fireworks.length < 8) {
        fireworks.push(new Firework());
      }

      fireworks.forEach((fw) => {
        fw.update();
        fw.draw();
      });

      fireworks = fireworks.filter((fw) => !fw.exploded || fw.particles.length > 0);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
