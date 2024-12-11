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

                    // Adicionando o ID do evento ao card
                    card.setAttribute('data-id', evento.id);

                    // Adicionando evento de clique para redirecionar
                    card.addEventListener('click', function () {
                        const eventId = this.getAttribute('data-id');
                        window.location.href = `events.html?id=${eventId}`;
                    });

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
                button.classList.add('btn', 'btn-secondary');
                button.addEventListener('click', function () {
                    filterEventsByDate(date);
                });
                dateSelector.appendChild(button);
            });

            const allEventsBtn = document.getElementById('allEvents');
            allEventsBtn.classList.add('btn', 'btn-secondary');
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
