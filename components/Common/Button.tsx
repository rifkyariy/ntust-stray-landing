'use client'

import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variants = {
    primary:
      'bg-gradient-to-r from-accent-cyan to-accent-indigo text-white shadow-lg shadow-accent-cyan/25 hover:shadow-accent-cyan/40 hover:scale-105 hover:-translate-y-0.5',
    secondary:
      'bg-bg-secondary text-text-primary border border-white/10 hover:border-accent-cyan/50 hover:bg-bg-tertiary hover:scale-105',
    outline:
      'border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-white hover:scale-105',
  }

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
