
let eventos = []; 


async function events() {
    try {
        const response = await fetch('eventos.json');
        eventos = await response.json(); 
        
     
        const cards = document.getElementById("cards");
        const cardModelo = document.querySelector('.card');
        cardModelo.style.display = 'none'; 
        
        function displayEvents(events) {
            cards.innerHTML = ''; 
            if (events.length === 0) {
                cards.innerHTML = '<p>Nenhum evento encontrado para a data selecionada.</p>';
            } else {
                events.forEach(evento => {
                    const card = cardModelo.cloneNode(true);
                    card.querySelector('.card_titulo').textContent = evento.nome;
                    card.querySelector('.data_hora').textContent = `Data: ${evento.data} - Horário: ${evento.horario}`;
                    card.querySelector('.local').textContent = `Local: ${evento.local}`;
                    card.querySelector('.descricao').textContent = `Descrição: ${evento.descricao}`;
                    card.querySelector('.valor').textContent = `Valor: R$ ${evento.valor.toFixed(2)}`;
                    cards.appendChild(card);
                    card.style.display = 'block'; 
                });
            }
        }

      
        function populateDateSelector() {
            const uniqueDates = [...new Set(eventos.map(evento => evento.data))];
            const dateSelector = document.getElementById('dateSelector');
            dateSelector.innerHTML = ''; 
        
            uniqueDates.forEach(date => {
                const button = document.createElement('button');
                
                button.textContent = date;
                button.setAttribute('data-date', date);
                button.classList.add('btn', 'btn-secondary'); // Adicionando as mesmas classes aos botões de data
                button.addEventListener('click', function () {
                    filterEventsByDate(date);
                });
                dateSelector.appendChild(button);
            });
            
            const allEventsBtn = document.getElementById('allEvents');
            allEventsBtn.classList.add('btn', 'btn-secondary'); // Garantir que o botão "Ver todos os eventos" tenha o mesmo estilo
            allEventsBtn.addEventListener('click', function () {
                displayEvents(eventos); 
            });
        }
        
   
        function filterEventsByDate(selectedDate) {
            const filteredEvents = eventos.filter(event => event.data === selectedDate);
            displayEvents(filteredEvents);
        }


        document.getElementById('dateSelector').addEventListener('change', function () {
            const selectedDate = this.value;
            if (selectedDate) {
                filterEventsByDate(selectedDate);
            } else {
                displayEvents(eventos);
            }
        });

        populateDateSelector();
        displayEvents(eventos);

    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
}


events();
