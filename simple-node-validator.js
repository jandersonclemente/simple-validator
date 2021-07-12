exports.email = (value = null) => {
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const result = re.test(value) ? value : false 
    return result
}

exports.size = (value = null, min = 1, max = 999) => {
    if(!value) return false
    
    if(typeof value != string){
        return false
    }

    const length = value.length
    if(length < min || length > max){
        return false
    }
    return value 
}

exports.brzip = (value = null) => {
    const re = /^\d{5}-?\d{3}$/
    const result = re.test(value) ? value : false
    return result
}

exports.undot = (value = null) => {
    if(!value) return false

    value = value.replace(/[\s.-]*/igm, '')

    return value
}

exports.cpf = (cpf = null) => {
    
    if (typeof cpf !== "string"){
        return false
    }

    cpf = cpf.replace(/[\s.-]*/igm, '')

    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }

    let sum = 0
    let rest

    for (var i = 1; i <= 9; i++){
        sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
    }

    rest = (sum * 10) % 11

    if ((rest == 10) || (rest == 11)){
        rest = 0
    }

    if (rest != parseInt(cpf.substring(9, 10)) ){
        return false
    }

    sum = 0

    for (var i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
    }

    rest = (sum * 10) % 11
    
    if ((rest == 10) || (rest == 11)){
        rest = 0
    }

    if (rest != parseInt(cpf.substring(10, 11) ) ) {
        return false
    }
    return true
    
}

exports.cnpj = (cnpj = null) => {
    if (typeof cnpj !== "string" || !cnpj){
        return false
    }

    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == ''){ 
        return false
    }
     
    if (cnpj.length != 14){
        return false
    }
 
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999"){

            return false;
    }

    size    = cnpj.length - 2
    numbers = cnpj.substring(0,size)
    digits  = cnpj.substring(size)
    sum     = 0
    pos     = size - 7

    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2){
            pos = 9
      }
    }
    
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    
    if (result != digits.charAt(0)){
        return false
    }
         
    size    = size + 1
    numbers = cnpj.substring(0,size)
    sum     = 0
    pos     = size - 7

    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--
      if (pos < 2){
            pos = 9
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11

    if (result != digits.charAt(1)){
          return false
    }
           
    return true
}

exports.dbDate = (date = null, symbolFrom = '/', symbolTo = '-') => {
    if(!date || typeof date !== 'string'){
        return false
    }

    let dateArray = date.split(symbolFrom)

    const dateArrayLength = dateArray.length
    if(dateArrayLength != 3){
        return false
    }

    let dbDate    = `${dateArray[2]}${symbolTo}${dateArray[1]}${symbolTo}${dateArray[0]}`

    return dbDate
}

exports.uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

exports.dbDateNow = () => {
    const baseDate = new Date();
    const month    = baseDate.getMonth() + 1 < 10 ? '0' + (baseDate.getMonth() + 1) : baseDate.getMonth() + 1 
    const date  = `${baseDate.getFullYear()}-${month}-${baseDate.getDate()}T${baseDate.getHours()}:${baseDate.getMinutes()}:00`

    return date
}