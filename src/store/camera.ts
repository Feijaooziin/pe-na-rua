type CameraData = {
  currentImages: string[];
  maxImages: number;
  callback: (images: string[]) => void;
};

let cameraData: CameraData | null = null;

export function setCameraData(data: CameraData) {
  cameraData = data;
}

export function getCameraData() {
  return cameraData;
}

export function clearCameraData() {
  cameraData = null;
}
