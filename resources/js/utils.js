export function formatCurrency(amount, currency = 'NGN') {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(amount);
}

export function formatOdds(odds) {
    return parseFloat(odds).toFixed(2);
}

export function formatDate(date, format = 'short') {
    const d = new Date(date);
    if (format === 'time') {
        return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}
