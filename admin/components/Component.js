import { NunjucksComponent } from "./NunjucksComponent.js";

const getComponent = (type, {data, getAsset, fieldsMetaData, ...passedProps} = {}) => {
  let body = '';
  if(data) {
    const {extends: hasExtends } = data.toJSON();
    body = data.getIn([passedProps.bodyField || 'body']) || ''
    if(hasExtends) {
        // page vs in component
        const dataExt = fieldsMetaData.getIn(['components', 'name', type, hasExtends]) 
        || fieldsMetaData.getIn(['extends', type, hasExtends]);
        if(dataExt) {
          const extBody = dataExt.getIn([passedProps.bodyField || 'body']) || '';
          data = dataExt.merge(data);
          if(extBody || body) {
            body =`${extBody}${body}`
          }
        }
    }
  }

  const dataJson = data.toJSON();
  const name =  data.getIn(['name'])
  const image = data.getIn(['image', 'src']);
  const props = {
    body,
    name,
    data: dataJson,
    type,
    ...passedProps
  }
  if (image) {
    const imageSrc = getAsset(image);
    props.data.image.src = imageSrc;
  }
  return NunjucksComponent(props);
}

export const Component = (passedProps = {}) => (props) => {
  const {entry} = props;
  return ComponentPreview({
    data: props.data || entry.getIn(['data']),
    ...passedProps,
    ...props
  })
};

const ComponentPreview = (props) => {
  const type = props.type;
  return getComponent(type, props)
};
