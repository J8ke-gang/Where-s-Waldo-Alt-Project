export default function Marker({ x, y, color = "red" }) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${y}%`,
        left: `${x}%`,
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: `4px solid ${color}`,
        pointerEvents: "none",
        boxSizing: "border-box",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
