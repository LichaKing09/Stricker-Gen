document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // MENÚ LATERAL
    // ========================================

    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');

    if (btn && menu) {

        // Abrir / cerrar menú
        btn.addEventListener('click', () => {

            menu.classList.toggle('open');

            btn.textContent = menu.classList.contains('open')
                ? '×'
                : '☰';

        });


        // Cerrar menú al seleccionar una opción
        menu.querySelectorAll('a').forEach(a => {

            a.addEventListener('click', () => {

                menu.classList.remove('open');
                btn.textContent = '☰';

            });

        });

    }


    // ========================================
    // ANIMACIONES REVEAL
    // ========================================

    const obs = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('visible');

                }

            });

        },
        {
            threshold: 0.1
        }
    );


    // Observar todos los elementos .reveal
    document.querySelectorAll('.reveal').forEach(element => {

        obs.observe(element);

    });


    // ========================================
    // FILTROS Y BUSCADOR
    // ========================================

    document.querySelectorAll('[data-filter-group]').forEach(group => {

        const cards = [
            ...group.querySelectorAll('[data-category]')
        ];

        const buttons = [
            ...group.querySelectorAll('.filter')
        ];

        const input = group.querySelector('.search input');

        let active = 'all';


        // ========================================
        // ACTUALIZAR RESULTADOS
        // ========================================

        function update() {

            const q = (input?.value || '').toLowerCase();

            cards.forEach(card => {

                const categoryMatch =
                    active === 'all' ||
                    card.dataset.category === active;

                const searchMatch =
                    card.textContent
                        .toLowerCase()
                        .includes(q);

                const visible =
                    categoryMatch && searchMatch;

                card.style.display =
                    visible ? '' : 'none';

            });

        }


        // ========================================
        // BOTONES DE FILTRO
        // ========================================

        buttons.forEach(button => {

            button.addEventListener('click', () => {

                // Quitar estado activo
                buttons.forEach(otherButton => {

                    otherButton.classList.remove('active');

                });


                // Activar botón seleccionado
                button.classList.add('active');

                active = button.dataset.filter;

                update();

            });

        });


        // ========================================
        // BUSCADOR
        // ========================================

        input?.addEventListener('input', update);

    });

});