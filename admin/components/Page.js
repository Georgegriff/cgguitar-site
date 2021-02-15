import {HeaderPreview} from './Header.js';
import { NunjucksComponent } from './NunjucksComponent.js';

export const Page = (passedProps) => (props) => {
    const data = props.entry.getIn(["data", "components"])
    if(!data) {
        return null;
    }
    const components = data.toJSON();
    let previewComponent;
    if(components) {
        previewComponent = components.map(({name, type}, index) => {
            let data;
            let key;
            if(type === "custom") {
                return NunjucksComponent({
                    body: `${type}: ${name}`,
                    name,
                    data: "",
                    type,
                    ...passedProps
                  });
            }
            data = props.fieldsMetaData.getIn(['components', 'name', type, name]);
            if(!data) {
                return null;
            }
            key = `${data.getIn(['name'])}-${index}`;
            return CMS.getPreviewTemplate(type)({
                data,
                key: key,
                getAsset: props.getAsset,
                fieldsMetaData: props.fieldsMetaData,
                type,
                ...props,
                ...passedProps,
                // override
                parentComponent: 'section',
            })
        })
    }
    const children = previewComponent || [];
    const main = h('main', {}, children)
    return h('div', {},  HeaderPreview(props), main)
};

