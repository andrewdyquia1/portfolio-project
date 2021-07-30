const hamburger = document.querySelector('.nav__hamburger')
const smallProjectsButtons = document.querySelectorAll('.projects-sm__btn')
const smallProjectsTech = document.querySelectorAll('.projects-sm__project-tech')
let activeButtons = document.querySelectorAll("[data-active='on']")
const showAllButton = document.querySelector('.projects-sm__btn--all')
// const projects = document.querySelector('.projects')

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


function toggleTechnologiesButton(){
    //'this' is used because there are multiple buttons that use this function
    this.classList.toggle('technology-button-active')

    //notes whether the clicked button is active or not
    for(i = 0; i < this.classList.length; i++){
        if(this.classList[i] != 'technology-button-active'){
            this.dataset.active = 'off'
        } else {
            this.dataset.active = 'on'
        }
    }

    //if the "Show All" button is clicked and is active, remove all "active" classes of the technologies buttons but not including the "Show All" button itself
    if (this.dataset.active == 'on' && this.innerText == 'Show All'){
        showAllProjects()
        for(button of smallProjectsButtons){
            if(button.innerText == 'Show All'){
                continue
            } else {
                toggleButtonActivity(button, 'off')
            }
        }
    //if the "Show All" button isn't clicked but it is active, remove the active class from that button
    } else if (this.dataset.active == 'on' && this.innerText != 'Show All'){
        for(cls of showAllButton.classList) {
            if(cls == 'technology-button-active'){
                toggleButtonActivity(showAllButton, 'off')
            }
        }
    }
    
    //updates the node list of active buttons
    activeButtons = document.querySelectorAll("[data-active='on']")
    toggleProjectDisplay(this)
}

//adds or removes class of button depending on if the button should be on or off. It is determined whether data-active has either 'on' or 'off' assigned
function toggleButtonActivity(button, onOrOff){
    button.dataset.active = onOrOff

    if(onOrOff == 'on'){
        button.classList.add('technology-button-active')
    } else if(onOrOff == 'off'){
        button.classList.remove('technology-button-active')
    }  
}

function translateProjects(){
    const projectContainers = document.querySelectorAll('.projects__project-container')
    for(i = 0; i < projectContainers.length; i++){
        const slightlyAboveBottomOfViewportHeight = projectContainers[i].getBoundingClientRect().top - window.innerHeight + 50
        console.log(projectContainers[0].getBoundingClientRect().top - window.innerHeight)
         if(slightlyAboveBottomOfViewportHeight < 0){
            projectContainers[i].classList.add('projects-translated')
        }
    }
}
//if the node list of active buttons is empty, activate the 'show all' button. Will show all projects too
function activateShowAllButton(){

    if(activeButtons.length == 0){
        toggleButtonActivity(showAllButton, 'on')
        activeButtons = document.querySelectorAll("[data-active='on']")

        showAllProjects()
    }

}

//will display all of the projects
function showAllProjects(){
    const smallProjectCards = document.querySelectorAll('.projects-sm__card')
    smallProjectCards.forEach(card => card.style.display = 'block')
}

//function triggers from a button click
function toggleProjectDisplay(button){
    for(projectTechs of smallProjectsTech){
        let projectCard = projectTechs.parentElement.parentElement.parentElement
        let listOfProjectTech = projectTechs.children
        loop2:
        for(i = 0; i<activeButtons.length; i++){
            for(j = 1; j <= listOfProjectTech.length; j++){
                //if an active button's text matches with a project's technology, display the card with that technology then check next button's text for a match
                if(activeButtons[i].innerText == listOfProjectTech[j-1].innerText){
                    projectCard.style.display = 'block';
                    break
                //if an active button's text doesn't match any of a project's technologies, do one of the following
                }else if(activeButtons[i].innerText != listOfProjectTech[j-1].innerText){
                    //if this is the last technology of the project and the button clicked doesn't have the text of 'Show All', hide the project's card then check if the next project should be displayed or not 
                    if(j == listOfProjectTech.length && button.innerText != 'Show All'){
                        projectCard.style.display = 'none'
                        break loop2
                    //if this isn't the last technology of the project, check the next technology of the project
                    } else if(j < projectTechs.children.length){
                        continue
                    }
                }
            }
        }      
    }
}


smallProjectsButtons.forEach(button => button.addEventListener('click', toggleTechnologiesButton))
smallProjectsButtons.forEach(button => button.addEventListener('click', activateShowAllButton))
document.addEventListener('scroll', translateProjects)