import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { LoadingButton } from "@mui/lab";
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmIcon?: ReactJSXElement;
  updateInProgress: boolean;
  cancelLabel: string;
  confirmLabel: string;
  size?: Breakpoint;
  children: ReactJSXElement;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmIcon,
  updateInProgress = false,
  cancelLabel = "Cancel",
  confirmLabel = "Accept",
  size = "sm",
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth={size}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="error" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          loading={updateInProgress}
          loadingPosition="start"
          startIcon={confirmIcon}
          color="success"
          variant="outlined"
          onClick={onConfirm}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
