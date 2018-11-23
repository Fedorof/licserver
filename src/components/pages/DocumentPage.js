import React from 'react';
import {registry} from "../docs/registry";
import NotFound from "./NotFound";

export function DocumentPage({ match }) {
    let {lang, version, type, slug} = match.params;
    let records = Array.from(registry.getRecords(lang, version, type));

    for (let record of records) {
        if (record.slug === slug) {
            return <record.component match={match}/>;
        }
    }
    return <NotFound/>;
}