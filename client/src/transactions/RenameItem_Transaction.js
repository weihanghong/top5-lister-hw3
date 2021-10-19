import jsTPS_Transaction from "../common/jsTPS.js"

export default class RenameItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldText, initNewText) {
        super();
        this.store = initStore;
        this.itemIndex = initIndex;
        this.oldItemText = initOldText;
        this.newItemText = initNewText;
    }

    doTransaction() {
        this.store.changeItemName(this.itemIndex, this.newItemText);
    }
    
    undoTransaction() {
        this.store.changeItemName(this.itemIndex, this.oldItemText);
    }
}