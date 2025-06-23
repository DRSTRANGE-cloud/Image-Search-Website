const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result")
const showMoreBtn = document.getElementById("show-more-btn")
const showLessBtn = document.getElementById("show-less-btn")

const accessKey = "vUGMQK9jc_3k4BSfZs0iIWheBPzCl3cKbd8NkWd4bSU"
let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (keyword.length == 0){
        showMoreBtn.style.display = 'none'
    }

    if (page === 1){
        searchResult.innerHTML = ""
    }
    results.forEach((result)=>{

        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink)
        showMoreBtn.style.display = 'block';
        
    })
    if(page >= 2){
        
        showLessBtn.style.display = 'block'
    }

}

function removeImages(){

    const elementRemove = searchResult.querySelectorAll("a")

    for(let i = 0 ; i < 12; i++)
    {
        searchResult.removeChild(elementRemove[i])
    }
    if (page == 1){
        showLessBtn.style.display = "none"
    }
}
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click",()=>{
    page++
    searchImages()
})
showLessBtn.addEventListener("click",()=>{
    page--
    removeImages()
})