const teampane = document.getElementsByClassName('teampane')[0];

if (teampane != null) {
    const container = document.createElement('div');
    container.id = 'tobethebest-teampane';
    
    const title = document.createElement('h2');
    title.innerText = 'ToBeTheBest';

    const button = document.createElement('button');
    button.innerText = 'Create Best Team';
    button.classList.add('button');
    button.classList.add('big');

    container.appendChild(title);
    container.appendChild(button);

    teampane.appendChild(container);
}