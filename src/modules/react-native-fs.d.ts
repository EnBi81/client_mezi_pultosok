declare module 'react-native-fs' {
  export const ExternalDirectoryPath: string;
  export const exists: (path: string) => Promise<void>;
  export const unlink: (path: string) => Promise<void>;
  export const downloadFile: (args: {
    fromUrl: string;
    toFile: string;
    progress: (args: { bytesWritten: number; contentLength: number }) => void;
  }) => { promise: Promise<{ statusCode: number }> };
}
