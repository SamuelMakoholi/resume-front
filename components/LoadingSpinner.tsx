interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function LoadingSpinner({ 
  text = "Loading...", 
  size = 'medium',
  className = "" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-green-600`}></div>
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );
}
