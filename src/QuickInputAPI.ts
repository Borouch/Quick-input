import type QuickInputPlugin from "./main";
import InputModal from "./InputModal";
import type { IForm } from "./ILayout";

export default class QuickInputAPI {
	constructor(private plugin: QuickInputPlugin) {}
	public expose = () => {
		return this.setLayout;
	};
	private setLayout = async (layoutData: IForm[]) => {
		return await InputModal.quickInput(this.plugin, layoutData);
	};
}
