export const appStoreIds = Object.freeze({
  googlePlay: 'es.medilens.app',
  appleAppStore: '6749312020',
});

export const appStoreUrls = Object.freeze({
  googlePlay: `https://play.google.com/store/apps/details?id=${appStoreIds.googlePlay}`,
  appleAppStore: `https://apps.apple.com/es/app/medi-lens/id${appStoreIds.appleAppStore}`,
});

/** @param {string} campaign */
export function getTrackedAppStoreUrls(campaign) {
  const tracking = new URLSearchParams({
    utm_source: 'medilens_website',
    utm_medium: 'referral',
    utm_campaign: campaign,
  });

  return {
    googlePlay: `${appStoreUrls.googlePlay}&${tracking}`,
    appleAppStore: `${appStoreUrls.appleAppStore}?${tracking}`,
  };
}
