
const form = document.querySelector("form")
form.addEventListener('submit',(e) => {
    e.preventDefault();

    const userInput = document.getElementById("search").value
    
     const cleanString = userInput.split(' ').join('');
     const form = document.querySelector("form")
            const reposList = document.createElement("div");
            reposList.id ="repos-list-container"
            form.appendChild(reposList)

     alert(cleanString)
    // fetch("https://api.github.com/search/users/"+cleanString)
    fetch(`https://api.github.com/users/${cleanString}` )
    .then(response => response.json())
    .then(data => {
        if(data.login===cleanString){
        
        document.getElementById("github-container").innerHTML=`
        <button id="user-name-btn">${data.login}</button>
        <a href="${data.html_url}"> Link to Profile </a>
        <img src="${data.avatar_url}">
        `  ; 
        document.getElementById("user-name-btn").addEventListener("click", (e) => {
         fetch(`https://api.github.com/users/${cleanString}/repos`)
        .then(response => response.json())
        .then(data => {
                data.forEach(repo => {
                    const reposDisplay = document.createElement("li");
                    reposDisplay.textContent = repo.name;
                    reposList.appendChild(reposDisplay);
                });
             
        })
        .catch(error => {
            console.error('Error:', error);
            console.log("Your code has a problem")
        });
        })
        }
        else{
            document.getElementById("github-container").innerHTML=`
        <p>User not Found </p>
        `
        }
    })

})

