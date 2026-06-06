"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SEQUENCES = ["outdoor", "church_led", "conference"] as const;
const FRAME_COUNT = 40;

export function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[][]>([[], [], []]); // [sequence][frame]

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = SEQUENCES.length * FRAME_COUNT;

    SEQUENCES.forEach((seq, seqIdx) => {
      imagesRef.current[seqIdx] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, "0");
        img.src = `/assets/${seq}/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        // fallback in case of error
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        imagesRef.current[seqIdx].push(img);
      }
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentSeq = 0;
    let currentFrame = 0;
    let lastTime = 0;
    let alpha = 1; // For crossfading sequences
    let isTransitioning = false;
    let nextSeq = 1;
    let animationFrameId: number;

    const FPS = 15; // smooth but not too fast
    const interval = 1000 / FPS;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      
      const deltaTime = time - lastTime;
      if (deltaTime < interval && !isTransitioning) return;
      
      if (!isTransitioning) {
        lastTime = time - (deltaTime % interval);
        currentFrame++;
        
        if (currentFrame >= FRAME_COUNT) {
          isTransitioning = true;
          nextSeq = (currentSeq + 1) % SEQUENCES.length;
          currentFrame = FRAME_COUNT - 1; // Stay on last frame during transition
          alpha = 1;
        }
      }

      // Handle drawing
      const width = canvas.width;
      const height = canvas.height;
      
      // Calculate aspect ratio to cover canvas
      const drawCover = (img: HTMLImageElement, globalAlpha: number) => {
        if (!img || !img.complete || img.naturalWidth === 0) return;
        const imgAspect = img.width / img.height;
        const canvasAspect = width / height;
        let drawWidth, drawHeight, startX, startY;

        if (imgAspect > canvasAspect) {
          drawHeight = height;
          drawWidth = height * imgAspect;
          startX = (width - drawWidth) / 2;
          startY = 0;
        } else {
          drawWidth = width;
          drawHeight = width / imgAspect;
          startX = 0;
          startY = (height - drawHeight) / 2;
        }

        ctx.globalAlpha = globalAlpha;
        ctx.drawImage(img, startX, startY, drawWidth, drawHeight);
      };

      if (!isTransitioning) {
        const img = imagesRef.current[currentSeq][currentFrame];
        ctx.clearRect(0, 0, width, height);
        drawCover(img, 1);
      } else {
        // Crossfade
        alpha -= 0.04; // Fade speed
        ctx.clearRect(0, 0, width, height);
        
        const currentImg = imagesRef.current[currentSeq][FRAME_COUNT - 1];
        const nextImg = imagesRef.current[nextSeq][0];
        
        drawCover(currentImg, Math.max(0, alpha));
        drawCover(nextImg, Math.min(1, 1 - alpha));

        if (alpha <= 0) {
          isTransitioning = false;
          currentSeq = nextSeq;
          currentFrame = 0;
          alpha = 1;
          lastTime = time; // reset time
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Init size

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded]);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[#0A0F14]">
      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <span className="text-muted text-sm tracking-widest uppercase">Initializing {progress}%</span>
           </div>
        </div>
      )}

      {/* Canvas for sequence */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: imagesLoaded ? 1 : 0 }}
      />
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/55 z-10 cinematic-vignette pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgoJPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAyNSIvPgo8L3N2Zz4=')] opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start gap-6 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl"
          >
            LED Display Solutions <br className="hidden sm:block" /> Built for High-Impact Spaces
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-[600px] leading-relaxed drop-shadow-md"
          >
            Professional LED display systems for churches, conference halls, hotels, commercial buildings, and institutions across Ethiopia.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">Request Consultation</Button>
            </Link>
            <Link href="/projects" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">View Projects</Button>
            </Link>
          </motion.div>
        </div>

        <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 justify-end">
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 1 }}
             className="flex flex-col gap-5"
           >
              {[
                "Indoor & Outdoor LED",
                "Professional Installation",
                "Addis Ababa Based",
                "Technical Support"
              ].map((text, i) => (
                <div 
                  key={text}
                  className="glass px-6 py-4 rounded-xl flex items-center gap-4 shadow-xl backdrop-blur-md border-white/10"
                  style={{ transform: `translateY(${i * 10}px)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary box-glow shadow-[0_0_10px_#00B7FF]" />
                  <span className="font-medium text-white/90">{text}</span>
                </div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  )
}
