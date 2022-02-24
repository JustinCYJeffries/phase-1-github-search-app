


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form');
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        getUsers(e.target[0].value)
       
    })
});

    function getUsers(userName){
        fetch(`https://api.github.com/search/users?q=${userName}`, {
        method:"GET",
        headers:{
            Accept: "application/vnd.github.v3+json"
        }
    })
        .then (r => r.json())
        .then (r => r.items.map(item => displayUser(item)))
        
    }
    
    
    function displayUser(user){
        const userList = document.querySelector('#user-list');
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const image = document.createElement('img');
        image.addEventListener("click", getRepos )
        image.src = user.avatar_url
        image.id = user.login
        image.alt = user.login
        h3.textContent = user.login
        li.append(image, h3)
        userList.append(li)
        
       
    }
    function getRepos(e) {
        console.log(e)
        fetch(`https://api.github.com/users/${e.target.id}/repos`, {
            method:"GET",
            headers:{
                Accept: "application/vnd.github.v3+json"
            }
            
        })
        
            .then (r => r.json())
            .then (r => r.map(resp => displayRepos(resp)))
            
        }
        function displayRepos(user){
            const repoList = document.querySelector('#repos-list');
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.innerHTML = "Repos"
            link.href = user.repos_url
            li.append(link)
            repoList.append(li)
        }


    
