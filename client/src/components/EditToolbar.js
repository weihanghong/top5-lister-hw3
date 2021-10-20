import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let buttonClassR = "top5-button";
    let buttonClassU = "top5-button";
    let buttonClassC = "top5-button";
    function handleUndo(event) {
        if(event.target.className !== "top5-button-disabled") {
            store.undo();
        }
    }
    function handleRedo(event) {
        if(event.target.className !== "top5-button-disabled") {
            store.redo();
        }
    }
    function handleClose(event) {
        if(event.target.className !== "top5-button-disabled") {
            history.push("/");
            store.closeCurrentList();
        }
    }
    if (store.isListNameEditActive) {
        buttonClassC = "top5-button-disabled";
        buttonClassR = "top5-button-disabled";
        buttonClassU = "top5-button-disabled";
    }
    if (store.isItemEditActive) {
        buttonClassC = "top5-button-disabled";
        buttonClassR = "top5-button-disabled";
        buttonClassU = "top5-button-disabled";
    }
    if(store.currentList===null) {
        buttonClassC = "top5-button-disabled";
    }

    return (
        <div id="edit-toolbar">
            <div
                id='undo-button'
                onClick={handleUndo}
                className={buttonClassU}>
                &#x21B6;
            </div>
            <div
                id='redo-button'
                onClick={handleRedo}
                className={buttonClassR}>
                &#x21B7;
            </div>
            <div
                id='close-button'
                onClick={handleClose}
                className={buttonClassC}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;