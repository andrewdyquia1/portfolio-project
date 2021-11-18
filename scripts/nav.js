const hamburger = document.querySelector('.nav__hamburger')
const navHome = document.querySelector('.nav__link--header')
const navItems = document.querySelectorAll('.nav__item')
const navMenu = document.querySelector('.nav__item-container')
let navActive = false
function toggleNavMenu(){
    const navBunTop = document.querySelector('.nav__bun--top')
    const navBunMid = document.querySelector('.nav__bun--mid')
    const navBunBot = document.querySelector('.nav__bun--bot')
    
    //toggles whether the navigation menu is active or not through toggling the class
    navMenu.classList.toggle('nav-menu-active')
    navBunTop.classList.toggle('nav__bun--top-active')
    navBunMid.classList.toggle('nav__bun--mid-active')
    navBunBot.classList.toggle('nav__bun--bot-active')
    hamburger.classList.toggle('nav__hamburger-active')
    hamburger.classList.toggle('nav__x-active')
    navItems.forEach(item => item.classList.toggle('nav__item--active'))
    navActive = !navActive
}


hamburger.addEventListener('click', toggleNavMenu)
navHome.addEventListener('click', () => {
    if(navActive){
        toggleNavMenu()
    } 
})
navItems.forEach(item => item.addEventListener('click', toggleNavMenu))