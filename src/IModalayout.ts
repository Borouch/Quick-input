export interface IModalLayoutData {
	modalLayout: IForm[];
}

export interface IForm {
	name: string;
	optional: boolean;
	formType: 'Date' | 'Time' | 'Multiselect' | 'Rating'
}

export interface DateForm extends IForm {
	// Default yyyy-MM-DD
	dateFormat?: string;
}

export interface TimeForm extends IForm {
	// Default HH:mm
	timeFormat?: string;
}

export interface MultiSelectForm extends IForm {
	displayItems: string[];
	actualItems: string[];
}

export interface RatingForm extends IForm {
	scaleSize: 5 | 10;
	colors?: string[]
}
