let cameraCallback: ((photos: string[]) => void) | null = null;

export function setCameraCallback(callback: (photos: string[]) => void) {
  cameraCallback = callback;
}

export function emitCameraPhotos(photos: string[]) {
  if (cameraCallback) {
    cameraCallback(photos);
    cameraCallback = null;
  }
}
