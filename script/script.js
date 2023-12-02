(function() {

    const firstName = document.querySelector('#first-name')
    const nickName = document.querySelector('#sec-name') 
    const age = document.querySelector('#age')
    const height = document.querySelector('#height')
    const weight = document.querySelector('#weight')
    const gender = document.querySelector('#gender')
    const submit = document.querySelector('#submit')

    function criarPessoa() {
        return {
            nome: firstName.value,
            sobrenome: nickName.value,

            get nomeCompleto() {
                return `${this.nome} ${this.sobrenome}`
            },

            mudaGenero() {
                let genderSelected = gender.options[gender.selectedIndex].value
                return genderSelected === 'mas' ? 'masculino' : 'feminino'
            },

            idade: age.value,
            altura: height.value,
            peso: weight.value,

            get countDays() {
                return ' Aprox ' + this.idade * 365 + ' ' + 'dias'
            },

            countSecs() {
                const secDays = this.idade * 365 * 86400
                return `Aprox ${secDays} segundos`
            },

            checkHeight() {
                if (this.mudaGenero() === 'masculino') {
                    return this.altura >= 1.7 ? ' Dentro da média brasileira' : 'Abaixo da média brasileira'
                } else {
                    return this.altura >= 1.6 ? 'Dentro da média brasileira' : 'Abaixo da média brasileira'
                }
            },

            checkImc() {
                const imc = this.peso / this.altura ** 2
                if(imc < 18.5) {
                    return `${imc.toFixed(2)}, Abaixo do peso`
                } else if (imc > 18.5 && imc <= 25) {
                    return `${imc.toFixed(2)}, Peso Normal`
                } else if(imc.toFixed(2) > 25 && imc < 30) {
                    return `${imc.toFixed(2)}, Sobrepeso`
                } else {
                    return `${imc.toFixed(2)}, Obesidade`
                }                   
            },

            checkBasal() {
                let basal = 0

                if (this.mudaGenero() === 'masculino') {
                    basal = 88.362 + (13.397 * this.peso) + (4.799 * (this.altura * 100)) - (5.677 * this.idade)
                } else {
                    basal = 447.593 + (9.247 * this.peso) + (4.799 * (this.altura * 100)) - (5.677 * this.idade)
                }
                
                return `Você utiliza ${basal.toFixed(0)} kl, para existir`
            },

            checkWater() {
                return 35 * this.peso + ' ' + 'litros'
            },

            checkProtein() {
                return this.peso * 2 + ' ' + 'gramas'
            },

            mostrarInfos() {
                const peopleName = document.querySelector('.name-people')
                const infosReport = []
                    for(let i = 0; i < 7; i++) {
                        infosReport[i] = document.querySelector(`.r${i}`) 
                    }
                    console.log(infosReport)
            
                    peopleName.innerHTML = this.nomeCompleto
                    infosReport[0].innerHTML = `Dias vividos até hoje:${this.countDays}`
                    infosReport[1].innerHTML = `Segundos vividos: ${this.countSecs()}`
                    infosReport[2].innerHTML = `Sua altura em relação a média é ${this.checkHeight()}`
                    infosReport[3].innerHTML = `Seu imc: ${this.checkImc()}`
                    infosReport[4].innerHTML = `Metabolismo Basal: ${this.checkBasal()}`
                    infosReport[5].innerHTML = `Quantidade de água por dia: ${this.checkWater()}`
                    infosReport[6].innerHTML = `Quantidade de proteina diária: ${this.checkProtein()}`
            }
            
    } 
}

function verificarInputs() {
    const infos = document.querySelector('.infos')
    const inputs = infos.querySelectorAll('input')
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert("Por favor, preencha todos os campos antes de gerar o relatório.");
            return false;
        }
    }
    return true;
}


function relatorio() {       
    const infos = document.querySelector('.infos')
    const report = document.querySelector('.report')        

    if (!verificarInputs()) {
        return
    }

    infos.style.display = 'none'
    report.style.display = 'block'
    const people = criarPessoa()
    people.mostrarInfos()
}



    submit.addEventListener('click', function() { 
        relatorio()
    })

})()