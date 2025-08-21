import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  // Use appropriate resolution based on size
  const logoSrc = size === 'lg' ? '/android-chrome-192x192.png' : 
                 size === 'md' ? '/android-chrome-192x192.png' : 
                 '/favicon-32x32.png'
  
  const logoSize = size === 'lg' ? 192 : size === 'md' ? 192 : 32

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* High-res Logo */}
      <div className={`${sizeClasses[size]} relative rounded-lg overflow-hidden`}>
        <Image
          src={logoSrc}
          alt="Luca logo"
          width={logoSize}
          height={logoSize}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      
      {/* Logo Text - Clean Inter Font */}
      <span className={`font-inter font-semibold ${textSizeClasses[size]} text-white tracking-tight`}>
        luca
      </span>
    </div>
  )
}