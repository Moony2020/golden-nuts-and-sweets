'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './TopLoader.module.css';

export default function TopLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const [fading, setFading] = useState(false);
  const prevPath = useRef(pathname);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    clear();
    setActive(true);
    setFading(false);
    setWidth(12);
    intervalRef.current = setInterval(() => {
      setWidth(w => {
        if (w >= 80) { clear(); return 80; }
        return w + Math.random() * 7 + 2;
      });
    }, 350);
  };

  const finish = () => {
    clear();
    setWidth(100);
    setFading(true);
    setTimeout(() => {
      setActive(false);
      setWidth(0);
      setFading(false);
    }, 420);
  };

  // Start bar when user clicks an internal nav link
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (!href || href.startsWith('http') || href.startsWith('#') || href === pathname) return;
      start();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  // Finish bar when route change is complete
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      finish();
    }
  }, [pathname]);

  useEffect(() => () => clear(), []);

  if (!active) return null;

  return (
    <div
      className={`${styles.bar} ${fading ? styles.fading : ''}`}
      style={{ width: `${width}%` }}
    />
  );
}
