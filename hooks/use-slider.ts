export const useSliderBanner = (isTab: boolean, isMd: boolean): string => {
  if (isTab) {
    return 'main-surat';
  } else if (isMd) {
    return 'medium-surat';
  } else {
    return 'small-surat';
  }
};
