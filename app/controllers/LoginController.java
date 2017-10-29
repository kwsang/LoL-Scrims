package controllers;

import play.mvc.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class LoginController extends Controller {

    /**
     * Get login page.
     */
    public Result getLogin() {
        return ok(views.html.login.render());
    }

    /**
     * Get registration page.
     */
    public Result getRegister() {
        return ok(views.html.register.render());
    }

}
