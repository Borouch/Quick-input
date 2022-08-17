import { Modal } from "obsidian";
import ModalLayout from "./UI/ModalLayout.svelte";
import type QuickInputPlugin from "./main";
import type { ILayout } from "./ILayout";
import type * as IModalayout from "./ILayout";
import type { IForm } from "./ILayout";
import FormOutput from './FormOutput';

export default class InputModal extends Modal {
	public waitForClose: Promise<FormOutput|null>;
	private resolvePromiseInput: FormOutput|null=null;
	private resolvePromise: (input: FormOutput|null) => void;
	private rejectPromise: (reason?: any) => void;

	public static quickInput = (
		plugin: QuickInputPlugin,
		title: string,
		layoutData: IForm[]
	) => {
		let formOutput: FormOutput = new FormOutput()

		const modal = new InputModal(plugin,title,layoutData,formOutput)
		return modal.waitForClose
	};

	constructor(
		private plugin: QuickInputPlugin,
		private title: string,
		private layoutData: IForm[],
		private formOutput: FormOutput
	) {
		super(plugin.app);
		this.waitForClose = new Promise<FormOutput|null>((resolve, reject) => {
			this.resolvePromise = resolve;
			this.rejectPromise = reject;
		});
		this.open();
	}


	private submit = ()=>{
		this.resolvePromiseInput = this.formOutput
		this.close()
	}

	private cancel = ()=>{
		this.close()
	}

	public onClose(): void {
		this.resolvePromise(this.resolvePromiseInput)
	}

	public onOpen = (): void => {
		const { contentEl, modalEl,titleEl } = this;
		modalEl.addClass("quick-input__modal");
		contentEl.addClass("quick-input__content");
		titleEl.innerText=this.title
		new ModalLayout({
			target: contentEl,
			props: {
				plugin: this.plugin,
				partialLayoutData: this.layoutData,
				formOutput: this.formOutput,
				submit: this.submit,
				cancel: this.cancel
			},
		});
	};
}
