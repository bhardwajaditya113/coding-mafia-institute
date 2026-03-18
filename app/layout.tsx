import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ToastContainer from '@/components/Toast'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Infinity Loop by Coding Mafia — Premium Source Code + Career Courses',
  description: 'Buy production-ready source code and enroll in expert-led IT courses. Infinity Loop combines instant digital products with job-focused learning paths for Indian and global builders.',
  keywords: 'source code marketplace, coding courses, nextjs templates, razorpay checkout, indian edtech, digital products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID
  const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID
  const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-1223825599701899'

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Google AdSense Verification Code */}
        <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        
        {/* Google AdSense Script (static head script for crawler verification) */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel (Facebook/Instagram) */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* LinkedIn Insight Tag */}
        {LINKEDIN_PARTNER_ID && (
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `}
          </Script>
        )}

        {/* Pinterest Tag */}
        {PINTEREST_TAG_ID && (
          <Script id="pinterest-tag" strategy="afterInteractive">
            {`
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
              n=window.pintrk;n.queue=[],n.version="3.0";var
              t=document.createElement("script");t.async=!0,t.src=e;var
              r=document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', '${PINTEREST_TAG_ID}');
              pintrk('page');
            `}
          </Script>
        )}

      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        {/* Meta Pixel noscript fallback */}
        {META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 noise-overlay" />
          <div className="absolute -top-44 left-1/3 h-96 w-96 rounded-full bg-primary-500/20 blur-[120px]" />
          <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />
          <div className="absolute -bottom-28 right-0 h-[28rem] w-[28rem] rounded-full bg-purple-500/20 blur-[140px]" />
        </div>
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <ToastContainer />
      </body>
    </html>
  )
}
