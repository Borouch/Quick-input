import { Modal } from "obsidian";
import ModalLayout from "./UI/ModalLayout.svelte";
import type QuickInputPlugin from './main';
export default class InputModal extends Modal {
	constructor(plugin: QuickInputPlugin){
		super(plugin.app)
	}
	public onOpen = (): void => {
		const { contentEl, modalEl } = this;
		modalEl.addClasses(["quick-input__modal"]);
		contentEl.addClass("quick-input__content");

		new ModalLayout({
			target: contentEl,
		});
	};
}
