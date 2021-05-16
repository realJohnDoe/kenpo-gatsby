import create from 'zustand';

const useSearchPopover = create((set, get) => ({
  isOpen: false,
  open: () => {
    if (get().isOpen) return;
    set(() => ({
      isOpen: true,
    }));
  },
  close: () => {
    set(() => ({
      isOpen: false,
    }));
  },
}));

export default useSearchPopover;
