function mega_menu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('show');
}