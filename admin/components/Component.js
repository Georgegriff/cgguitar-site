import { NunjucksComponent } from "./NunjucksComponent.js";

const getComponent = (type, {data, getAsset, fieldsMetaData, pathToAssets ={}, assetsPrefix= '', ...passedProps} = {}) => {
  let body = '';
  if(data) {
    body = data.getIn([passedProps.bodyField || 'body']) || ''
  }

  const name =  data.getIn(['name']);
  const fileAssetKeys = Object.keys(pathToAssets)
  if(fileAssetKeys.length) {
    fileAssetKeys.forEach((dataKey) => {
      const pathTo = pathToAssets[dataKey];
      const images = passedProps.entry.getIn(['mediaFiles']).toJS();
        const img = data.getIn(pathTo);
        if(img) {
          if(images && images.length) {
            const image = images.find(({name}) => img.endsWith(name));
            if(image && image.draft) {
              data = data.setIn(pathTo,image.url);
            }
          }
          if (img && img.startsWith("/")){
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
