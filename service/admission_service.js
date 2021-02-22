const admission_dao = require("dao/admission_dao");

module.exports =
class admission_service {
    async showCount() {
        let addao = new admission_dao();
        const count = addao.showCount();
        console.log(count);
        return count;
    }
}
