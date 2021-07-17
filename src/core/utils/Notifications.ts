import { toast, ToastOptions, Slide } from 'react-toastify';

interface NotificationArguments extends ToastOptions {
  message: string;
}

export const showNotification = ({
  message,
  // Some sane defaults
  position = 'bottom-right',
  transition = Slide,
  autoClose = 3500,
  hideProgressBar = true,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  // All possible options
  ...options
}: NotificationArguments) => {
  toast.info(message, {
    position,
    transition,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    ...options,
  });
};
