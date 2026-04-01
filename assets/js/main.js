/**
 * Common Inventory System JS — Node.js / MongoDB version
 */

const InvApp = {
    user: null,

    checkSession: function () {
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            return Promise.resolve(null);
        }

        return fetch('api/dashboard')
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

    logout: function () {
        if (confirm("Are you sure you want to logout?")) {
            fetch('api/logout')
                .then(() => window.location.href = 'index.html')
                .catch(() => window.location.href = 'index.html');
        }
    },

    formatCurrency: function (value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            InvApp.logout();
        });
    }

    if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        InvApp.checkSession();
    }
});
