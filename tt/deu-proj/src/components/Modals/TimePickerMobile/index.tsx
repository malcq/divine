import React from 'react';

import BaseModal from '../BaseModal';
import ModalContent from './ModalContent';
import { DepartureTypes } from '../../../utils/constants';
import { DoneSelectionType } from './models';

type Props = {
  isOpen: boolean,
  onClose?: () => void,
  onConfirm?: (ev: DoneSelectionType) => void,
  initialDate?: Date,
  initialDeparture?: DepartureTypes,
}
class TimePickerMobile extends React.Component<Props> {

  static defaultProps = {
    onClose: () => null,
    onConfirm: () => null,
  }

  render() {
    const {
      isOpen,
      onClose,
      onConfirm,
      initialDate,
      initialDeparture,
    } = this.props;

    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent
          onConfirm={onConfirm}
          onCancel={onClose}
          initialDate={initialDate}
          initialDeparture={initialDeparture}
        />
      </BaseModal>
    )
  }
}

export default TimePickerMobile;