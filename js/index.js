document.addEventListener("DOMContentLoaded", ()=>{
    let form = document.querySelector("#github-form");
    let searchRepo = document.createElement("input");
    let searchUser = document.querySelectorAll("input")[1]
    searchUser.id= "search-user";
    searchUser.value = "search user";
    searchRepo.type ="submit";
    searchRepo.id= "search-repo";
    searchRepo.value= "search repo";
    form.appendChild(searchRepo);

    
    document.querySelector("#github-form").addEventListener("submit", handleSubmit);
    function handleSubmit(event) {
        event.preventDefault();
        let input = document.querySelector("#search");
        let activeElement= document.activeElement;
        if (activeElement.id ==="search-user") {
            document.querySelector("#user-list").innerHTML = "";
            document.querySelector("#repos-list").innerHTML = "";
            getUser(input.value);
        } else if (activeElement.id === "search-repo") {
            document.querySelector("#repos-list").innerHTML = "";
            document.querySelector("#user-list").innerHTML = "";
            searchRepos(input.value);
        }
        document.querySelector("#github-form").reset();
    }

    function getUser(user) {
        fetch(`https://api.github.com/search/users?q=${user}`)
        .then(resp => resp.json())
        .then(data => {
            data.items.forEach(elem => renderUserCard(elem))
        })
    }

    function getRepos(user) {
        fetch(`https://api.github.com/users/${user}/repos`)
        .then(resp=> resp.json())
        .then(data => {
            data.forEach(elem => renderReposCard(elem))
        })
    }

    function searchRepos(repo) {
        fetch(`https://api.github.com/search/repositories?q=${repo}`)
        .then(resp => resp.json())
        .then(data => {
            data.items.forEach(elem=> renderReposList(elem))
        })
    }

    function renderReposList(data) {
        let repoList = document.createElement("li");
        repoList.className="repo-list";
        repoList.innerHTML = `
        <a href= "${data.html_url}">${data.name}</a>
        `;

        document.querySelector("#repos-list").appendChild(repoList);
    }

    function renderReposCard(data){
        let reposCard = document.createElement("li");
        reposCard.className= "repos-card";
        reposCard.innerHTML = `
        <a href = "${data.html_url}">${data.name}</a>
        `;
        
        document.querySelector("#repos-list").appendChild(reposCard);
    }
    
    

    function renderUserCard(data) {
        let userCard = document.createElement("li");
        userCard.className = "user-card";
        userCard.style.padding = "50px";
        userCard.innerHTML = `
        <img src="${data.avatar_url}">
        <h3>${data.login}</h3>
        <a href="${data.html_url}">Go to Profile</a>
        `
        

        userCard.querySelector("h3").addEventListener("click", ()=> {
            document.querySelector("#repos-list").innerHTML = "";
            getRepos(data.login);

            
        });

        document.querySelector("#user-list").appendChild(userCard);

        
    }

























})