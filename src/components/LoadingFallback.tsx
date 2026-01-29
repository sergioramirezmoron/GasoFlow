interface LoadingFallback {
  message?: string;
}

const LoadingFallback = ({ message = "Cargando..." }: LoadingFallback) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-18 w-16 border-2 border-sky-700 mx-auto mb-4"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
