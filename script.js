
//  Dados (com preços 
const horariosDisponiveis = [
  "Seg 09:00", "Seg 14:00", "Ter 10:00", "Qua 13:00", "Qui 15:00", "Sex 11:00"
];

const profissionais = [
  { nome: 'João Ferraz', area: 'Cabeleireiro', descricao: 'Especialista em cortes e tratamentos capilares masculinos e femininos. Experiência em técnicas de coloração.', foto: 'imagens/avatar1.jpg', preco: 250 },
  { nome: 'Davidson Marçal', area: 'Barbeiro', descricao: 'Profissional especializado em barbas e cortes masculinos. Trabalha com acabamento detalhado e estilo personalizado.', foto: 'imagens/avatar14.jpg', preco: 60 },
  { nome: 'Ana Gomes', area: 'Design de Sobrancelha', descricao: 'Designer certificada em sobrancelhas e henna, focada em realçar o seu olhar.', foto: 'imagens/avatar4.jpg', preco: 45 },
  { nome: 'Gisele Rodrigues', area: 'Maquiadora', descricao: 'Formada em maquiagem profissional, atua com makes sociais e artísticas. Paixão por realçar a beleza natural.', foto: 'imagens/avatar10.png', preco: 160 },
  { nome: 'Bruna Magalhaes', area: 'Nail Design', descricao: 'Profissional criativa especializada em alongamentos e nail arts detalhadas. Experiência com técnicas em gel e fibra.', foto: 'imagens/avatar8.jpg', preco: 145 },
  { nome: 'Miguel Angelo', area: 'Cabeleireiro', descricao: 'Especialista em cortes clássicos e modernos. Experiência com coloração e tratamento de cabelos danificados.', foto: 'imagens/avatar11.jpg', preco: 120 },
  { nome: 'Gustavo Tuzani', area: 'Barbeiro', descricao: 'Barbeiro com atenção aos detalhes, especialista em fades, desenhos e cuidados com a barba.', foto: 'imagens/avatar2.jpg', preco: 75 },
  { nome: 'Agatha Moreira', area: 'Design de Sobrancelha', descricao: 'Profissional cuidadosa e detalhista, especialista em micropigmentação.', foto: 'imagens/avatar9.jpg', preco: 300 },
  { nome: 'Edson Fernandes', area: 'Cabeleireiro', descricao: 'Especialista em cabelos cacheados e crespos, dominando técnicas de corte, hidratação e finalização que valorizam a textura natural dos fios.', foto: 'imagens/avatar13.jpg', preco: 180 },
  { nome: 'Izabella Moraes', area: 'Manicure', descricao: 'Especialista em manicure tradicional, realizando cutilagem, lixamento e esmaltação com capricho.', foto: 'imagens/avatar7.jpg', preco: 55 },
  { nome: 'Daiane Santos', area: 'Maquiadora', descricao: 'Maquiadora experiente com foco em makes sociais e de eventos. Busca sempre valorizar o estilo pessoal de cada cliente.', foto: 'imagens/avatar6.jpg', preco: 220 },
  { nome: 'Mônica Melo', area: 'Nail Design', descricao: 'Nail designer especialista em técnicas de alongamento e nail art delicada. Experiência com atendimento personalizado.', foto: 'imagens/avatar15.jpg', preco: 160 }
];

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

    //  botões de horários com seleção única
    horariosDisponiveis.forEach(h => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = h;
      b.className = 'horario';
      b.addEventListener('click', () => {
        document.querySelectorAll('.horario').forEach(x => x.classList.remove('selecionado'));
        b.classList.add('selecionado');
        horarioSelecionado = { profissional: p.nome, horario: h };
      });
      horariosDiv.appendChild(b);
    });

    listaProfissionais.appendChild(card);
  });
}

// Inicio lista 
mostrarProfissionais();

//  Filtros 
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

//  Campo Pesquisa 
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


//  Botão Agendar 
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
