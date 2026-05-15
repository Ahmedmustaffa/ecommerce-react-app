export default function EmptyState({ title, text }) {
  return (
    <div className="empty-state p-5 text-center">
      <h2 className="h4 fw-black text-primary-veera">{title}</h2>
      <p className="mb-0">{text}</p>
    </div>
  );
}