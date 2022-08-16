export function onClickAddLogic() {//Quitar de select de dietas disponibles y pasarlo a lista de dietas elegidas
    let selDieta = document.getElementById("dietasAll")
    let itemSel = document.getElementById("dietasAll").selectedIndex
    let valueItem = selDieta[itemSel]
    let arrayDietsList = []
    selDieta.removeChild(selDieta[itemSel])
    let selDietaAdd = document.getElementById("dietasSel")
    selDietaAdd.appendChild(valueItem)
    for (let index = 0; selDietaAdd.options[index]; index++)
        arrayDietsList.push(selDietaAdd.options[index].value)
    return arrayDietsList
}

export function onClickQuitLogic() {//Quitar de select de dietas elegidas y pasarlo a lista de dietas disponibles
    let selDieta = document.getElementById("dietasSel")
    let itemSel = document.getElementById("dietasSel").selectedIndex
    let valueItem = selDieta[itemSel]
    let arrayDietsList = []
    selDieta.removeChild(selDieta[itemSel])
    let selDietaAdd = document.getElementById("dietasAll")
    selDietaAdd.appendChild(valueItem)
    for (let index = 0; selDieta.options[index]; index++)
        arrayDietsList.push(selDieta.options[index].value)
}

export function cleanData(diets) {
    let dietasSel = document.getElementById("dietasSel")
    let dietasAll = document.getElementById("dietasAll")
    let steps = document.getElementById("steps")
    document.getElementById("formCreate").reset() //blanquea campos
    while (dietasSel.options[0])// blanquea combo seleccionadas
        dietasSel.removeChild(dietasSel[0])
    while (dietasAll.options[0])// blanquea combo de dietas
        dietasAll.removeChild(dietasAll[0])
    while (steps.options[0])// blanquea combo de pasos
        steps.removeChild(steps[0])// 
    let option = ""
    diets.map((element, i) => {// carga nuevamente dietas
        option = document.createElement('option')
        option.value = element.name
        option.text = element.name
        option.key = element.id
        dietasAll.appendChild(option)
        return option
    })

}
