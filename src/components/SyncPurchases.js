import axios from 'axios'
import config from '../config'

const SyncPurchases = {
    job: false,
    startJob: () => {
        if (!SyncPurchases.job) {
            setInterval(SyncPurchases.syncData, 20000);
            SyncPurchases.job = true;
        }
    },
    purchaseKey: () => {
        return `pcs::${new Date().getTime()}`
    },
    storePurchase: (purchase) => {
        localStorage.setItem(SyncPurchases.purchaseKey(), JSON.stringify(purchase));
    },
    syncData: async () => {
        for (var key in localStorage) {
            if (key.indexOf('pcs::') === 0) {
                var purchase = JSON.parse(localStorage.getItem(key))

                try {
                    await axios({
                        method: 'post',
                        url: config.googleScriptURL + '?action=create_transaction',
                        data: purchase,
                        headers: {
                            'Content-Type': 'text/plain',
                        }
                    })

                    localStorage.removeItem(key);
                } catch (error) {
                    console.info(error)
                    break;
                }
            }
        }
    }
};

export default SyncPurchases;
