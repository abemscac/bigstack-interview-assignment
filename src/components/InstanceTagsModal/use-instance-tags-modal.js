import { useState } from 'react';

export const useInstanceTagsModal = () => {
  const [state, setState] = useState({
    open: false,
    editedInstance: undefined
  });

  const openModal = instance => {
    setState({
      open: true,
      editedInstance: instance
    });
  };

  const closeModal = () => {
    setState(prev => ({
      ...prev,
      open: false
    }));
  };

  return {
    modalOpen: state.open,
    editedInstance: state.editedInstance,
    openModal,
    closeModal
  };
};
