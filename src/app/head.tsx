export default function Head() {
  return (
    <>
      <title>Try-a-Major - Discover Your Perfect Academic Path</title>
      <meta name="description" content="Explore different academic majors through interactive courses and lessons. Find your passion and make informed decisions about your educational journey." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://try-a-major.vercel.app/" />
      <meta property="og:title" content="Try-a-Major - Discover Your Perfect Academic Path" />
      <meta property="og:description" content="Explore different academic majors through interactive courses and lessons. Find your passion and make informed decisions about your educational journey." />
      <meta property="og:image" content="https://try-a-major.vercel.app/og-image.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://try-a-major.vercel.app/" />
      <meta property="twitter:title" content="Try-a-Major - Discover Your Perfect Academic Path" />
      <meta property="twitter:description" content="Explore different academic majors through interactive courses and lessons. Find your passion and make informed decisions about your educational journey." />
      <meta property="twitter:image" content="https://try-a-major.vercel.app/og-image.jpg" />
      
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="/fonts/inter-var.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous"
      />
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#000000" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://try-a-major.vercel.app/" />
    </>
  )
}