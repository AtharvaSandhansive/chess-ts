//menu.ts

import "./menu.css"

export class Menu{
    private onLocalPvP: () => void;
    constructor(onLocalPvP :() => void ){
        this.onLocalPvP = onLocalPvP;
    }

    public show():void{
        const menu = document.createElement("div");
        menu.id = "menu";

        //creates a title
        const title = document.createElement("h1");
        title.textContent = "Chess-TS";
        title.style.color = "#ffffff";
        menu.append(title);
        //creating button
        const localButton = document.createElement("button");
        localButton.textContent = "Local PvP";
        localButton.addEventListener("click", () => {this.onLocalPvP();});
        menu.appendChild(localButton);

        const computerButton = document.createElement("button");
        computerButton.textContent = "Vs Computer";

        menu.appendChild(computerButton);

        const lanButton = document.createElement("button");
        lanButton.textContent = "LAN Match";

        menu.appendChild(lanButton);

        computerButton.disabled = true;
        lanButton.disabled = true;

        const app = document.getElementById("app");
        if (!app){throw new Error("app element is not found");}
        app.appendChild(menu);
    }

    public hide():void{
        const menu = document.getElementById("menu");
        if (!menu){return;}

        menu.remove();
    }
}