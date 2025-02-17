import { updateFormOrder, updatePreview } from './inputHandler.js';

$(document).ready(function () {

    // Aspetta caricamento DOM, poi inizializza Sortable
    setTimeout(function () {
        let formContainer = document.querySelector('.sortable-container');

        if (formContainer) {
            Sortable.create(formContainer, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: function (evt) {
                    console.log("Spostato l'elemento", evt.oldIndex, "a", evt.newIndex);
                    updatePreview();
                    updateFormOrder();
                }
            });
        } else {
            console.error("sortable-container non esiste!");
        }
    }, 100);

});


