const input = document.getElementById('city-input');
const button = document.getElementById('search-btn');

const time = document.getElementById('time')
const locate = document.getElementById('loc')
const date = document.getElementById('date')

async function gettime(city) {
    try{
        const timeVar = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=6e6e8818d3c2461091bba0cbaf0c2123&location=${city}`)
        return await timeVar.json()
    }catch (error){
        console.log(error)
    }
    
}

button.addEventListener('click' ,async () => {
    const value = input.value
    if(value !== ''){
        const result = await gettime(value)
        // console.log(result)

        let crntTime = ` ${result.datetime}`
        let crnt12 = crntTime.slice(11,14)
        let crntMins = crntTime.slice(15,17)
        let crntDate = crntTime.slice(0,11)
        console.log(result.timezone_location)
        console.log(result)

        if( crnt12 > 12){
            let dofromat12 = (crnt12 - 12 ) 
            time.innerHTML= `${dofromat12} :${crntMins} PM`
            date.innerHTML= `${crntDate}`
        }
        else{
            time.innerHTML= `${crnt12}:${crntMins} AM`
            date.innerHTML= `${crntDate}`
        }

        locate.innerHTML = ` ${result.requested_location} <br/> ${result.timezone_name}` 

    }else{
        alert('Please Enter A Country Name!')
    }
})

