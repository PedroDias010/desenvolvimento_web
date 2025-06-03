function InverterNumero() {
    let entrada = document.getElementById('entrada').value;

    let numero = parseInt(entrada);
    
    if (!isNaN(numero) && Number.isInteger(numero)) {
        let numeroInvertido = String(numero).split('').reverse().join('');
        let ehPalindromo = String(numero) === numeroInvertido;
        document.getElementById('resultado').textContent = 
            `O número ${numero} ${ehPalindromo ? 'É' : 'Não é'} um palíndromo`;
    } else {
        document.getElementById('resultado').textContent = "Insira um número inteiro válido.";
    }
}