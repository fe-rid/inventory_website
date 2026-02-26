/**
 * Common Inventory System JS
 */

const InvApp = {
    // Check session status on every authenticated page load
    user: null,

    checkSession: function () {
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            return Promise.resolve(null);
        }

        return fetch('api/dashboard.php')
            .then(res => res.json())
            .then(data => {
                if (!data.success && data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    this.user = data.user;
                    this.applyRoleRestrictions();
                }
                return data;
            })
            .catch(err => {
                console.error("Session check failed", err);
                return { success: false };
            });
    },

    applyRoleRestrictions: function () {
        if (this.user && this.user.role !== 'admin') {
            document.querySelectorAll('.admin-only').forEach(el => {
                el.style.display = 'none';
            });
        }
    },

    // Handle standard logout
    logout: function () {
        if (confirm("Are you sure you want to logout?")) {
            fetch('api/logout.php')
                .then(() => window.location.href = 'index.html')
                .catch(err => window.location.href = 'index.html');
        }
    },

    // Helper to format currency
    formatCurrency: function (value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }
};

// Auto-init for navigation buttons
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            InvApp.logout();
        });
    }

    // Run session check if not on index
    if (!window.location.pathname.endsWith('index.html')) {
        InvApp.checkSession();
    }
});
