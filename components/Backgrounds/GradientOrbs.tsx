import React from 'react'

export default function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="orb animate-pulse-orb"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
        }}
      />
      <div
        className="orb animate-float-slow"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          bottom: '10%',
          left: '-100px',
          animationDelay: '2s',
        }}
      />
      <div
        className="orb animate-pulse-orb"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          animationDelay: '1s',
        }}
      />
    </div>
  )
}
