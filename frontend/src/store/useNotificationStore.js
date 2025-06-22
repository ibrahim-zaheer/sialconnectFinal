import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({ 
      notifications: [notification, ...state.notifications] 
    })),
  markAsRead: (id) => 
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      )
    })),
  markAllAsRead: () => 
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, isRead: true }))
    }))
}));

export default useNotificationStore;