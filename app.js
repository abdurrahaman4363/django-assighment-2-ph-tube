const loadAllData = () =>{
//   console.log("all");
  fetch(`https://openapi.programming-hero.com/api/videos/categories`)
  .then((res) => res.json())
  .then((data) => displayAllLoadedData(data.data));

}

const displayAllLoadedData = (datas) =>{
    // console.log(datas);
    const allUl = document.getElementById('allData')
    datas.forEach(data => {

        const newLi = document.createElement('li')
        newLi.innerHTML = `
                    ${data.category}
         `
        newLi.setAttribute("class",`${data.category=='All'? 'bg-danger' : 'bg-body-secondary' } border-3 rounded-3 py-2 px-3`)
         newLi.onclick = () => {
          loadCategoryData(data.category_id);

          allUl.querySelectorAll('li').forEach(lii => {
            lii.classList.remove('bg-danger');
        });
        newLi.setAttribute("class",`bg-danger border-3 rounded-3 py-2 px-3`)
              
         };             
         allUl.appendChild(newLi)
    })
}



const loadCategoryData = (category) => {
    // console.log(`Clicked on category: ${category}`);

    fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayCategoryData(data.data));

  };

  loadCategoryData(1000)
  const displayCategoryData = (infoies) =>{
    console.log(infoies);
    const allCategory = document.getElementById('allCategory');
        allCategory.innerHTML = " "

      if(!infoies.length){
        allCategory.innerHTML = `
        <img style="width: 200px;height: 180px;margin:auto"  src="./images/Icon.png" alt="">
        <h1 class="text-center">Oops!!! Sorry, There is no</h1> <br>
        <h1 class="text-center"> content here.</h1>
        `
      }
      // sort button 
       const sortButton = document.getElementById('sort-by-view');
       sortButton.onclick = () => {
         infoies.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
         displayCategoryData(infoies);
       };

    infoies.forEach(info => {
        // console.log(info);
        // console.log(info.authors[0].profile_name);
        const card = document.createElement('div')
       
        card.innerHTML = `
        <div class="card " style="width: 100%;">
        
       <div class="position-relative"> <img style="height: 200px; width: 100%;" src=${info.thumbnail} class="card-img-top " alt="..."></img>
       <p class="text-end rounded-3" style="position: absolute; bottom: 0; right: 0; color: #FFFFFF;background-color: #171717; padding: 5px;">${info.others?.posted_date && calculatedTime(info.others?.posted_date)}</p>
       </div>
        <div class="card-body d-flex">
          <div><img style="width: 50px;height: 50px;border-radius: 25px; " src=${info.authors[0].profile_picture} class="card-img-top" alt="..."></img></div>
          <div class="ms-3">
          <h5 class="card-title">${info.title}</h5>
          <P>${info.authors[0].profile_name}   ${info.authors[0].verified && '<i style="width: 20px; height:20px; border-radius: 15px;" class="fa fa-check text-center bg-primary text-white" style="font-size:60px;color:rgb(55, 0, 255);"></i>'} </P>
          <p>${info.others.views}</p>
          </div>
        </div>
      </div>
        `

        card.setAttribute("class",'col-lg-3 col-sm-12 col-md-6 my-3')
        allCategory.appendChild(card)
    })

  }



const calculatedTime = (d)=>{

  d = parseInt(d)
  const hrs = Math.floor(d / 3600);
  const min = Math.floor(d % 3600 / 60);
  const h = hrs > 0 ? hrs + " hrs " : "";
  const m = min > 0 ? min + ' min ago ' : "";
  return h + m; 
 
}

loadAllData()