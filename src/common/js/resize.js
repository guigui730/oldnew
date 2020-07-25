function reseize() {
    const width = document.documentElement.clientWidth;
    const discount = 750 / 100;
    const fontSize = width / discount;
    document.documentElement.style.fontSize = fontSize + 'px';
}
reseize();
window.onresize = () => {
    reseize();
};