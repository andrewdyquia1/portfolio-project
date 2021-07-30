// displays the project and animates them from left to right 
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

document.addEventListener('scroll', translateProjects)