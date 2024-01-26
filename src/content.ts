const body = document.body;

const root = document.createElement('div');
root.id = "tobethebest-root";

const toggle = document.createElement("div");
toggle.id = "tobethebest-toggle";
toggle.classList.add("active");

const toggle_text = document.createElement("p");
toggle_text.id = "tobethebest-toggle__text";
toggle_text.innerText = "ToBeTheBest";

const sidebar = document.createElement("div");
sidebar.id = "tobethebest-sidebar";

const sidebar_container = document.createElement("div");
sidebar_container.id = "tobethebest-sidebar__container";

const sidebar_header = document.createElement("div");
sidebar_header.id = "tobethebest-sidebar-header";
sidebar_header.classList.add("tobethebest-sidebar__component");

const sidebar_teambuilder = document.createElement("div");
sidebar_teambuilder.id = "tobethebest-sidebar-teambuilder";
sidebar_teambuilder.classList.add("tobethebest-sidebar__component");

const sidebar_resources = document.createElement("div");
sidebar_resources.id = "tobethebest-sidebar-resources";
sidebar_resources.classList.add("tobethebest-sidebar__component");

const sidebar_header_title = document.createElement("h1");
sidebar_header_title.innerText = "ToBeTheBest";

const sidebar_teambuilder_title = document.createElement("h2");
sidebar_teambuilder_title.innerText = "Team Builder";

const sidebar_resources_title = document.createElement("h2");
sidebar_resources_title.innerText = "Resources";

const sidebar_teambuilder_button = document.createElement("button");
sidebar_teambuilder_button.innerText = "Create Team";

const sidebar_website_button = document.createElement("button");
sidebar_website_button.innerText = "Website";
sidebar_website_button.onclick = () => {
    window.open("https://tobethebest.vercel.app/", "_blank");
}

const sidebar_wiki_button = document.createElement("button");
sidebar_wiki_button.innerText = "Wiki";
sidebar_wiki_button.onclick = () => {
    window.open("https://tobethebest.vercel.app/", "_blank");
}

const sidebar_github_button = document.createElement("button");
sidebar_github_button.innerText = "Github";
sidebar_github_button.onclick = () => {
    window.open("https://github.com/To-be-the-best-CSE403/CSE403-To_be_the_best-front", "_blank");
}

toggle.onmouseover = () => {
    sidebar.classList.add("active");
    toggle.classList.remove("active");
}

sidebar.onmouseleave = () => {
    sidebar.classList.remove("active");
    toggle.classList.add("active");
}

toggle.appendChild(toggle_text);

sidebar_header.appendChild(sidebar_header_title);

sidebar_teambuilder.appendChild(sidebar_teambuilder_title);
sidebar_teambuilder.appendChild(sidebar_teambuilder_button);

sidebar_resources.appendChild(sidebar_resources_title);
sidebar_resources.appendChild(sidebar_website_button);
sidebar_resources.appendChild(sidebar_wiki_button);
sidebar_resources.appendChild(sidebar_github_button);

sidebar_container.appendChild(sidebar_header);
sidebar_container.appendChild(sidebar_teambuilder);
sidebar_container.appendChild(sidebar_resources);

sidebar.appendChild(sidebar_container);

root.appendChild(sidebar);
root.appendChild(toggle);

body.appendChild(root);
