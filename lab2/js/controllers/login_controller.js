class LoginController {
    async login(req, res) {
        console.log(req.body); 
        res.json({
            message: "Данные успешно получены",
            data: req.body 
        });
    }
}

module.exports = new LoginController();
