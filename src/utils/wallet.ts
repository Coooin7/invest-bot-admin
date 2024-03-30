
export const ethereum = (window as any).ethereum;
export function getAddress() {
    const disconnect = window.localStorage.getItem('disconnect') as string;
    if (ethereum && disconnect !== '0') {
        return (ethereum.isConnected() ? (ethereum.selectedAddress ? ethereum.selectedAddress : '') : '').toLowerCase();
    } else {
        return '';
    }
}

export async function connectWallet() {
    if (!ethereum) {
        throw Error('Please install metamask first!')
    }
    window.localStorage.setItem('disconnect', '1');
    return ethereum.request({ method: 'eth_requestAccounts' })
}

export function disconnectWallet() {
    window.localStorage.setItem('disconnect', '0');
}