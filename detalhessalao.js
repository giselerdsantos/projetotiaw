//  Dados puxados do JSON
// Variáveis globais
let profissionais = [];
let horariosDisponiveis = [];

// Carregar tudo do JSON de uma vez
fetch('detalhessalao.json')
  .then(response => {
    if (!response.ok) throw new Error('Erro ao carregar o JSON');
    return response.json();
  })
  .then(dados => {
    // Salão
    const salao = dados.salao;
    document.getElementById('nome-salao').textContent = salao.nome;
    document.getElementById('descricao-salao').textContent = salao.descricao;
    document.getElementById('endereco-salao').innerHTML = `<strong>Endereço:</strong> ${salao.endereco}`;
    document.getElementById('telefone-salao').innerHTML = `<strong>Contato:</strong> ${salao.telefone}`;
    document.getElementById('horario-salao').innerHTML = `<strong>Horário de Funcionamento:</strong> ${salao.horarioFuncionamento}`;

    const banner = document.getElementById('banner-salao');
    if (banner) banner.src = salao.banner;

    // Redes sociais
    const redes = dados.redesSociais;
    if (redes) {
      document.getElementById('instagram-salao').textContent = redes.instagram;
      document.getElementById('facebook-salao').textContent = redes.facebook;
      document.getElementById('whatsapp-salao').textContent = redes.whatsapp;
    }

    // Profissionais e horários
    profissionais = dados.profissionais;
    horariosDisponiveis = dados.horariosDisponiveis;
    mostrarProfissionais();

    // Localização (puxando do JSON)
    const mapaContainer = document.querySelector('.mapa-container iframe');
    if (mapaContainer && salao.localizacao) {
      const loc = salao.localizacao;
      const enderecoCompleto = encodeURIComponent(
        `${loc.rua}, ${loc.bairro}, ${loc.cidade} - ${loc.estado}, ${loc.cep}`
      );
      mapaContainer.src = `https://www.google.com/maps?q=${enderecoCompleto}&hl=pt-BR&z=15&output=embed`;
    }

  })
  .catch(erro => console.error('Erro ao carregar dados do salão:', erro));

// Elementos 
const listaProfissionais = document.getElementById('lista-profissionais');
const btnAgendar = document.getElementById('btn-agendar');
const listaServicos = document.getElementById('lista-servicos');
const btnPesquisar = document.getElementById('btn-pesquisar');
const campoPesquisa = document.getElementById('campo-pesquisa');
const filtroArea = document.getElementById('filtro-area');
const btnMenu = document.getElementById('btn-menu');
const menuServicos = document.querySelector('.menu-servicos');
const mainContainer = document.querySelector('main');

let horarioSelecionado = null;

function mostrarProfissionais(filtro = '') {
  if (!listaProfissionais) return;
  listaProfissionais.innerHTML = '';

  const termo = (filtro || '').toString().toLowerCase().trim();

  const filtrados = termo === ''
    ? profissionais
    : profissionais.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.area.toLowerCase().includes(termo)
      );

  if (filtrados.length === 0) {
    listaProfissionais.innerHTML = '<p style="color:#fff;">Nenhum profissional encontrado.</p>';
    return;
  }

  filtrados.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('card-profissional');

    card.innerHTML = `
      <img src="${p.foto}" alt="Foto de ${p.nome}" class="foto-profissional">
      <h3>${p.nome}</h3>
      <p><strong>${p.area}</strong></p>
      <p>${p.descricao}</p>
      <p class="preco">
      A partir:<br>
      <strong>R$ ${p.preco},00</strong>
      </p>
      <div class="horarios-card"></div>
    `;

    const horariosDiv = card.querySelector('.horarios-card');

    // Botões de horários com possibilidade de desmarcar
    horariosDisponiveis.forEach(h => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = h;
      b.className = 'horario';

      b.addEventListener('click', () => {
        const estaSelecionado = b.classList.contains('selecionado');

        // Remove seleção de todos os horários
        document.querySelectorAll('.horario').forEach(x => x.classList.remove('selecionado'));

        if (!estaSelecionado) {
          // Seleciona o botão clicado
          b.classList.add('selecionado');
          horarioSelecionado = { profissional: p.nome, horario: h };
        } else {
          // Desmarca tudo se já estava selecionado
          horarioSelecionado = null;
        }
      });

      horariosDiv.appendChild(b);
    });

    listaProfissionais.appendChild(card);
  });
}

// Inicio lista 
mostrarProfissionais();

// Filtros 
if (listaServicos) {
  listaServicos.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'LI') {
      const servico = e.target.textContent || '';
      if (filtroArea) filtroArea.value = servico;
      mostrarProfissionais(servico);
    }
  });
}

if (filtroArea) {
  filtroArea.addEventListener('change', () => {
    const valor = filtroArea.value || '';
    mostrarProfissionais(valor);
  });
}

// Campo Pesquisa 
const campoPesquisaEl = document.querySelector('.pesquisa input');

if (campoPesquisaEl) {
  campoPesquisaEl.addEventListener('input', () => {
    const termo = campoPesquisaEl.value.toLowerCase().trim();
    mostrarProfissionais(termo);
    if (filtroArea) filtroArea.value = '';
  });

  campoPesquisaEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const termo = campoPesquisaEl.value.toLowerCase().trim();
      mostrarProfissionais(termo);
      if (filtroArea) filtroArea.value = '';
    }
  });
}

// Botão Agendar 
if (btnAgendar) {
  btnAgendar.addEventListener('click', () => {
    if (!horarioSelecionado) {
      alert('Selecione um horário antes de agendar.');
      return;
    }
    alert(`Agendamento confirmado: ${horarioSelecionado.horario} com ${horarioSelecionado.profissional}`);
  });
}

// Menu sanduíche 
if (btnMenu && menuServicos && mainContainer) {
  btnMenu.addEventListener('click', () => {
    menuServicos.classList.toggle('fechado');
    mainContainer.classList.toggle('menu-fechado');
  });
}
