const grid = document.getElementById('sortable-grid');

if(grid) {
    grid.addEventListener('dragstart', e => e.target.classList.add('dragging'));
    grid.addEventListener('dragend', e => {
        e.target.classList.remove('dragging');
        const order = [...grid.querySelectorAll('.card')].map(c => c.dataset.id);
        console.log("Nouvel ordre :", order);
    });

    grid.addEventListener('dragover', e => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        const afterElement = [...grid.querySelectorAll('.card:not(.dragging)')].find(child => {
            const box = child.getBoundingClientRect();
            return e.clientY < box.top + box.height / 2;
        });
        if (!afterElement) grid.appendChild(dragging);
        else grid.insertBefore(dragging, afterElement);
    });
}