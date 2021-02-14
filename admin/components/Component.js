import { NunjucksComponent } from "./NunjucksComponent.js";

const getComponent = (type, {data, getAsset, fieldsMetaData}) => {
  let body = '';
  if(data) {
    const {extends: hasExtends } = data.toJSON();
    body = data.getIn(['body']) || ''
    if(hasExtends) {
        // page vs in component
        const dataExt = fieldsMetaData.getIn([type, 'component',type, hasExtends]) 
        || fieldsMetaData.getIn(['extends', type, hasExtends]);
        if(dataExt) {
          const extBody = dataExt.getIn(['body']) || '';
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
    type
  }
  if (image) {
    const imageSrc = getAsset(image);
    props.data.image.src = imageSrc;
  }
  let componentType = type;
  // switch(type) {
  // }
  return NunjucksComponent({
    data: dataJson,
    body,
    type: componentType
  });
}

export const Component = ({type}) => (props) => {
  const {entry} = props;
  return ComponentPreview({
    data: entry.getIn(['data']),
    type,
    ...props
  })
};

export const ComponentPreview = (props) => {
  const {data} = props;
  const type = props.type || data.getIn(['type']);
  return getComponent(type, props)
};
