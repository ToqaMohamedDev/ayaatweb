export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1f2937',
      color: '#ECFDF5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          404
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>
          الصفحة غير موجودة
        </p>
      </div>
    </div>
  );
}

