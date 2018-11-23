import {generatePath} from "react-router-dom";

export const DOCUMENT = {
    route: "/v:version/:lang/:type/:slug/:id",
    generate(params) {
        return generatePath(this.route, params)
    }
};
