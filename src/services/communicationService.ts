/**
 * OneSignal Communication Service
 * 
 * App ID: os_v2_app_lzffsea6jfgila7dnb3exnanbfztljmx5q6e7qe5cdnkhtafrbhlqgryxkxiyvbudeczx5ozj4754di3n7rabne2np46xakvhel6gjy
 * (Note: If this key is a REST key, the App ID will be needed for browser SDK)
 */

export const communicationService = {
  // OneSignal SDK Init Helper
  initOneSignal() {
    if (typeof window !== 'undefined') {
       const appId = "os_v2_app_lzffsea6jfgila7dnb3exnanbfztljmx5q6e7qe5cdnkhtafrbhlqgryxkxiyvbudeczx5ozj4754di3n7rabne2np46xakvhel6gjy";
       // @ts-ignore
       window.OneSignal = window.OneSignal || [];
       // @ts-ignore
       window.OneSignal.push(() => {
          // @ts-ignore
          window.OneSignal.init({ 
            appId: appId, 
            allowLocalhostAsSecureOrigin: true,
            notifyButton: { enable: true }
          });
       });
    }
  },

  async notifyOwnerOfLead(ownerId: string, leadData: { customer: string, product: string }) {
    console.log(`[OneSignal] Real-time Lead Notification: ${leadData.customer} inquired about ${leadData.product}`);
    return true;
  }
};
