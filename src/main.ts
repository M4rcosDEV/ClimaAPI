const apiKey = "8b6003dd24c82aa7ae4ab8380b58d692";

const ventos = document.getElementById("ventos") as HTMLImageElement;
const umidadeIcon = document.getElementById("umidadeIcon") as HTMLImageElement;
const descricaoClima = document.getElementById("descricao") as HTMLSpanElement;
const velocidadeVento = document.getElementById("velocidade-vento") as HTMLSpanElement;
const local = document.getElementById("local") as HTMLSpanElement;
const temperatura = document.getElementById("temperatura") as HTMLSpanElement;
const humidade = document.getElementById("humidade") as HTMLSpanElement;
const botaoConsultar = document.getElementById("consultar-clima") as HTMLButtonElement;
const loading = document.getElementById("loading") as HTMLImageElement;

// consumindo a API
const obterDadosClima = async (city: string) => {


  if(city == null && city == undefined && city == ''){
    console.error("Campo vazio");
    alert('Campo vazio')
    return null;
  }

  try { 
    //Usei somente para fins esteticos
    if (loading) {
      loading.style.display = "block";
    }

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);

    // Verifica se a resposta foi bem-sucedida
    if (!res.ok) {
      throw new Error(`Erro: ${res.statusText}`);
    }
    
    const data = await res.json();

    // Verifica se o retorno da API contém a propriedade "weather"
    if (!data.weather) {
      throw new Error("Dados climáticos não disponíveis");
    }

    return data;
  } catch (error) {
    alert('Não foi possivel obter dados dessa cidade')
    return null; 

  } finally {
    // Oculta o elemento de loading
    if (loading) {
      loading.style.display = "none";
    }
  }
};

//Funcao para fazer a coleta somente dos dados que estou usando no projeto
const exibirDadosClima = async (city: string) => {
  const data = await obterDadosClima(city);

  local.innerHTML = data.name
  temperatura.innerHTML = `${data.main.temp}°`
  humidade.innerHTML = `${data.main.humidity}%`
  
  descricaoClima.innerHTML = data.weather[0].description;

  const velocidadeKmH = (data.wind.speed * 3.6).toFixed(2);

  velocidadeVento.innerHTML = `${velocidadeKmH} km/h`;

  ventos.style.display = 'inline'
  umidadeIcon.style.display = 'inline'
  
};

//Ao clicar no botão vai disparar a função exibirDadosClima
botaoConsultar.addEventListener("click", () => {
  const city = (document.getElementById("cidade") as HTMLInputElement).value;
  
  exibirDadosClima(city);
});

