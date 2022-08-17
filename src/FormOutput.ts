export default class FormOutput {
	dateForm: { name: string; date: string }[] = [];
	timeForm: { name: string; time: string }[] = [];
	multiselectForm: {
		name: string;
		selectItems: Record< "item" | string, any>[];
	}[] = [];
	ratingForm: { name: string; rating: number }[] = [];
}
