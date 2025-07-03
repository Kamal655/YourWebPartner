import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'display': ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'blob': {
					'0%': { transform: 'translate(0px, 0px) scale(1)' },
					'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'float-reverse': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(20px)' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '0', transform: 'scale(0)' },
					'50%': { opacity: '1', transform: 'scale(1)' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-down': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'rotate-in': {
					'0%': { transform: 'rotate(-360deg) scale(0)', opacity: '0' },
					'100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' }
				},
				'morph-blob': {
					'0%, 100%': { 
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
						transform: 'translate(0, 0) rotate(0deg)'
					},
					'25%': { 
						borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
						transform: 'translate(30px, -20px) rotate(90deg)'
					},
					'50%': { 
						borderRadius: '70% 30% 40% 60% / 70% 40% 60% 30%',
						transform: 'translate(-20px, 30px) rotate(180deg)'
					},
					'75%': { 
						borderRadius: '30% 70% 60% 40% / 30% 60% 40% 70%',
						transform: 'translate(-30px, -30px) rotate(270deg)'
					}
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'neon-glow': {
					'0%, 100%': { 
						textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
					},
					'50%': { 
						textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
					}
				},
				'liquid-morph': {
					'0%, 100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
					'25%': { borderRadius: '58% 42% 75% 25% / 76% 24% 76% 24%' },
					'50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
					'75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'blob': 'blob 7s infinite',
				'float': 'float 6s ease-in-out infinite',
				'float-reverse': 'float-reverse 4s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-up': 'slide-in-up 0.6s ease-out',
				'slide-in-down': 'slide-in-down 0.6s ease-out',
				'zoom-in': 'zoom-in 0.5s ease-out',
				'rotate-in': 'rotate-in 0.8s ease-out',
				'morph-blob': 'morph-blob 8s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 4s ease infinite',
				'neon-glow': 'neon-glow 2s ease-in-out infinite',
				'liquid-morph': 'liquid-morph 10s ease-in-out infinite'
			},
			animationDelay: {
				'100': '0.1s',
				'200': '0.2s',
				'300': '0.3s',
				'400': '0.4s',
				'500': '0.5s',
				'700': '0.7s',
				'1000': '1s',
				'1500': '1.5s',
				'2000': '2s',
				'3000': '3s',
				'4000': '4s',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
