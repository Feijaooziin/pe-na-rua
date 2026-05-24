let cameraCallback: ((uri: string) => void) | null = null;

export function setCameraCallback(callback: (uri: string) => void) {
  cameraCallback = callback;
}

export function emitCameraPhoto(uri: string) {
  if (cameraCallback) {
    cameraCallback(uri);
    cameraCallback = null;
  }
}
