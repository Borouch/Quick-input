This obsidian plugin provides API for customizable form layout to facilitate quick and comfortable input. It's intended use is together with [chhoumann/quickadd](https://github.com/chhoumann/quickadd) macros

Currently supported forms:
- Date
- Time
- Multiselect
- Rating

#### API
```ts
setLayout = async (layoutData: IForm[]) => Promise<FormOutput | null>
```

#### Data format
```ts
interface ILayout {
	layout: IForm[];
}

interface IForm {
	name: string;
	//Default: true
	optional: boolean;
	formType: 'Date' | 'Time' | 'Multiselect' | 'Rating'
}

interface DateForm extends IForm {
	// Default: yyyy-MM-DD
	dateFormat?: string;
}

interface TimeForm extends IForm {
	// Default: HH:mm
	timeFormat?: string;
}

interface MultiSelectForm extends IForm {
	displayItems: string[];
	actualItems: string[];
	// Process added item to actualItem
	customItemCallback?: (addedItem: string)=>string
}

interface RatingForm extends IForm {
	// Default: 5
	scaleSize: 5 | 10;
	// Default: red, orange, yellow, green, blue
	colors: string[]
	// Default: false
	reverseColors: boolean
}

```


#### Example
Example for usage in [chhoumann/quickadd](https://github.com/chhoumann/quickadd) macro with [blacksmithgu/obsidian-dataview](https://github.com/blacksmithgu/obsidian-dataview)  plugin to query files data and [Borouch/YAML-edit (github.com)](https://github.com/Borouch/YAML-edit) plugin to write result to frontmatter
```ts
module.exports = async params => {
    const dv = app.plugins.plugins.dataview.api
    const multiselectData = {displayItems: [],actualItems:[]}
    dv.pages(`"Food"`).map((p)=>{
        const name =p.file.name
        const path =p.file.path
        multiselectData.displayItems.push(name)
        multiselectData.actualItems.push(`[[${name}]]`)

    })
    
    const dateForm = {name:'Date',formType:'Date'}
    const timeForm = {name:'Time',formType:'Time'}
    const multiSelectForm = {name:'Food',...multiselectData,customItemCallback: (addedItem)=>`[[${addedItem}]]`,formType:'Multiselect'}
    const ratingForm = {name:'Fullness',scaleSize: 5,reverseColors: true, formType:'Rating'}
    
    const capture = app.plugins.plugins.quickinput.api
    const output = await capture([dateForm,timeForm,multiSelectForm,ratingForm])
    
    const file = app.vault.getAbstractFileByPath('Lifestyle-DB.md')
    const {getYamlEditApi} = app.plugins.plugins.yamledit.api
    const yamlApi = await getYamlEditApi(file)

    yamlApi.set('food',output)
    yamlApi.update()
  }
```