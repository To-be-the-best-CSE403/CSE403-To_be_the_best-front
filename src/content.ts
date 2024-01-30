///<reference types="chrome"/>

fetch(chrome.runtime.getURL('content.html'))
    .then(response => response.text())
    .then(html => {
        // Create a container element
        const container = document.createElement('div');
        container.innerHTML = html.trim();
        container.id = 'tobethebest-root';

        // Append the container element to the body
        document.body.appendChild(container);

        // Add event listeners or any additional logic here
        const toggle = container.querySelector('#tobethebest-toggle');
        if (toggle == null) {
            throw new Error('Could not find #tobethebest-toggle element');
        }
        
        const sidebar = container.querySelector('#tobethebest-sidebar');
        if (sidebar == null) {
            throw new Error('Could not find #tobethebest-sidebar element');
        }

        toggle.addEventListener('mouseover', () => {
            sidebar.classList.add('active');
            toggle.classList.remove('active');
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('active');
            toggle.classList.add('active');
        });

        const websiteButton = container.querySelector('#tobethebest-website-button');
        if (websiteButton == null) {
            throw new Error('Could not find #tobethebest-website-button element');
        }
        websiteButton.addEventListener('click', () => {
            window.open('https://tobethebest.vercel.app/', '_blank');
        });

        const wikiButton = container.querySelector('#tobethebest-wiki-button');
        if (wikiButton == null) {
            throw new Error('Could not find #tobethebest-wiki-button element');
        }
        wikiButton.addEventListener('click', () => {
            window.open('https://tobethebest.vercel.app/', '_blank');
        });

        const githubButton = container.querySelector('#tobethebest-github-button');
        if (githubButton == null) {
            throw new Error('Could not find #tobethebest-github-button element');
        }
        githubButton.addEventListener('click', () => {
            window.open('https://github.com/To-be-the-best-CSE403/CSE403-To_be_the_best-front', '_blank');
        });

        const teamBuilderButton = container.querySelector('#tobethebest-teambuilder-button');
        if (teamBuilderButton == null) {
            throw new Error('Could not find #tobethebest-teambuilder-button element');
        }
        teamBuilderButton.addEventListener('click', () => {
            // Add your logic for the "Create Team" button click here
        });
    })
    .catch(error => {
        console.error('Error fetching content HTML:', error);
    });
