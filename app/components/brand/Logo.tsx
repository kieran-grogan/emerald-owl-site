import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@lib/constants';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export function Logo({ className = '', variant = 'default' }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="https://storage.googleapis.com/msgsndr/dBBYZQOF7ecSj2tAQl4N/media/6704204dd9d9a095a00d5b580.png"
        alt={BRAND.NAME}
        width={200}
        height={50}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
} 