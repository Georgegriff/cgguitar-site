import {ComponentPreview} from "./Component.js"
import {HeaderPreview} from './Header.js';

export const Page = (props) => {
    const data = props.entry.getIn(["data", "components"])
    if(!data) {
        return null;
    }
    const components = data.toJSON();
    let previewComponent;
    if(components) {
        previewComponent = components.map(({name, type}, index) => {
            let data = props.fieldsMetaData.getIn(['components', 'name', type, name]);
            if(!data) {
                return null;
            }
            return ComponentPreview({
                data,
                key: `${data.getIn(['name'])}-${index}`,
                getAsset: props.getAsset,
                fieldsMetaData: props.fieldsMetaData,
                type
            })
        })
    }
    const children =previewComponent || [];
    const main = h('main', {}, children)
    return h('div', {},  HeaderPreview(props), main)
};

