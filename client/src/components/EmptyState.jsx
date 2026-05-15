export default function EmptyState({ title, text }) {
  return (
    <div className="empty-state p-5 text-center">
      <h2 className="h4 fw-black text-gray-900 dark:text-white">{title}</h2>
      <p className="mb-0 text-gray-600 dark:text-gray-200">{text}</p>
    </div>
  );
}
