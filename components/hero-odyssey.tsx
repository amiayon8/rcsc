"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScroll } from "framer-motion";
import { ShinyButton } from "@/components/shiny-button";
import Link from 'next/link';

interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
}

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      // Convert HSV to RGB.
      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          // Normalized pixel coordinates.
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          // Apply horizontal offset.
          uv.x += uXOffset;
          
          // Adjust uv based on size and animate with speed.
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          // Compute base color using hue.
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          // Compute color with intensity and speed affecting time.
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (
      source: string,
      type: number
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");

    const startTime = performance.now();
    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      const currentTime = performance.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="relative w-full h-full" />;
};


const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position }) => {
  return (
    <div className={`absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}>
      <div className="relative flex items-center gap-2">
        {/* Dot with constant glow */}
        <div className="relative">
          <div className="bg-white rounded-full w-2 h-2 group-hover:animate-pulse"></div>
          <div className="absolute -inset-1 bg-white/20 opacity-70 group-hover:opacity-100 blur-sm rounded-full transition-opacity duration-300"></div>
        </div>
        <div className="relative text-white">
          <div className="font-medium group-hover:text-white transition-colors duration-300">{name}</div>
          <div className="text-white/70 group-hover:text-white/70 text-sm transition-colors duration-300">{value}</div>
          {/* Constant white glow that intensifies on hover */}
          <div className="-z-10 absolute -inset-2 bg-white/10 opacity-70 group-hover:opacity-100 blur-md rounded-lg transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((y) => {
      setScrolled(y > 80);
    });
  }, [scrollY]);

  return (
    <div className="relative bg-black w-full overflow-hidden text-white">
      {/* Main container with space for content */}
      <div className="z-20 relative mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-36 max-w-7xl h-screen">


        <motion.div
          variants={containerVariants}
          initial="hidden"
          //animate="visible"
          className="top-[30%] z-200 relative w-full hidden!"
        >
          <motion.div>
            <FeatureItem name="React" value="for base" position="left-0 sm:left-10 top-40" />
          </motion.div>
          <motion.div>
            <FeatureItem name="Tailwind" value="for styles" position="left-1/4 top-24" />
          </motion.div>
          <motion.div>
            <FeatureItem name="Framer-motion" value="for animations" position="right-1/4 top-24" />
          </motion.div>
          <motion.div>
            <FeatureItem name="Shaders" value="for lightning" position="right-0 sm:right-10 top-40" />
          </motion.div>
        </motion.div>

        {/* Main hero content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-30 relative flex flex-col items-center mx-auto max-w-4xl text-center"
        >
          {/* Button: "Join us for free world" */}
          <Link href="/resources">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm mb-6 px-4 py-2 rounded-full text-sm transition-all duration-300" // Reduced mb slightly
            >
              <span>View Resources</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1 duration-300 transform">
                <path d="M8 3L13 8L8 13M13 8H3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </Link>

          <motion.h1 className="flex flex-col justify-center items-center gap-4 text-shadow-gray-200/50 text-shadow-lg mb-4 font-geist font-black text-white text-center uppercase">
            <span className="lg:text-[5.25rem] text-4xl md:text-5xl">Rajuk College</span>
            <span className="text-[45px] sm:text-6xl md:text-8xl">Science Club</span>
          </motion.h1>

          {/* Description */}
          <motion.p className="opacity-0 mb-12 font-bold text-[#8899ac] sm:text-[1.5rem] text-lg text-center sm:tracking-[4px] tracking-wider animate-[slideUp_0.8s_ease_0.4s_forwards,shimmer_3s_infinite_alternate]">Grab Beyond The Infinity</motion.p>

          <Link href="/registration">
            <ShinyButton
              className="bg-primary/5 hover:bg-primary/10 backdrop-blur-sm mt-25 sm:mt-25 px-8 py-3 rounded-full font-semibold text-lg tracking-wide transition-colors"
            >
              Join Now
            </ShinyButton>
          </Link>
        </motion.div>
      </div>

      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-0 absolute inset-0"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Glowing circle */}
        <div className="top-[60%] left-1/2 absolute bg-linear-to-b from-primary/5 to-secondary/10 blur-3xl rounded-full size-200 -translate-x-1/2 -translate-y-1/4 transform"></div>

        <div className="top-0 left-1/2 absolute w-full h-full -translate-x-1/2 transform">
          <Lightning
            hue={200} // Use the state variable here
            xOffset={0}
            speed={1.6}
            intensity={0.6}
            size={2}
          />
        </div>

        {/* Planet/sphere */}
        <div className="top-[65%] left-1/2 z-10 absolute bg-[radial-gradient(circle_at_25%_90%,#1e5d6bcc_15%,#000000de_70%,#000000ed_100%)] blur-sm rounded-full w-150 h-150 -translate-x-1/2 transform"></div>
      </motion.div>
    </div>
  );
};
