export default class Budget {
    constructor() {
        this.data = {
            allItems: {
                exp: [],
                inc:[]
            },
            totals: {
                exp:0,
                inc:0
            },
            budget: 0,
            percentage: -1
        };
    }

    expense (id, description, value) {
        const expense = {
            id,
            description,
            value,
            percentage:-1
        }
        return expense;
    }

    calculatePercentage(value,totalInc) {
        let percentage;
        if (totalInc > 0) {
            percentage = Math.round(value/totalInc * 100);
        }
        else {
            percentage = -1
        }
        return percentage;
    }

    income (id, description, value) {
        const income = {
            id,
            description,
            value,
        }
        return income;
    }

    calculateTotal (type) {
        let sum = 0;
        this.data.allItems[type].forEach(current => {
            sum += current.value;
        });

        this.data.totals[type] = sum;
    }


    addItem (type, des, val) {
        let newItem, ID;

        // Generate ID base on last id on array of exp or inc 
        if (this.data.allItems[type].length > 0) {
            ID = this.data.allItems[type][this.data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

        // Check the type and add new item base on type
        if (type  === 'exp') {
            newItem = this.expense(ID,des,val)
        } else if (type === 'inc') {
            newItem = this.income(ID,des,val)
        }

        // Push data to data constructor
        this.data.allItems[type].push(newItem);

        return newItem;
    }

    calculateBudget () {

        this.calculateTotal('exp');
        this.calculateTotal('inc');

        this.data.budget = this.data.totals.inc - this.data.totals.exp;

        // Calculate total percentage
        if (this.data.totals.inc > 0) {
            this.data.percentage = Math.round((this.data.totals.exp / this.data.totals.inc) * 100);
        } else {
            this.data.percentage = -1
        }
    }

    calculatePercentages () 
    {
        this.data.allItems.exp.forEach((cur) => {
            cur.percentage = this.calculatePercentage(cur.value, this.data.totals.inc);
        })
    }

    getPercentages () {  
        const allPercentages = this.data.allItems.exp.map((cur) => {
            return cur.percentage;
        })

        return allPercentages;
    }

    getBudget () {
        return {
            budget: this.data.budget,
            totalInc: this.data.totals.inc,
            totalExp: this.data.totals.exp,
            totalPercentage: this.data.percentage
        };
    }

    deleteItem(type, ID) {
        const selectedId = this.data.allItems[type].map(current => {
            return current.id;
        });

        const index = selectedId.indexOf(ID);

        if (index !== -1) {
            this.data.allItems[type].splice(index, 1)
        }
    }
}
