// Seleciona o botão de converter
const convertButton = document.querySelector(".convert-button");

// Seleciona o select (dropdown) onde escolhe a moeda
const selectCurrency = document.querySelector(".currency-select");

// Função assíncrona porque usamos await (requisição na API)
async function convertValues() {

    // Pega o valor digitado no input
    const inputCurrencyValue = document.querySelector(".input-currency").value;

    // Seleciona onde aparece o valor em REAL
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");

    // Seleciona onde aparece o valor convertido (dólar ou euro)
    const currencyValueConverted = document.querySelector(".currency-value");


    // 🔥 Busca cotação do dólar em tempo real
    const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL"); // Faz requisição
    const data = await response.json(); // Converte resposta para JSON
    const dolarToday = parseFloat(data.USDBRL.bid); // Pega o valor e transforma em número


    // 🔥 Busca cotação do euro em tempo real
    const responseEuro = await fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL"); // Faz requisição
    const dataEuro = await responseEuro.json(); // Converte resposta para JSON
    const euroToday = parseFloat(dataEuro.EURBRL.bid); // Pega o valor e transforma em número


    // Se a moeda selecionada for dólar
    if (selectCurrency.value === "dolar") {

        // Divide o valor digitado pela cotação do dólar
        // E formata como moeda americana
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday);
    }


    // Se a moeda selecionada for euro
    if (selectCurrency.value === "euro") {

        // Divide o valor digitado pela cotação do euro
        // E formata como moeda europeia
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday);
    }


    // Sempre mostra o valor digitado formatado em REAL
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);

}


// Função que troca o nome e imagem da moeda quando muda o select
function changeCurrency() {

    // Seleciona o elemento que mostra o nome da moeda
    const currencyName = document.getElementById("currency-name");

    // Seleciona a imagem da moeda
    const currencyImg = document.querySelector(".currency-image");


    // Se for dólar
    if (selectCurrency.value === "dolar") {
        currencyName.innerHTML = "Dólar americano"; // Muda o nome
        currencyImg.src = "./assets/Dolar.png"; // Muda a imagem
    }

    // Se for euro
    if (selectCurrency.value === "euro") {
        currencyName.innerHTML = "Euro"; // Muda o nome
        currencyImg.src = "./assets/Euro.png"; // Muda a imagem
    }

    // Chama novamente a função de conversão
    // Isso faz atualizar o valor automaticamente ao trocar a moeda
    convertValues();
}


// Evento que detecta quando o usuário troca a moeda no select
selectCurrency.addEventListener("change", changeCurrency);

// Evento que detecta clique no botão de converter
convertButton.addEventListener("click", convertValues);