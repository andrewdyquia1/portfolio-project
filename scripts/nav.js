const hamburger = document.querySelector('.nav__hamburger')

function toggleNavMenu(){
    const navMenu = document.querySelector('.nav__item-container')
    const navBunTop = document.querySelector('.nav__bun--top')
    const navBunMid = document.querySelector('.nav__bun--mid')
    const navBunBot = document.querySelector('.nav__bun--bot')
    const navItems = document.querySelectorAll('.nav__item')

    //toggles whether the navigation menu is active or not through toggling the class
    navMenu.classList.toggle('nav-menu-active')
    navBunTop.classList.toggle('nav__bun--top-active')
    navBunMid.classList.toggle('nav__bun--mid-active')
    navBunBot.classList.toggle('nav__bun--bot-active')
    hamburger.classList.toggle('nav__hamburger-active')
    hamburger.classList.toggle('nav__x-active')
    navItems.forEach(item => item.classList.toggle('nav__item--active'))
}

hamburger.addEventListener('click', toggleNavMenu)