document.addEventListener('DOMContentLoaded', function() {
    // Inject Modal HTML into the body if it doesn't exist
    if (!document.getElementById('paymentModal')) {
        const modalHTML = `
        <div id="paymentModalOverlay" class="modal-overlay">
            <div id="paymentModal" class="payment-modal">
                <div class="modal-header">
                    <h3>Paiement Sécurisé</h3>
                    <button id="closeModal" class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="payment-item-summary">
                        <span id="modalItemName" class="item-name">Document</span>
                        <span id="modalItemPrice" class="item-price">0 FCFA</span>
                    </div>

                    <div class="payment-method-selector">
                        <span class="payment-method-label">Choisissez votre moyen de paiement :</span>
                        <div class="methods-grid">
                            <div class="payment-method-card" data-method="orange-money">
                                <span class="method-logo om-logo">OM</span>
                                <span>Orange Money</span>
                            </div>
                            <div class="payment-method-card" data-method="wave">
                                <span class="method-logo wave-logo">Wave</span>
                                <span>Wave</span>
                            </div>
                        </div>
                    </div>

                    <form id="paymentForm" class="payment-form">
                        <div class="form-group">
                            <label for="phoneNumber">Numéro de téléphone</label>
                            <input type="tel" id="phoneNumber" class="form-input" placeholder="Ex: 77 123 45 67" required>
                        </div>
                        <button type="submit" class="btn-pay">
                            <span class="btn-text">Payer maintenant</span>
                            <div class="spinner"></div>
                        </button>
                    </form>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Elements
    const modalOverlay = document.getElementById('paymentModalOverlay');
    const closeModalBtn = document.getElementById('closeModal');
    const paymentMethods = document.querySelectorAll('.payment-method-card');
    const paymentForm = document.getElementById('paymentForm');
    const btnPay = paymentForm.querySelector('.btn-pay');
    const btnText = btnPay.querySelector('.btn-text');
    const spinner = btnPay.querySelector('.spinner');
    
    // State
    let selectedMethod = null;

    // Open Modal Function
    window.openPaymentModal = function(itemName, itemPrice) {
        document.getElementById('modalItemName').textContent = itemName;
        document.getElementById('modalItemPrice').textContent = itemPrice;
        modalOverlay.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        // Reset Form
        selectedMethod = null;
        paymentMethods.forEach(m => m.classList.remove('selected'));
        paymentForm.style.display = 'none';
        document.getElementById('phoneNumber').value = '';
    };

    // Close Modal
    function closeModal() {
        modalOverlay.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Method Selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            // UI Update
            paymentMethods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
            
            // Logic
            selectedMethod = method.dataset.method;
            paymentForm.style.display = 'block';
            
            // Focus input
            setTimeout(() => document.getElementById('phoneNumber').focus(), 100);
        });
    });

    // Form Submission (Simulation)
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!selectedMethod) return;

        // Simulate Loading
        btnPay.disabled = true;
        btnText.textContent = 'Traitement en cours...';
        spinner.style.display = 'block';

        setTimeout(() => {
            // Simulate Success
            btnText.textContent = 'Paiement Réussi !';
            spinner.style.display = 'none';
            btnPay.style.background = '#27ae60';

            setTimeout(() => {
                // Simulate Redirection or Download
                alert(`Paiement de ${document.getElementById('modalItemPrice').textContent} validé via ${selectedMethod === 'orange-money' ? 'Orange Money' : 'Wave'} ! \n\nLe téléchargement va commencer (Simulation).`);
                closeModal();
                
                // Reset Button
                btnPay.disabled = false;
                btnText.textContent = 'Payer maintenant';
                btnPay.style.background = '';
            }, 1000);

        }, 2000); // 2 seconds delay
    });
});
