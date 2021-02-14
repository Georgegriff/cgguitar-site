import { NunjucksComponent } from "./NunjucksComponent.js";

const getComponent = (type, {data, getAsset, fieldsMetaData, pathToAssets ={}, assetsPrefix= '', ...passedProps} = {}) => {
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

  const name =  data.getIn(['name']);
  const fileAssetKeys = Object.keys(pathToAssets)
  if(fileAssetKeys.length) {
    fileAssetKeys.forEach((dataKey) => {
      const pathTo = pathToAssets[dataKey];
      const images = passedProps.entry.getIn(['mediaFiles']).toJS();
      if(images && images.length) {
        const img = passedProps.entry.getIn(['data',...pathTo]);
        const image = images.find(({name}) => img.endsWith(name));
        if(image && image.draft) {
          data = data.setIn(pathTo,image.url);
        } else if (img && img.startsWith("/")){
          data = data.setIn(pathTo, `${assetsPrefix}${img}`);
        }
      }
    });
  }
  const dataJson = data.toJSON();
  const props = {
    body,
    name,
    data: dataJson,
    type,
    ...passedProps
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
