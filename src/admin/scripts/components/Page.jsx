import { debounce } from "./debounce.js";
import { HeaderPreview } from "./Header";
import { NunjucksComponent } from "./NunjucksComponent";

export const Page = (passedProps) => {
  return createClass({
    getInitialState() {
      this.updateDebounced = debounce(this.forceUpdate, 300);
      return {};
    },

    shouldComponentUpdate() {
      this.updateDebounced();
      return false;
    },

    componentWillUnmount() {
      this.updateDebounced.cancel();
    },
    _renderUpdate() {
      const props = this.props;
      const data = props.entry.getIn(["data", "components"]);
      if (!data) {
        return null;
      }
      const components = data.toJSON();
      let previewComponent;
      if (components) {
        previewComponent = components.map(({ name, type }, index) => {
          let data;
          let key;
          if (type === "custom") {
            return NunjucksComponent({
              body: `{%- include "partials/components/mocks/${name}.njk" -%}`,
              name,
              data: "",
              type,
              ...passedProps,
            });
          }
          data = props.fieldsMetaData.getIn(["components", "name", type, name]);
          if (!data) {
            return null;
          }
          key = `${data.getIn(["name"])}-${index}`;
          return CMS.getPreviewTemplate(type)({
            data,
            key: key,
            getAsset: props.getAsset,
            fieldsMetaData: props.fieldsMetaData,
            type,
            ...props,
            ...passedProps,
            // override
            parentComponent: "section",
          });
        });
      }
      const children = previewComponent || [];
      return children;
    },
    render() {
      return (
        <div>
          <header>{HeaderPreview(this.props)}</header>
          <main>{this._renderUpdate()}</main>
        </div>
      );
    },
  });
};
