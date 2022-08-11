import { Plugin } from "obsidian";
import InputModal from "./InputModal";

export default class QuickInputPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "open-quick-input",
			name: "Open quick input",
			callback: () => {
				new InputModal(this).open();
			},
		});
	}

	onunload() {}
}
