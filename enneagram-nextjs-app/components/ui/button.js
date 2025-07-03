
export function Button({ children, onClick, className = '', disabled = false, variant = 'default' }) {
  const base = "px-4 py-2 rounded text-white font-medium";
  const styles = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
  };
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${disabledStyle} ${className}`}>
      {children}
    </button>
  );
}
