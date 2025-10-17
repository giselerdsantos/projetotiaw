// ========= Dados (mantém os seus) =========
const horariosDisponiveis = [
  "Seg 09:00", "Seg 14:00", "Ter 10:00", "Qua 13:00", "Qui 15:00"
];

const profissionais = [
  { nome: 'João Ferraz', area: 'Cabeleireiro', descricao: 'Especialista em cortes e tratamentos capilares masculinos e femininos. Experiência em técnicas de coloração.', foto: 'imagens/avatar1.jpg' },
  { nome: 'Davidson Marçal', area: 'Barbeiro', descricao: 'Profissional especializado em barbas e cortes masculinos. Trabalha com acabamento detalhado e estilo personalizado.', foto: 'imagens/avatar14.jpg' },
  { nome: 'Ana Gomes', area: 'Design de Sobrancelha', descricao: 'Designer certificada em sobrancelhas e henna, focada em realçar o seu olhar.', foto: 'imagens/avatar4.jpg' },
  { nome: 'Gisele Rodrigues', area: 'Maquiadora', descricao: 'Formada em maquiagem profissional, atua com makes sociais e artísticas. Paixão por realçar a beleza natural.', foto: 'imagens/avatar10.png' },
  { nome: 'Bruna Magalhaes', area: 'Nail Design', descricao: 'Profissional criativa especializada em alongamentos e nail arts detalhadas. Experiência com técnicas em gel e fibra.', foto: 'imagens/avatar8.jpg' },
  { nome: 'Miguel Angelo', area: 'Cabeleireiro', descricao: 'Especialista em cortes clássicos e modernos. Experiência com coloração e tratamento de cabelos danificados.', foto: 'imagens/avatar11.jpg' },
  { nome: 'Gustavo Tuzani', area: 'Barbeiro', descricao: 'Barbeiro com atenção aos detalhes, especialista em fades, desenhos e cuidados com a barba.', foto: 'imagens/avatar2.jpg' },
  { nome: 'Agatha Moreira', area: 'Design de Sobrancelha', descricao: 'Profissional cuidadosa e detalhista, especialista em micropigmentação.', foto: 'imagens/avatar9.jpg' },
  { nome: 'Edson Fernandes', area: 'Cabeleireiro', descricao: 'Especialista em cabelos cacheados e crespos, dominando técnicas de corte, hidratação e finalização que valorizam a textura natural dos fios.', foto: 'imagens/avatar13.jpg' },
  { nome: 'Izabella Moraes', area: 'Manicure', descricao: 'Especialista em manicure tradicional, realizando cutilagem, lixamento e esmaltação com capricho.', foto: 'imagens/avatar7.jpg' },
  { nome: 'Daiane Santos', area: 'Maquiadora', descricao: 'Maquiadora experiente com foco em makes sociais e de eventos. Busca sempre valorizar o estilo pessoal de cada cliente.', foto: 'imagens/avatar6.jpg' },
  { nome: 'Mônica Melo', area: 'Nail Design', descricao: 'Nail designer especialista em técnicas de alongamento e nail art delicada. Experiência com atendimento personalizado.', foto: 'imagens/avatar15.jpg' }
];

// ========= Elementos (com checagens) =========
const listaProfissionais = document.getElementById('lista-profissionais');
const btnAgendar = document.getElementById('btn-agendar');
const listaServicos = document.getElementById('lista-servicos'); // pode ser null
const btnPesquisar = document.getElementById('btn-pesquisar');
const campoPesquisa = document.getElementById('campo-pesquisa');
const filtroArea = document.getElementById('filtro-area');
const btnMenu = document.getElementById('btn-menu');
const menuServicos = document.querySelector('.menu-servicos');
const mainContainer = document.querySelector('main');

let horarioSelecionado = null;

// ========= Função principal: renderizar cards =========
function mostrarProfissionais(filtro = '') {
  if (!listaProfissionais) return;
  listaProfissionais.innerHTML = '';

  const termo = (filtro || '').toString().toLowerCase().trim();

  // Se filtro vazio -> todos
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
      <div class="horarios-card"></div>
    `;

    const horariosDiv = card.querySelector('.horarios-card');

    // cria botões de horários e mantém comportamento de seleção única
    horariosDisponiveis.forEach(h => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = h;
      b.className = 'horario';
      b.addEventListener('click', () => {
        // remove seleção de todos os botões
        document.querySelectorAll('.horario').forEach(x => x.classList.remove('selecionado'));
        b.classList.add('selecionado');
        horarioSelecionado = { profissional: p.nome, horario: h };
      });
      horariosDiv.appendChild(b);
    });

    listaProfissionais.appendChild(card);
  });
}

// ========= Inicializa lista =========
mostrarProfissionais();

// ========= Filtro pelo menu lateral (se existir) =========
if (listaServicos) {
  listaServicos.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'LI') {
      const servico = e.target.textContent || '';
      // atualiza select (se existir) pra sincronizar UI
      if (filtroArea) filtroArea.value = servico;
      mostrarProfissionais(servico);
    }
  });
}

// ========= Filtro por select dentro do conteúdo (se existir) =========
if (filtroArea) {
  filtroArea.addEventListener('change', () => {
    const valor = filtroArea.value || '';
    mostrarProfissionais(valor);
  });
}

// ========= Pesquisa por botão e Enter (se existirem) =========
if (btnPesquisar && campoPesquisa) {
  btnPesquisar.addEventListener('click', () => {
    const termo = (campoPesquisa.value || '').toLowerCase().trim();
    mostrarProfissionais(termo);
    // limpa seleção do filtro (opcional)
    if (filtroArea) filtroArea.value = '';
  });

  campoPesquisa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const termo = (campoPesquisa.value || '').toLowerCase().trim();
      mostrarProfissionais(termo);
      if (filtroArea) filtroArea.value = '';
    }
  });
}

// ========= Botão Agendar (se existir) =========
if (btnAgendar) {
  btnAgendar.addEventListener('click', () => {
    if (!horarioSelecionado) {
      alert('Selecione um horário antes de agendar.');
      return;
    }
    alert(`Agendamento confirmado: ${horarioSelecionado.horario} com ${horarioSelecionado.profissional}`);
    // aqui você pode redirecionar ou abrir modal
  });
}

// ========= Menu sanduíche (se existir) =========
if (btnMenu && menuServicos && mainContainer) {
  btnMenu.addEventListener('click', () => {
    menuServicos.classList.toggle('fechado');
    mainContainer.classList.toggle('menu-fechado');
  });
}
