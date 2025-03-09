import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSidebarStore; // Exportación por defecto