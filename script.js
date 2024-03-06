

const loadPost = async (inputText) => {
    document.getElementById('spinner').style.display = "block" // spinner will open

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`)
    const data = await res.json()

    const posts = data.posts
    itemsData(posts)
}

const itemsData = posts => {
    document.getElementById('spinner').style.display = "none"

    const itemContainer = document.getElementById('item-container')
    posts.forEach((posts) => {


        console.log(posts)
        const div = document.createElement('div')
        div.classList = ' gap-y-5 '
        div.innerHTML = `
        <div class=" p-7 rounded-xl mb-10  bg-base-200">

        <div class="flex gap-x-2 items-center ">
            <div class=" avatar online ${posts.isActive?posts.isActive:"avatar offline"}  w-10">
                <img class="rounded-full"
                src="${posts.image}"/>
            </div>
                
            <div class="flex gap-x-8">
                <p># ${posts.category} </p>
                <p>Author : ${posts.author.name}</p>

            </div>
        </div>
        <div class="ml-12">
            <h1 id="post-title" class="text-2xl font-bold">${posts.title}</h1>
            <p class="py-6">${posts.description}</p>
            <div class="border-t-2 border-dashed border-gray-500"></div>

            <div class="flex justify-between items-center">
                <div class="mt-5 flex gap-x-6">
                    <div class="flex gap-x-2">
                        <img src="images/icon/comment.png" alt="">
                        <p>${posts.comment_count}</p>
                    </div>
                    <div class="flex gap-x-2">
                        <img src="images/icon/view.png" alt="">
                        <p id="view-count">${posts.view_count}</p>
                    </div>
                    <div class="flex gap-x-2">
                        <img src="images/icon/time.png" alt="">
                        <p>${posts.posted_time} min</p>
                    </div>
                </div>

                <div class="mt-5">
                    <button onclick="clickMessaBtn(this)" id="message-btn"><img src="images/icon/message.png" alt=""></button>
                </div>
            </div>
        </div>

    </div>
    
    `

        itemContainer.appendChild(div)


    });

    const letsDiscussSection = document.getElementById('lets-discuss-section');
    letsDiscussSection.classList.remove('hidden')

}




let count = 0
const clickMessaBtn = (currentBtn) => {



    const postContainer = document.getElementById('post-container')

    const postTitle = currentBtn.parentNode.parentNode.parentNode.querySelector("#post-title").innerText
    const viewCount = currentBtn.parentNode.parentNode.querySelector("#view-count").innerText




    const p = document.createElement('p')
    const p1 = document.createElement('p')
    const div = document.createElement('div')

    p.innerText = postTitle
    p1.innerText = viewCount

    // console.log(p)
    div.appendChild(p)
    div.appendChild(p1)

    div.classList.add("flex", "justify-between", "items-center", "gap-x-16", "my-5")
    postContainer.appendChild(div)

    const countContainer = document.getElementById('count-container')
    count = count + 1
    countContainer.innerText = count


}
// SearchButtonHendler
const SearchButtonHendler = () => {
    const inputText = document.getElementById('search-input').value;
    // console.log(inputText)
    loadPost(inputText)

}

// searchButton
const searchButton = () => {
    SearchButtonHendler()
    loadPost()
}

// spinner

// const spinner=()=>{
//     const spinnerDiv=document.getElementById('spinner')
// }

// letest Post 

const letestLoda = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json();
    // console.log(data)
    letestCard(data)
}

const letestCard = (data) => {
    const cardContainer = document.getElementById('letest-container')
    data.forEach((data) => {
        // console.log(data)

        const cardDiv = document.createElement('div');
        cardDiv.classList = ''
        cardDiv.innerHTML = `
            <div class="card  bg-base-100 shadow-xl">

            <figure><img src="${data.cover_image}"
                    alt="Shoes" /></figure>
            <div class="card-body">
                <div class="flex gap-x-2">
                    <div><img src="images/Frame/box.png" alt=""></div>
                    <div>
                        <p>${data.author.posted_date ? data.author.posted_date : "No Publish Date"}</p>
                    </div>

                </div>
                <h3 class="text-xl font-extrabold">${data.title}</h3>
            <p class="text-gray-400 font-normal">${data.description}</p>

                <div class="flex gap-x-2 items-center ">
                    <img class="rounded-full w-10" src="${data.profile_image}" class=" rounded-lg shadow-2xl" />

                    <div class="">
                        <p>${data.author.name}</p>
                        <p>${data.author.designation ? data.author.designation : "Unknowen"}</p>
                    </div>

                </div>

            </div>
        </div>
            

    `
        cardContainer.appendChild(cardDiv)
    })
}
letestLoda()