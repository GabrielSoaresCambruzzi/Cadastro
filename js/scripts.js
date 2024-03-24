class Validator {
    constructor(){
        this.validations =[
            'data-required',
            'data-min-length', 
            'data-email-validate',
            'data-only-letters',
            'data-max-length',
            'data-password-validate',
            'data-equal',
        ]
    }
    //iniciar a validação de todos os campos
    validate(form){

        // resgata todas as validacoes
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        // transforma um HTMLCollection -> array
        let inputsArray = [...inputs]

        //loop nos inputs e validacao mediante ao que for encontrado
        inputsArray.forEach(function(input) {

            //Loop em todas as validacoes existentes
            for(let i = 0; this.validations.length > i; i++) {
                //verifica se a validacao atual existe no input
                if(input.getAttribute(this.validations[i]) != null){

                    //limpando a string para virar um metodo/nome de um metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o metodo
                    this[method](input, value);

                }
            }


        }, this)

    }

    //verifica se o input tem um numero minimo de caracteres
    minlength(input, minValue){
        
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres` ;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se um input passou do limite de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos ${maxValue} caracteres` ;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    //valida emails
    emailvalidate(input){

        //email@email.com
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão usuario@email.com`

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    //valida se o campo tem apenas letras
    onlyletters(input){
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita numero nem caracteres especiais`

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se dois campos sao iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        
        let errorMessage = `Este campo precisa estar igual ao ${inputName}`

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage)
        }
    }

    //valida campo de senha
    passwordvalidate(input){

        //explodir string em um array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++;
            }else if(!isNaN(parseInt(charArr[i]))) {
             numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0){
            let errorMessage = `A senha precisa de um caractere maiúsculo e de um numero`

            this.printMessage(input, errorMessage)
        }

    }

    //metodo para imprimir mensagens de erro na tela
    printMessage(input, msg){

        //verifica a quantidade de erro
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null){

            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;
            
            template.classList.remove('template');
    
            inputParent.appendChild(template);
        }
    }

    //verifica se o input é requerido
    required(input){
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Este campo é obrigatorio`;

            this.printMessage(input, errorMessage);
        }
    }

    //limpa as validacoes da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove())
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener('click', function(e){

    e.preventDefault();

validator.validate(form);

})