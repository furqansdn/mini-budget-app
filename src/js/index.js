import Budget from './Models/Budget';
import * as budgetUI from './Views/budgetView';


import { elements } from './Views/base';
const budget = new Budget();
// Set Event Listener
elements.inputBtn.addEventListener('click',() => {
    ctrlAddItem();
});

elements.container.addEventListener('click', e => {
    const idTarget = e.target.parentNode.parentNode.parentNode.parentNode;

    if (idTarget.matches('.item')) {
        ctrlDeleteItem(idTarget.id);
    }
});

window.addEventListener('load', () => {
    budgetUI.displayBudget({
        budget:0,
        totalInc:0,
        totalExp:0,
        totalPercentage:-1
    });
})

const updateBudget = () => {
    budget.calculateBudget();

    const getBudget = budget.getBudget();
    budgetUI.displayBudget(getBudget);
}

const updatePercentages = () => {
    budget.calculatePercentages();

    const percentages = budget.getPercentages();

    budgetUI.displayPercentages(percentages);
}


const ctrlAddItem = () => {
    // Get all input
    const input = budgetUI.getInput();
    
    if (input.description !== "" && input.value > 0 && !isNaN(input.value)) {
        // Add to budget model
        const newItem = budget.addItem(input.type, input.description, input.value);

        // Add to item list
        budgetUI.addListItem(newItem, input.type);

        // Clear input
        budgetUI.clearFields();

        updateBudget();

        updatePercentages();
        return newItem;
    }
}

const ctrlDeleteItem = (idTarget) => {
    const splitId = idTarget.split('-');
    const type = splitId[0];
    const ID =  parseInt(splitId[1]);

    // Delete budget From list data model
    budget.deleteItem(type,ID);
    // Delete from list UI
    budgetUI.deleteItemList(idTarget);

    // Update budget
    updateBudget();    
    // Update Percentage
    updatePercentages();
}