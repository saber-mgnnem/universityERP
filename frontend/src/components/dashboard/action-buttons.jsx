'use client';

export default function ActionButtons({ actions = [] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            action.variant === 'primary'
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : action.variant === 'secondary'
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              : action.variant === 'danger'
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          {action.icon && <span className="mr-2">{action.icon}</span>}
          {action.label}
        </button>
      ))}
    </div>
  );
}
