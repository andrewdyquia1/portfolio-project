const hamburger = document.querySelector('.nav__hamburger')
const technologiesButtons = document.querySelectorAll('.technologies__btn')
const technologiesProjectsTech = document.querySelectorAll('.technologies__project-tech')
let activeButtons = document.querySelectorAll("[data-active='on']")
const showAllButton = document.querySelector('.technologies__btn--all')

function toggleNavMenu(){
    const navMenu = document.querySelector('.nav__item-container')

    //toggles whether the navigation menu is active or not through toggling the class
    navMenu.classList.toggle('nav-menu-active')

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
        for(button of technologiesButtons){
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
    const technologiesProjectCards = document.querySelectorAll('.technologies__card')
    technologiesProjectCards.forEach(card => card.style.display = 'block')
}

//function triggers from a button click
function toggleProjectDisplay(button){
    for(projectTechs of technologiesProjectsTech){
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

hamburger.addEventListener('click', toggleNavMenu)
technologiesButtons.forEach(button => button.addEventListener('click', toggleTechnologiesButton))
technologiesButtons.forEach(button => button.addEventListener('click', activateShowAllButton))