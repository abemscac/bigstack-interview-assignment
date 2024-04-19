import { createPortal } from 'react-dom';

/**
 * According to the official documentation of `@carbon/react`, `<Modal>` and `<ComposedModal>` has to be
 * put at the top level in a React tree.
 * @see https://react.carbondesignsystem.com/?path=/docs/components-modal--overview#openingclosing-modal
 * @param {object} props
 * @param {any} props.children
 */
export const ModalPortal = props => {
  const { children } = props;

  return typeof document === 'undefined'
    ? null
    : createPortal(children, document.body);
};
