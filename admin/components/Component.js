import { NunjucksComponent } from "./NunjucksComponent.js";

const getComponent = (type, {data, getAsset, fieldsMetaData}) => {
  if(data) {
    const {extends: hasExtends } = data.toJSON();
    if(hasExtends) {
        // page vs in component
        const dataExt = fieldsMetaData.getIn(['components', 'component', 'components', hasExtends]) 
        || fieldsMetaData.getIn(['extends', 'components', hasExtends]);
        data = dataExt ? dataExt.merge(data) : data;
    }
  }

  const dataJson = data.toJSON();
  const body = data.getIn(['body']);
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

export const Component = (props) => {
  const {entry} = props;
  return ComponentPreview({
    data: entry.getIn(['data']),
    ...props
  })
};

export const ComponentPreview = (props) => {
  const {data} = props;
  const type = data.getIn(['type']);
  return getComponent(type, props)
};
