import { Plugin } from "obsidian";
import InputModal from "./InputModal";
import QuickInputAPI from './QuickInputAPI';

export default class QuickInputPlugin extends Plugin {
	public api: any
	async onload() {
		// this.addCommand({
		// 	id: "open-quick-input",
		// 	name: "Open quick input",
		// 	callback: () => {
		// 		new InputModal(this).open();
		// 	},
		// });
		this.api = new QuickInputAPI(this).expose()
	}

	onunload() {}
}
