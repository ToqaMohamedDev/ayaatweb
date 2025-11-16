"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">حدث خطأ</h1>
        <p className="text-xl mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  );
}

