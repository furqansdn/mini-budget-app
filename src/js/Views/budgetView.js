import {elements, elementStrings} from './base';

export const getInput = () => {
    return {
        type: elements.inputType.value,
        description: elements.inputDescription.value,
        value: parseFloat(elements.inputValue.value)
    };
}

const formatNumber = (num, type) => {

    num = Math.abs(num);
    num = num.toFixed(2);
    
    const newNum = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    
    return `${type === 'exp' ? '-' : '+'} ${newNum}`; 
}

export const addListItem = (obj, type) => {
    let html, newHtml, element;

    if (type === 'inc') {
        element = elements.incomeContainer;

        html = `
        <div class="item clearfix" id="inc-%ID%">
            <div class="item__description">%DESCRIPTION%</div>
            <div class="right">
                <div class="item__value">%VALUE%</div>
                <div class="item__action">
                    <button class="item__delete--btn"><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>
        </div> 
        `;
    } else if (type === 'exp') {
        element = elements.expensesContainer;

        html = `
            <div class="item clearfix" id="exp-%ID%">
                <div class="item__description">%DESCRIPTION%</div>
                <div class="right">
                    <div class="item__value">%VALUE%</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__action">
                        <button class="item__delete--btn"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                </div>
            </div>`;
    }

    newHtml = html.replace('%ID%', obj.id);
    newHtml = newHtml.replace('%DESCRIPTION%', obj.description);
    newHtml = newHtml.replace('%VALUE%', formatNumber(obj.value, type));

    element.insertAdjacentHTML('beforeend', newHtml);
}

export const clearFields = () => {
    const arrField = document.querySelectorAll(`${elementStrings.inputDescriptionString}, ${elementStrings.inputValueString}`)
    arrField.forEach(el => {
        el.value = "";
    })
}
export const displayBudget = (obj) => {
    let type; 

    obj.budget > 0 ? type = 'inc' : type = 'exp';

    elements.budgetLabel.textContent = formatNumber(obj.budget,type);
    elements.incomeLabel.textContent = formatNumber(obj.totalInc, 'inc');
    elements.expensesLabel.textContent = formatNumber(obj.totalExp, 'exp');

    if (obj.totalPercentage > 0) {
        elements.percentageLabel.textContent = `${obj.totalPercentage}%`
    } else {
        elements.percentageLabel.textContent = '---';
    }
}

export const displayPercentages = (arr) => {
    const allField = document.querySelectorAll(elementStrings.expensesPercLabel);

    allField.forEach((curr, index) => {
        if (arr[index] > 0) {
            curr.textContent = `${arr[index]}%`;
        } else {
            curr.textContent = `---`;
        }
        
    })
}

export const deleteItemList = (idTarget) => {
    const el = document.getElementById(idTarget)
    el.parentNode.removeChild(el);
}