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
            return CMS.getPreviewTemplate(type)({
                data,
                key: `${data.getIn(['name'])}-${index}`,
                getAsset: props.getAsset,
                fieldsMetaData: props.fieldsMetaData,
                type,
                ...props,
                // override
                parentComponent: 'section',
            })
        })
    }
    const children = previewComponent || [];
    const main = h('main', {}, children)
    return h('div', {},  HeaderPreview(props), main)
};

