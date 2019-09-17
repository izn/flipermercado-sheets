import axios from 'axios'
import config from '../config'

const SyncPurchases = {
  job: false,

  startJob: () => {
    if (!SyncPurchases.job) {
      setInterval(SyncPurchases.syncData, 20000)
      SyncPurchases.job = true
    }
  },

  purchaseKey: () => {
    return `pcs::${new Date().getTime()}`
  },

  storePurchase: (purchase) => {
    localStorage.setItem(SyncPurchases.purchaseKey(), JSON.stringify(purchase))
  },

  syncData: async () => {
    for (let key in localStorage) {
      if (key.indexOf('pcs::') === 0) {
        try {
          let purchase = JSON.parse(localStorage.getItem(key))

          await SyncPurchases.sendPurchase(purchase)

          localStorage.removeItem(key)
        } catch (error) {
          break
        }
      }
    }
  },

  sendPurchase: async (purchase) => {
    await axios({
      method: 'post',
      url: config.googleScriptURL + '?action=create_transaction',
      data: purchase,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}

export default SyncPurchases
