import styles from './ConfirmModal.module.scss';
import { Fragment, ReactNode, useState } from 'react';
import clsx from 'clsx';
import Trigger, { type TriggerProps } from '../Trigger';

export interface ConfirmModalProps
  extends Pick<TriggerProps, 'children' | 'popupClassName' | 'placement' | 'popupStyle'> {
  title?: string;
  content: ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void | boolean | Promise<void | boolean>;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    popupClassName,
    title,
    content,
    onCancel,
    onConfirm,
    cancelButtonText,
    confirmButtonText,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Trigger
      popupClassName={clsx(styles.popup, popupClassName)}
      popup={
        <Fragment>
          <div className={styles.title}>{title ?? '确认'}</div>
          <div className={styles.content}>{content}</div>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => {
                setOpen(false);
                onCancel?.();
              }}
              disabled={isLoading}
            >
              {cancelButtonText ?? '取消'}
            </button>
            <button
              className={styles.button}
              onClick={async () => {
                setIsLoading(true);
                const result = await onConfirm?.();
                setIsLoading(false);
                if (result !== false) {
                  setOpen(false);
                }
              }}
              disabled={isLoading}
            >
              {confirmButtonText ?? '确认'}
            </button>
          </div>
        </Fragment>
      }
      trigger="click"
      placement="top"
      offset={4}
      open={open}
      onOpenChange={setOpen}
      {...rest}
    />
  );
};

export default ConfirmModal;
