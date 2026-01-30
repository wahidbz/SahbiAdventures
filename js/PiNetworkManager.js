// Pi Network Integration Manager
class PiNetworkManager {
    constructor() {
        this.pi = null;
        this.user = null;
        this.authenticated = false;
        this.piCoins = 0;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return true;
        
        try {
            // Check if Pi SDK is available
            if (typeof Pi === 'undefined') {
                console.warn('Pi SDK not available - running in sandbox mode');
                this.useSandboxMode();
                return true;
            }

            this.pi = window.Pi;
            
            // Initialize Pi SDK
            await this.pi.init({ 
                version: "2.0",
                sandbox: GameConfig.PI_NETWORK.SANDBOX_MODE 
            });
            
            this.initialized = true;
            console.log('Pi Network SDK initialized');
            return true;
            
        } catch (error) {
            console.error('Pi Network initialization error:', error);
            this.useSandboxMode();
            return false;
        }
    }

    useSandboxMode() {
        // Fallback mode for testing outside Pi Browser
        this.authenticated = true;
        this.user = {
            uid: 'sandbox_user_' + Date.now(),
            username: 'Sahbi_Player'
        };
        this.piCoins = this.loadLocalPiCoins();
        console.log('Running in sandbox mode');
    }

    async authenticate() {
        if (this.authenticated) return this.user;

        try {
            if (!this.pi) {
                this.useSandboxMode();
                return this.user;
            }

            // Authenticate user
            const scopes = ['username', 'payments'];
            const authResult = await this.pi.authenticate(scopes, this.onIncompletePaymentFound.bind(this));
            
            this.user = authResult.user;
            this.authenticated = true;
            
            // Load user's Pi coin balance
            await this.loadPiBalance();
            
            console.log('User authenticated:', this.user.username);
            return this.user;
            
        } catch (error) {
            console.error('Authentication error:', error);
            this.useSandboxMode();
            return this.user;
        }
    }

    async loadPiBalance() {
        try {
            // Load from local storage
            const savedData = localStorage.getItem(GameConfig.STORAGE.PI_DATA);
            if (savedData) {
                const data = JSON.parse(savedData);
                this.piCoins = data.coins || 0;
            }
        } catch (error) {
            console.error('Error loading Pi balance:', error);
            this.piCoins = 0;
        }
    }

    loadLocalPiCoins() {
        try {
            const savedData = localStorage.getItem(GameConfig.STORAGE.PI_DATA);
            if (savedData) {
                const data = JSON.parse(savedData);
                return data.coins || 0;
            }
        } catch (error) {
            return 0;
        }
        return 0;
    }

    addPiCoins(amount) {
        this.piCoins += amount;
        this.savePiData();
        return this.piCoins;
    }

    spendPiCoins(amount) {
        if (this.piCoins >= amount) {
            this.piCoins -= amount;
            this.savePiData();
            return true;
        }
        return false;
    }

    savePiData() {
        try {
            const data = {
                coins: this.piCoins,
                userId: this.user?.uid,
                lastUpdate: Date.now()
            };
            localStorage.setItem(GameConfig.STORAGE.PI_DATA, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving Pi data:', error);
        }
    }

    async createPayment(amount, memo) {
        if (!this.authenticated || !this.pi) {
            console.warn('Payment not available - sandbox mode');
            return null;
        }

        try {
            const payment = await this.pi.createPayment({
                amount: amount,
                memo: memo,
                metadata: { 
                    gameId: 'sahbi_adventures',
                    timestamp: Date.now()
                }
            }, {
                onReadyForServerApproval: (paymentId) => {
                    console.log('Payment ready:', paymentId);
                },
                onReadyForServerCompletion: (paymentId, txid) => {
                    console.log('Payment completed:', paymentId, txid);
                },
                onCancel: (paymentId) => {
                    console.log('Payment cancelled:', paymentId);
                },
                onError: (error, payment) => {
                    console.error('Payment error:', error);
                }
            });

            return payment;
            
        } catch (error) {
            console.error('Create payment error:', error);
            return null;
        }
    }

    onIncompletePaymentFound(payment) {
        console.log('Incomplete payment found:', payment);
        // Handle incomplete payment
        return this.pi.completePayment(payment.identifier);
    }

    getPiCoins() {
        return this.piCoins;
    }

    getUser() {
        return this.user;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

// Create global instance
const piNetwork = new PiNetworkManager();
