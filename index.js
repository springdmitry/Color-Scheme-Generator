const colorBtn = document.getElementById('color-btn')
const seedColor = document.getElementById('seed-color')
const selectScheme = document.getElementById('select-scheme')
const colorEl = document.getElementsByClassName('color-el')
let colorsContainer = document.getElementById('colors-container')

colorsContainer.innerHTML = `
    <ul>
        <li> Choose a seed color </li>
        <li> Define mode by which to generate the schema from the seed color </li>
        <li> Click the "Get Color Scheme" button </li>
        <li> You can copy the HEX code by clicking on the desired color </li>
    </ul>`

colorBtn.addEventListener('click', function () {
    colorsContainer.innerHTML = ''
    const hexColor = seedColor.value.replace('#', '')

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${selectScheme.value}&count=6`)
        .then(res => res.json())
        .then(data => {
            data.colors.map(color => {
                colorsContainer.innerHTML += `
                <div class='color-el'>
                    <div class='color' id='${color.hex.value}' style="background-color:${color.hex.value}">
                    </div>
                    <p class='hex-code'>${color.hex.value}</p>
                </div>
                `
            })
        })
})

document.addEventListener('click', function (e) {
    if (e.target.className === "color") {
        navigator.clipboard.writeText(e.target.id)
    }
})

