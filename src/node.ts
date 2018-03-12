
export class Node {
    key;
    constructor(public type, public props, children?) {
        this.props = this.props == null ? {} : this.props;
        this.key = this.props.key;
        this.type = name;
        if (children) {
            if (children.length === 0) {
                this.props.children = children;
            } else if (children.length === 1) {
                this.props.children = children[0];
            } else if (children.length > 1) {
                this.props.children = children;
            }
        }
    }
    get children() {
        if (this.props.children == null) { return []; }
        if (Array.isArray(this.props.children)) {
            return this.props.children;
        } else {
            return [this.props.children];
        }
    }

}
