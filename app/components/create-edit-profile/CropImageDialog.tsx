'use client'

import React from 'react';
import Modal from '@/components/shared/Dialog';
import { useEditProfileImage } from '@/lib/useModals';
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

type cropImageDialogProps = {
  src: string
  cropAspectRatio: number
  onCropped: (blob: Blob | null) => void
  onClose: () => void
}

const CropImageDialog = ({src, cropAspectRatio, onClose, onCropped}: cropImageDialogProps) => {
  const editProfile = useEditProfileImage();

  const cropperRef = React.useRef<ReactCropperElement>(null);

  const crop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) {
      return;
    }
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
    onClose();
  };

  return (
    <Modal 
      isOpen={editProfile.isOpen} 
      title='Crop Profile Image'
      onClose={editProfile.onClose}
      useCloseButton={false}
      >
      <Cropper 
        src={src} 
        aspectRatio={cropAspectRatio} 
        guides={false} 
        zoomable={false} 
        ref={cropperRef}
        className='mx-auto size-fit'
      />
    </Modal>
  );
}

export default CropImageDialog;
