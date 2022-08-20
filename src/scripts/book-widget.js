const planWidget = document.querySelector("#tz-plan-widget-new");
const config = { childList: true, subtree: true };

let initialisedForm = false;
const callback = () => {
    const lessonTypeForm = planWidget.querySelector(".tz-plan-wg-instrument");
    const lessonTypeOption = [...lessonTypeForm.options].find((option) => option.value !== "0");
    if (lessonTypeOption) {
        lessonTypeOption.selected = true;
        initialisedForm = true;
        observer.disconnect();
    }
};
  
  // Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
  
// Start observing the target node for configured mutations
observer.observe(planWidget, config);

