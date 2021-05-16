import useSearchPopover from '../state/useSearchPopover';

const useKeyboardListeners = () => {
  const { open } = useSearchPopover();

  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.code === 'Digit7') {
      open();
    }
  });
};

export default useKeyboardListeners;
