import { ImageResponse } from 'next/og'

// export const runtime = 'edge'

export const alt = 'DevMentor AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F4F2',
          backgroundImage:
            'radial-gradient(circle at center, rgba(232, 115, 106, 0.15) 0%, rgba(245, 244, 242, 1) 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1A1A1A',
            padding: '24px',
            borderRadius: '100%',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3h12l4 6-10 12L2 9z" />
            <path d="M11 3 8 9l4 12 4-12-3-6" />
            <path d="M2 9h20" />
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#1A1A1A',
            letterSpacing: '-0.05em',
          }}
        >
          <span>DevMentor</span>
          <span style={{ color: '#E8736A', marginLeft: '12px' }}>AI</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '32px',
            color: '#6B6B6B',
            marginTop: '24px',
            textAlign: 'center',
            maxWidth: '800px',
            fontWeight: 500,
          }}
        >
          The mentor you never had is waiting. AI-powered coding guidance at 2am.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}