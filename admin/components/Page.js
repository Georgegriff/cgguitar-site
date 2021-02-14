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
        previewComponent = components.map((component, index) => {
            let data = props.fieldsMetaData.getIn(['components', 'component', 'components', component]);
            if(!data) {
                return null;
            }
            return ComponentPreview({
                data,
                key: `${data.getIn(['name'])}-${index}`,
                getAsset: props.getAsset,
                fieldsMetaData: props.fieldsMetaData,
            })
        })
    }
    const children =previewComponent || [];
    const main = h('main', {}, children)
    return h('div', {},  HeaderPreview(props), main)
};

