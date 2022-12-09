function chooseSubjectsToDelete(){
    this.choose_delete = !this.choose_delete
    if (this.checkbox_display == 'display: none'){
        this.checkbox_display = 'display: inline-block'
    } else {
        this.checkbox_display = 'display: none'
    }
}
function chooseSubjectsToDelete2(){
    this.choose_delete = !this.choose_delete
    if (this.checkbox_display == 'display: none'){
        this.checkbox_display = 'display: inline-block'
    } else {
        this.checkbox_display = 'display: none'
    }
}

export default [chooseSubjectsToDelete, chooseSubjectsToDelete2]