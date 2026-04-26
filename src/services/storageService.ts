/**
 * Cloudinary Storage Service Utility
 * 
 * Cloud Name: dw80rtrhc
 */

export const storageService = {
  getUploadWidget(onSuccess: (url: string) => void) {
    if (typeof window === 'undefined') return null;

    // @ts-ignore
    return window.cloudinary?.createUploadWidget(
      {
        cloudName: 'dw80rtrhc',
        uploadPreset: 'boutique_uploads', // Note: User needs to create this preset as 'unsigned' in Cloudinary
        cropping: true,
        multiple: false,
        theme: 'minimal',
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#E5C1CD",
            tabIcon: "#333333",
            menuIcons: "#333333",
            textDark: "#333333",
            textLight: "#FFFFFF",
            link: "#E5C1CD",
            action: "#333333",
            inactiveTabIcon: "#999999",
            error: "#F44235",
            inProgress: "#E5C1CD",
            complete: "#20B832",
            sourceBg: "#F9F7F1"
          }
        }
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onSuccess(result.info.secure_url);
        }
      }
    );
  }
};
