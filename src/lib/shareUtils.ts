let isSharingInProgress = false;

export const advancedShare = async (data: { title: string; text?: string; url: string; imageUrl?: string; dialogTitle?: string }): Promise<boolean> => {
  if (isSharingInProgress) return true;
  isSharingInProgress = true;

  try {
    const shareData: ShareData = {
      title: data.title,
      text: data.text,
      url: data.url,
    };

    let files: File[] = [];

    // Attempt to fetch image and create a File object to share it natively
    if (data.imageUrl && navigator.canShare) {
      try {
        const response = await fetch(data.imageUrl);
        const blob = await response.blob();
        
        let ext = "jpg";
        if (blob.type.includes("png")) ext = "png";
        else if (blob.type.includes("webp")) ext = "webp";

        const file = new File([blob], `share-image.${ext}`, { type: blob.type });
        
        // Check if the device can share files
        if (navigator.canShare({ files: [file] })) {
          files = [file];
          shareData.files = files;
          // Some platforms prefer not to have url/text if files are present, but usually it's fine.
        }
      } catch (e) {
        console.warn("Failed to fetch image for sharing", e);
      }
    }

    if (navigator.share) {
      await navigator.share(shareData);
      isSharingInProgress = false;
      return true;
    } else {
      isSharingInProgress = false;
      return false; // Fallback to copy link / manual share modal
    }
  } catch (error) {
    isSharingInProgress = false;
    if ((error as Error).name === 'AbortError') {
       return true; // user cancelled, do not show fallback
    }
    console.error("Error sharing:", error);
    return false;
  }
};
