import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KILLSHOT | 프리미엄 커스텀 키보드',
  description: 'KILLSHOT — 완벽한 키 입력을 추구하는 프리미엄 커스텀 기계식 키보드 브랜드.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body style={{ fontFamily: 'var(--font-body)' }}>{children}</body>
    </html>
  );
}
