const section = document.querySelector('section');
const button = document.querySelector('button');

const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => createNoteElement(note));
};
const saveNotes = () => {
    const notes = Array.from(section.children).map(div => div.textContent.trim());
    localStorage.setItem('notes', JSON.stringify(notes));
};
const createNoteElement = (content = '') => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = 'delete.png';
    div.setAttribute('contenteditable', 'true');
    div.textContent = content;
    div.append(img);
    section.append(div);

    img.addEventListener('click', () => {
        div.remove();
        saveNotes();
    });

    div.addEventListener('input', saveNotes);
};

button.addEventListener('click', () => {
    createNoteElement();
    saveNotes();
});

loadNotes();
