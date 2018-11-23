import React from "react";
import {registry} from "../docs/registry";
import {Link} from "react-router-dom";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            version: '',
            type: '',
            id: '',
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event, target) {
        event.persist();
        this.setState(
            () => {
                let state = {};
                state[target] = event.target.value;
                return state
            }
        );
    }

    * getOptions(items) {
        yield <option value={''} key={0}>-</option>;

        for (let [index, value] of items.entries()) {
            yield <option value={value} key={index + 1}>{value}</option>;
        }
    };

    * getLinks(){
        let key = 0;

        for (let record of registry.getRecords(this.state.language, this.state.version, this.state.type)) {
            yield <li key={key}>
                <Link to={`/v${record.version}/${record.language}/${record.type}/${record.slug}/${this.state.id}`}>
                    {`${this.state.id} - ${record.name}`}
                </Link>
            </li>;
            key += 1;
        }
    };

    render() {
        return (
            <div>
                <label>
                    Language:&nbsp;
                    <select value={this.state.language}
                            onChange={(e) => this.handleSelect(e, 'language')}>
                        {[...this.getOptions(registry.languages)]}
                    </select>
                </label>
                <p/>
                <label>
                    Version:&nbsp;
                    <select value={this.state.version}
                            onChange={(e) => this.handleSelect(e, 'version')}>
                        {[...this.getOptions(registry.versions)]}
                    </select>
                </label>
                <p/>
                <label>
                    Type:&nbsp;
                    <select value={this.state.type}
                            onChange={(e) => this.handleSelect(e, 'type')}>
                        {[...this.getOptions(registry.types)]}
                    </select>
                </label>
                <label>
                    App Name:&nbsp;
                    <input value={this.state.id}
                           onChange={(e) => this.handleSelect(e, 'id')}/>
                </label>

                <ul>
                    {[...this.getLinks()]}
                </ul>
            </div>
        );
    };
}