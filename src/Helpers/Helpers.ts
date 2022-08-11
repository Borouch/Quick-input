
export const handlePickerDisplay = (e: Event,wrapperElId:string, inputElId: string, showPicker: boolean)=>{
    const pickerWrapper = document.getElementById(
        wrapperElId
    );
    const inputEl = document.getElementById(inputElId);
    const target = e.target as Node | null;
    const isTargetOutside = !pickerWrapper?.contains(target);
    if (isTargetOutside && document.activeElement !== inputEl) {
        return false;
    }
    return showPicker
}