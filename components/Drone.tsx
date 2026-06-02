"use client";

import { motion } from "framer-motion";

const rotors = [
  [70, 55],
  [330, 55],
  [70, 165],
  [330, 165],
] as const;

export function Drone({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full drop-shadow-[0_34px_60px_rgba(0,0,0,0.6)]"
      >
        <defs>
          <linearGradient id="dHull" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#42464d" />
            <stop offset="45%" stopColor="#23242a" />
            <stop offset="100%" stopColor="#0c0c0e" />
          </linearGradient>
          <linearGradient id="dCanopy" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5b6068" />
            <stop offset="100%" stopColor="#2a2c32" />
          </linearGradient>
          <linearGradient id="dArm" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#34373d" />
            <stop offset="100%" stopColor="#1a1b1f" />
          </linearGradient>
          <radialGradient id="dDisc" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#6b7178" stopOpacity="0" />
            <stop offset="58%" stopColor="#6b7178" stopOpacity="0.04" />
            <stop offset="84%" stopColor="#aab0b8" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#aab0b8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dLens" cx="0.5" cy="0.45" r="0.55">
            <stop offset="0%" stopColor="#fbeec3" />
            <stop offset="45%" stopColor="#d4a13a" />
            <stop offset="100%" stopColor="#1c1408" />
          </radialGradient>
          <linearGradient id="dAccent" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8a5e1a" stopOpacity="0" />
            <stop offset="50%" stopColor="#e8c25a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8a5e1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* soft ground shadow */}
        <ellipse cx="200" cy="206" rx="118" ry="9" fill="rgba(0,0,0,0.4)" />

        {/* Arms */}
        <g stroke="url(#dArm)" strokeWidth="9" strokeLinecap="round">
          <line x1="196" y1="108" x2="70" y2="55" />
          <line x1="204" y1="108" x2="330" y2="55" />
          <line x1="196" y1="112" x2="70" y2="165" />
          <line x1="204" y1="112" x2="330" y2="165" />
        </g>
        {/* arm top highlight */}
        <g stroke="#52575f" strokeWidth="2" strokeLinecap="round" opacity="0.55">
          <line x1="196" y1="106" x2="72" y2="53" />
          <line x1="204" y1="106" x2="328" y2="53" />
        </g>

        {/* Rotors — motion-blur discs + faint spinning sheen + motor hub */}
        {rotors.map(([cx, cy], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="54" ry="52" fill="url(#dDisc)" />
            <g opacity="0.22">
              <rect
                x={cx - 52}
                y={cy - 1.4}
                width="104"
                height="2.8"
                rx="1.4"
                fill="#b6bcc4"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${cx} ${cy}`}
                  to={`360 ${cx} ${cy}`}
                  dur={`${0.45 + i * 0.03}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x={cx - 1.4}
                y={cy - 52}
                width="2.8"
                height="104"
                rx="1.4"
                fill="#b6bcc4"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${cx} ${cy}`}
                  to={`360 ${cx} ${cy}`}
                  dur={`${0.45 + i * 0.03}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <circle
              cx={cx}
              cy={cy}
              r="13"
              fill="#16171b"
              stroke="#34373d"
              strokeWidth="2"
            />
            <circle cx={cx} cy={cy} r="4.5" fill="#3a3d44" />
            <circle cx={cx} cy={cy} r="1.6" fill="#52575f" />
          </g>
        ))}

        {/* Body */}
        <path
          d="M148 78 Q200 70 252 78 L274 110 L252 148 Q200 156 148 148 L126 110 Z"
          fill="url(#dHull)"
          stroke="#3a3d44"
          strokeWidth="1.5"
        />
        {/* canopy */}
        <path
          d="M158 84 Q200 78 242 84 L256 102 Q200 96 144 102 Z"
          fill="url(#dCanopy)"
          opacity="0.95"
        />
        {/* gold accent line */}
        <rect x="150" y="120" width="100" height="2" rx="1" fill="url(#dAccent)" />

        {/* Camera gimbal */}
        <circle cx="200" cy="150" r="22" fill="#101013" stroke="#34373d" strokeWidth="2" />
        <circle cx="200" cy="150" r="15" fill="#08080a" />
        <motion.circle
          cx="200"
          cy="150"
          r="8"
          fill="url(#dLens)"
          animate={{ opacity: [0.78, 0.96, 0.78] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="197" cy="147" r="2.2" fill="#fff" opacity="0.85" />

        {/* subtle nav lights */}
        <circle cx="158" cy="118" r="2.4" fill="#e06a5a" opacity="0.7" />
        <circle cx="242" cy="118" r="2.4" fill="#6ad29a" opacity="0.7" />
      </svg>
    </motion.div>
  );
}
