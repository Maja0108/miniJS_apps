temp = document.querySelector('#fname').value

//onsole.log(temp)

checked = document.querySelector('input[name="tempType"]:checked')
console.log(checked.value)

function convert() {
    result = document.querySelector('.message strong')

    if (checked.value == 'F') {
        let convTemp = temp * 1.8 + 32
        //console.log('hello')


        //onsole.log(result)

        result.innerHTML = `${convTemp.toFixed(2)} &deg;C`
    } else {
        let convTemp = ((temp - 32) / 1.8)
        result.innerHTML = `${convTemp.toFixed(2)} F`
    }
}