"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "8b6003dd24c82aa7ae4ab8380b58d692";
const ventos = document.getElementById("ventos");
const umidadeIcon = document.getElementById("umidadeIcon");
const descricaoClima = document.getElementById("descricao");
const velocidadeVento = document.getElementById("velocidade-vento");
const local = document.getElementById("local");
const temperatura = document.getElementById("temperatura");
const humidade = document.getElementById("humidade");
const botaoConsultar = document.getElementById("consultar-clima");
const loading = document.getElementById("loading");
// consumindo a API
const obterDadosClima = (city) => __awaiter(void 0, void 0, void 0, function* () {
    if (city == null && city == undefined && city == '') {
        console.error("Campo vazio");
        alert('Campo vazio');
        return null;
    }
    try {
        //Usei somente para fins esteticos
        if (loading) {
            loading.style.display = "block";
        }
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
        const res = yield fetch(apiWeatherURL);
        // Verifica se a resposta foi bem-sucedida
        if (!res.ok) {
            throw new Error(`Erro: ${res.statusText}`);
        }
        const data = yield res.json();
        // Verifica se o retorno da API contém a propriedade "weather"
        if (!data.weather) {
            throw new Error("Dados climáticos não disponíveis");
        }
        return data;
    }
    catch (error) {
        alert('Não foi possivel obter dados dessa cidade');
        return null;
    }
    finally {
        // Oculta o elemento de loading
        if (loading) {
            loading.style.display = "none";
        }
    }
});
//Funcao para fazer a coleta somente dos dados que estou usando no projeto
const exibirDadosClima = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield obterDadosClima(city);
    local.innerHTML = data.name;
    temperatura.innerHTML = `${data.main.temp}°`;
    humidade.innerHTML = `${data.main.humidity}%`;
    descricaoClima.innerHTML = data.weather[0].description;
    const velocidadeKmH = (data.wind.speed * 3.6).toFixed(2);
    velocidadeVento.innerHTML = `${velocidadeKmH} km/h`;
    ventos.style.display = 'inline';
    umidadeIcon.style.display = 'inline';
});
//Ao clicar no botão vai disparar a função exibirDadosClima
botaoConsultar.addEventListener("click", () => {
    const city = document.getElementById("cidade").value;
    exibirDadosClima(city);
});
