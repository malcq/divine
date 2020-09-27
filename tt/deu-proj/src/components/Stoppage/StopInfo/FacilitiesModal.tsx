import React from 'react';
import { SettingsContext } from 'src/contexts/Settings';
import dynamic from 'next/dynamic';

import { DeviceTypes } from '@utils/constants';
import { AvailableFacilities } from '@models/stop';

const ReactModal = dynamic(() => import('react-modal'));
const BaseModal = dynamic(() => import('@components/Modals/BaseModal'));
const ModalContent = dynamic(() => import('./ModalContent'));

type Props = {
  isOpenModal: boolean;
  available_facilities: AvailableFacilities[];
  portalClassName: string;
  overlayClassName: string;
  className: string;
  bodyOpenClassName: string;
  contentClassName: string;
  setIsOpenModal: () => void;
};

const FacilitiesModal: React.FC<Props> = (props) => {
  const { deviceInfo, clientInfo } = React.useContext(SettingsContext);
  const isBodyOverflowing = clientInfo?.isBodyOverflowing ?? false;

  const {
    isOpenModal,
    available_facilities,
    bodyOpenClassName,
    className,
    contentClassName,
    overlayClassName,
    portalClassName,
    setIsOpenModal
  } = props;
  return (
    deviceInfo.type === DeviceTypes.mobile)
    ? (
      <ReactModal
        closeTimeoutMS={200}
        isOpen={isOpenModal}
        portalClassName={portalClassName}
        overlayClassName={overlayClassName}
        className={className}
        bodyOpenClassName={bodyOpenClassName}
        ariaHideApp={false}
        onRequestClose={setIsOpenModal}
        shouldCloseOnEsc
      >
        <ModalContent
          available_facilities={available_facilities}
          onClose={setIsOpenModal}
        />
      </ReactModal>
    )
    : (
      <BaseModal
        isOpen={isOpenModal}
        onClose={setIsOpenModal}
        contentClassName={contentClassName}
        isBodyOverflowing={isBodyOverflowing}
      >
        <ModalContent
          available_facilities={available_facilities}
          onClose={setIsOpenModal}
        />

      </BaseModal>
    )

};

export default FacilitiesModal;