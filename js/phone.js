const LoadPhone = async (searchItems = '13',isShowAll) =>{
   const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchItems}`);
   const data = await res.json();
   const phones = data.data;
   displayShowData(phones,isShowAll)
}
const displayShowData = (phones,isShowAll) =>{
    //console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    const ShowAllItems = document.getElementById('showbtn');
    if(phones.length > 9 && !isShowAll){
        ShowAllItems.classList.remove('hidden')
    }else{
        ShowAllItems.classList.add('hidden')
    }
    // phone items 9 to show button and hide it
    if(!isShowAll){
        phones = phones.slice(0,9)
    }

    phones.forEach(phone => {
        //console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = 'card bg-base-100 shadow-xl'
        phoneDiv.innerHTML = `
        
        <figure class="px-10 pt-10">
            <img src="${phone.image}" class="" />
        </figure>
        <div class="card-body items-center text-center space-y-4">
            <h2 class="card-title">${phone.brand}</h2>
            <p class="text-xl font-semibold">${phone.phone_name}</p>
            <div class="card-actions">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-secondary">Show More</button>
            </div>
        </div>
        
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    // hide loading
    toggleLoadingSpiner(false)
}

// show items details
const showDetails = async(id) => {
    console.log('hello',id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    showDetailsDisplay(phone)
}
const showDetailsDisplay = (phones) =>{
    console.log(phones)
    // const phoneName = document.getElementById('show-details-phone-name');
    // phoneName.innerText = phones.name;
    const showDetailsConainer = document.getElementById('show-details-container');
    showDetailsConainer.innerHTML = `
    <figure class="px-10 pt-10">
              <img src="${phones.image}" class="rounded-xl" />
            </figure>
            <div class="card-body text-start">
              <h2 class="card-title text-3xl font-extrabold text-pink-600">${phones.name}</h2>
              <p class="font-semibold">Display Size: ${phones?.mainFeatures?.displaySize}</p>
              <p class="font-semibold">Memory: ${phones?.mainFeatures.memory}</p>
              <p class="font-semibold">Bluetooth: ${phones?.others?.Bluetooth
              }</p>
              <p class="font-semibold">GPS: ${phones?.others?.GPS
              }</p>
              <p class="font-semibold">USB: ${phones?.others?.USB
              }</p>
              <p class="font-semibold">WLAN: ${phones?.others?.WLAN
              }</p>
              <p class="text-xl font-bold text-pink-500">You are hppey customer😊!!!</p>
            </div>
    `
    show_details_modal.showModal()
}


const SearchPhone = (isShowAll)=>{
    toggleLoadingSpiner(true) // spiner loading ta ekkhane search er first a call kore dite hobe
    const searchInputFeild = document.getElementById('search-input');
    const searchInput = searchInputFeild.value;
    LoadPhone(searchInput,isShowAll)
}
const toggleLoadingSpiner =(isLoading)=>{
    const loadingSpiner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpiner.classList.remove('hidden')
    }else{
        loadingSpiner.classList.add('hidden')
    }
}
const showAll = ()=>{
    SearchPhone(true)
}
LoadPhone()