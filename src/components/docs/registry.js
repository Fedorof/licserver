import Agreement from "./v1/simple/uk/Agreement";
import PrivacyPolicy from "./v1/simple/uk/PrivacyPolicy";


class Registry{
    constructor() {
        this.components = {};
        this.languages = [];
        this.versions = [];
        this.types = [];
    }

    add(component) {
        let versions, types, slugs;
        let {lang, version, type, slug, name} = component.description;

        // Create nested objects of this.components[lang][version][type] = []
        versions = this.getOrCreate(this.components, lang, this.languages);
        types = this.getOrCreate(versions, version, this.versions);
        slugs = this.getOrCreate(types, type, this.types);

        slugs[slug] = {name: name, component: component};
    }

    getOrCreate(map, key, keys) {
        if (map[key] === undefined) {
            keys.push(key);
            map[key] = {};
        }
        return map[key]
    }

    * getRecords(lang, version, type) {
        let languages = lang === ''? this.languages: [lang];
        let versions = version === ''? this.versions: [version];
        let types = type === ''? this.types: [type];

        for (let lang of languages) {
            for (let version of versions) {
                for (let type of types) {
                    if (this.components[lang] === undefined
                            || this.components[lang][version] === undefined
                            || this.components[lang][version][type] === undefined) {
                        continue
                    }
                    let records = this.components[lang][version][type];

                    for (let [slug, record] of Object.entries(records)) {
                        yield {lang, version, type, slug, ...record}
                    }
                }
            }
        }
    }
}

export let registry = new Registry();

registry.add(Agreement);
registry.add(PrivacyPolicy);
