const User = require("../models/user");

module.exports.renderSignupFrom = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {

    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        const registerdUser = await User.register(newUser, password);
        console.log(registerdUser);

        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User registerd Successfully");
            res.redirect("/listings");
        })

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};


module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust Stays.");
    if (!res.locals.redirectUrl) {
        res.locals.redirectUrl = "/listings"
    }
    res.redirect(res.locals.redirectUrl);
};


module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};
