export function onClickAddLogic() {//Quitar de select de dietas disponibles y pasarlo a lista de dietas elegidas
    let selDieta = document.getElementById("dietasAll")
    let itemSel = document.getElementById("dietasAll").selectedIndex
    let valueItem = selDieta[itemSel]
    let arrayDietsList = []
    selDieta.removeChild(selDieta[itemSel])
    let selDietaAdd = document.getElementById("diets")
    selDietaAdd.appendChild(valueItem)
    for (let index = 0; selDietaAdd.options[index]; index++)
        arrayDietsList.push(selDietaAdd.options[index].value)
    return arrayDietsList
}

export function onClickQuitLogic() {//Quitar de select de dietas elegidas y pasarlo a lista de dietas disponibles
    let selDieta = document.getElementById("diets")
    let itemSel = document.getElementById("diets").selectedIndex
    let valueItem = selDieta[itemSel]
    let arrayDietsList = []
    selDieta.removeChild(selDieta[itemSel])
    let selDietaAdd = document.getElementById("dietasAll")
    selDietaAdd.appendChild(valueItem)
    for (let index = 0; selDieta.options[index]; index++)
        arrayDietsList.push(selDieta.options[index].value)
    return arrayDietsList
}

export function cleanData(diets) {
    let dietasSel = document.getElementById("diets")
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
    diets?.map((element, i) => {// carga nuevamente dietas
        option = document.createElement('option')
        option.value = element.name
        option.text = element.name
        option.key = element.id
        dietasAll.appendChild(option)
        return option
    })
}

export function validationsForm(form) {
    let errorsValidation = {}
    let regxTitle = /^[a-zñA-ZÁÉÍÓÚáéíóúñÑ ]+(\s*[a-zñA-ZÁÉÍÓÚáéíóúñÑ ]*)*[a-zñA-ZÁÉÍÓÚáéíóúñÑ ]+$/
    let regxNumber = /^[1-9]?[0-9]{1}$|^100$/
    let evaluation = ""
    if (!form.title.trim())
        errorsValidation.title = `Titulo no puede ser vacio`
    else {
        evaluation = regxTitle.test(form.title)
        if (!evaluation)
            errorsValidation.title = `Titulo solo acepta letras y espacios`
    }
    if (!form.summary.trim())
        errorsValidation.summary = `Descripcion no puede ser vacio`
    if (!form.healtScore.trim())
        errorsValidation.healtScore = `Nivel Saludable no puede ser vacio`
    else {
        evaluation = regxNumber.test(form.healtScore)
        if (!evaluation)
            errorsValidation.healtScore = `Nivel Saludable solo acepta numeros del 1 al 100`
    }
    let dietsList = document.getElementById("diets")
    if (!dietsList.options.length)
        errorsValidation.diets = `Agregar al menos una dieta`

    return errorsValidation
}
