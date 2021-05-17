import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Book from "./book";


export function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/book" exact component={Book}></Route>
                <Redirect from='/*' to="/book" />
            </Switch>
        </HashRouter>
    );
}
