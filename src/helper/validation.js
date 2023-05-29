function Not_allowedSpace(e) {
    if (e.target.value.includes(" ")) {
        e.target.value = e.target.value.replace(/\s/g, "");
    }
}
function log(){
    console.log('enetetre')
}
export  {
    Not_allowedSpace,
    log
}