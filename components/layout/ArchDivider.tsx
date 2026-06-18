export default function ArchDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-6"
        aria-hidden="true"
      >
        <line x1="0" y1="12" x2="72" y2="12" stroke="#E2D6C2" strokeWidth="1" />
        <path
          d="M 80 20 Q 100 2 120 20"
          stroke="#A87C56"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <line x1="128" y1="12" x2="200" y2="12" stroke="#E2D6C2" strokeWidth="1" />
      </svg>
    </div>
  )
}
