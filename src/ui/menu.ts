//menu.ts

import "./menu.css"

export class Menu{
    private onLocalPvP: () => void;
    private onVsComputer: () => void;
    constructor(onLocalPvP :() => void, onVsComputer: () => void){
        this.onLocalPvP = onLocalPvP;
        this.onVsComputer = onVsComputer;
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
        computerButton.addEventListener("click", () => {
            this.onVsComputer();
        });
        menu.appendChild(computerButton);

        const lanButton = document.createElement("button");
        lanButton.textContent = "LAN Match";

        menu.appendChild(lanButton);

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