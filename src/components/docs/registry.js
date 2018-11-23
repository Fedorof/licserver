import Agreement from "./v1/simple/uk/Agreement";
import PrivacyPolicy from "./v1/simple/uk/PrivacyPolicy";


class Registry{
    constructor() {
        this.components = {};
        this.languages = [];
        this.versions = [];
        this.types = [];
    }

    add(component, lang, version, type, slug, name) {
        let versions, types, slugs;

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

        for (let language of languages) {
            for (let version of versions) {
                for (let type of types) {
                    let records = this.components[language][version][type];
                    if (records === undefined || records.length === 0) {
                        continue
                    }

                    for (let [slug, record] of Object.entries(records)) {
                        yield {language, version, type, slug, ...record}
                    }
                }
            }
        }
    }
}

export let registry = new Registry();

registry.add(Agreement, 'uk', '1', 'simple', 'agreement', 'Угода про використання - проста, версія 1');
registry.add(PrivacyPolicy, 'uk', '1', 'simple', 'privacy-policy', 'Політика конфіденційності - проста, версія 1');
