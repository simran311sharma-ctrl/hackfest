import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ notifications, onDismiss }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="toast-container">
      {notifications.map((toast) => {
        let Icon = CheckCircle2;
        if (toast.type === 'error') Icon = XCircle;
        if (toast.type === 'warning') Icon = AlertTriangle;
        if (toast.type === 'info') Icon = Info;

        return (
          <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
            <Icon size={18} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.885rem' }}>
              {toast.title && <strong style={{ display: 'block', marginBottom: '2px' }}>{toast.title}</strong>}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
