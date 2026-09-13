import './bootstrap';
import Alpine from 'alpinejs';
import { formatCurrency, formatOdds } from './utils';

// Alpine.js - Trending for cPanel, lightweight, no build needed for simple interactivity
window.Alpine = Alpine;

// Global helpers for Blade
window.PunterUtils = {
    formatCurrency: (amount, currency = 'NGN') => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount);
    },
    formatOdds: (odds) => parseFloat(odds).toFixed(2),
    formatPhoneNigeria: (phone) => {
        let cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('0')) {
            cleaned = '234' + cleaned.substring(1);
        }
        if (!cleaned.startsWith('234') && cleaned.length === 10) {
            cleaned = '234' + cleaned;
        }
        return '+' + cleaned;
    },
    getRiskColor: (risk) => {
        switch(risk) {
            case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
            case 'MEDIUM': return 'text-amber-600 bg-amber-50 border-amber-200';
            case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50';
        }
    }
};

// Alpine components - Trending for cPanel
document.addEventListener('alpine:init', () => {
    Alpine.data('betBuilder', () => ({
        selections: [],
        totalOdds: 1,
        stake: 1000,
        strategy: 'balanced',
        targetOdds: 10,
        
        get potentialWin() {
            return this.stake * this.totalOdds;
        },
        
        addSelection(selection) {
            // Duplicate/conflict detection
            const exists = this.selections.find(s => 
                s.fixtureId === selection.fixtureId && s.market === selection.market
            );
            if (exists) {
                alert('Duplicate selection for same fixture and market!');
                return;
            }
            this.selections.push(selection);
            this.calculateOdds();
        },
        
        removeSelection(index) {
            this.selections.splice(index, 1);
            this.calculateOdds();
        },
        
        calculateOdds() {
            this.totalOdds = this.selections.reduce((acc, sel) => acc * parseFloat(sel.odds), 1);
        },
        
        generateBetCode() {
            // Generate secure bet code
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let code = 'PP-';
            for (let i = 0; i < 8; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }
    }));

    Alpine.data('search', () => ({
        query: '',
        results: { teams: [], leagues: [], fixtures: [] },
        loading: false,
        
        async search() {
            if (this.query.length < 2) return;
            this.loading = true;
            try {
                const response = await fetch(`/api/v1/search?q=${encodeURIComponent(this.query)}`);
                const data = await response.json();
                this.results = data.data.results || {};
            } catch (e) {
                console.error('Search failed:', e);
            }
            this.loading = false;
        }
    }));
});

Alpine.start();

// Livewire 3 - Trending for Laravel cPanel, dynamic without full JS framework
console.log('✅ Punter Prediction - Laravel 11 + Livewire 3 + Alpine 3 + Tailwind 3.4 - cPanel Ready');
console.log('✅ Football & Basketball Equal First-Class Treatment');
console.log('✅ No Docker/Redis Required - cPanel PHP Native');
console.log('🔞 18+ Responsible Betting - Analytical estimates, not guarantees');
