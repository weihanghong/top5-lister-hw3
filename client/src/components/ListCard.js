import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ editActive, setEditActive ] = useState(false);
    const [ text, setText ] = useState("");
    store.history = useHistory();
    const { idNamePair, selected } = props;

    function handleLoadList(event) {
        if (event.target.className !== "list-card-disabled unselected-list-card") {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(_id);
        }
    }

    function handleToggleEdit(event) {
        if(event.target.className !== "list-card-button-disabled") {
            event.stopPropagation();
            toggleEdit();
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        } else {
            store.setIsListNameEditInactive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value );
    }

    function handleDeleteModal(event) {
        if(event.target.className!=="list-card-button-disabled") {
            event.stopPropagation();
            let modal = document.getElementById("delete-modal");
            modal.classList.add("is-visible");
            let id = event.target.id.substring("delete-list-".length);
            store.markDeleteList(id);
        }
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let buttonClass = "list-card-button";
    let cardClass = "list-card ";
    if(store.isListNameEditActive) {
        buttonClass = "list-card-button-disabled";
        cardClass = "list-card-disabled ";
    }
    let cardElement =
        <div
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={handleLoadList}
            className={cardClass + selectClass}>
            <span
                id={"list-card-text-" + idNamePair._id}
                key={"span-" + idNamePair._id}
                className="list-card-text">
                {idNamePair.name}
            </span>
            <input
                type="button"
                id={"delete-list-" + idNamePair._id}
                className={buttonClass}
                onClick={handleDeleteModal}
                value={"\u2715"}
            />
            <input
                type="button"
                id={"edit-list-" + idNamePair._id}
                className={buttonClass}
                onClick={handleToggleEdit}
                value={"\u270E"}
            />
        </div>;

    if (editActive) {
        cardElement =
            <input
                id={"list-" + idNamePair._id}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                autoFocus
            />;
    }
    return (
        cardElement
    );
}

export default ListCard;