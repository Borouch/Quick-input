#### Example for usage in quick-add macros with 
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
  

  

  