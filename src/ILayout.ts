export interface ILayout {
	layout: IForm[];
}

export interface IForm {
	name: string;
	//Default: true
	optional: boolean;
	formType: 'Date' | 'Time' | 'Multiselect' | 'Rating'
}

export interface DateForm extends IForm {
	// Default: yyyy-MM-DD
	dateFormat?: string;
}

export interface TimeForm extends IForm {
	// Default: HH:mm
	timeFormat?: string;
}

export interface MultiSelectForm extends IForm {
	displayItems: string[];
	actualItems: string[];
	// Process added item to actualItem
	customItemCallback?: (addedItem: string)=>string
}

export interface RatingForm extends IForm {
	// Default: 5
	scaleSize: 5 | 10;
	// Default: red, orange, yellow, green, blue
	colors: string[]
	// Default: false
	reverseColors: boolean
}
