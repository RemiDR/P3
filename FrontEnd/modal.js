const backgroundModal = document.querySelector("#modals");

if (openGalleryModalBtn) openGalleryModalBtn.addEventListener("click", openGalleryModal);
if (openAddWork) openAddWork.addEventListener("click", function() {
    closeGalleryModal();
    openAddWorkModal();
})

// Fermer les modals et précédent
closeGalleryModalBtn.addEventListener("click", closeGalleryModal);
closeAddWorkModalBtn.addEventListener("click", closeAddWorkModal);

window.onclick = function (event) {
    if (event.target == backgroundModal) {
        closeAddWorkModal();
        closeGalleryModal();
    }
}